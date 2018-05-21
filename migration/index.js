const { createLogger, format, transports } = require('winston');
const { google } = require('googleapis');
const fs = require('fs');
const config = require('./config');
const users = require('./users');
const http = require('http');
const https = require('https');
const generatePassword = require('password-generator');
const btoa = require('btoa');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.splat(),
        format.simple()
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'full.log' })
    ]
});

async function launch() {
    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
        config.weflatServiceAccount,
        config.googleKeyFile,
        null,
        [config.googleScope],
        config.weflatMail
    );

    const gmail = google.gmail({ version: "v1", auth: jwtClient });

    for (let user of users) {
        logger.info('Registering user %s %s (%s)', user.firstName, user.lastName, user.email);
        try {
            user.password = generatePassword(6);
            await sendLoginRequest(config.apiHost, config.apiPath, config.apiPort, 'POST', JSON.stringify(user), config.secured);
            await sendMail(gmail, jwtClient, user.email, 'Création de votre compte', 'Votre mot de passe est : ' + user.password);
            logger.info('Registration of user %s %s successful!', user.firstName, user.lastName);
        }
        catch (e) {
            logger.error('Registration of user %s %s failed...', user.firstName, user.lastName);
        }
    }
    return;
}

async function sendLoginRequest(host, path, port, method, stringData, secured) {
    const protocol = secured ? https : http;

    return new Promise((resolve, reject) => {

        const options = {
            host: host,
            port: port,
            path: path,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': stringData ? Buffer.byteLength(stringData) : '0',
            },
        };

        let request = protocol.request(options, function (res) {
            res.setEncoding('utf8');
            if (Math.trunc(res.statusCode / 100) !== 2) {
                // Error (!= 2XX status code)
                if (stringData) {
                    logger.info('The posted data was %s', stringData);
                }
                res.on('data', function (chunk) {
                    logger.info('The server\'s response body was %s', chunk);
                });
                res.on('end', function () {
                    reject('Server ' + host + ' returned code : ' + res.statusCode + ' when trying to ' + method + ' ' + path);
                });
                res.on('error', function (err) {
                    reject(err);
                });
            } else {
                // Success
                var response = '';
                res.on('data', function (chunk) {
                    response += chunk;
                });
                res.on('end', function () {
                    logger.info('Data received as response: %s', response.toString());
                    resolve(response);
                });
                res.on('error', function (err) {
                    reject(err);
                });
            }
        });
        request.write(stringData);
        request.end();
    });
}

function sendMail(gmail, jwtClient, to, subject, message) {
    let headers = {
        "To": to,
        "Subject": subject
    }

    let email = '';
    for (var header in headers)
        email += header += ": " + headers[header] + "\r\n";

    email += "\r\n" + message;
    
    return gmail.users.messages.send({
        auth: jwtClient,
        userId: config.weflatMail,
        requestBody: {
            raw: btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
}

(async () => {
    try {
        await launch();
    } catch (e) {
        logger.error('%o', e)
    }
})();
