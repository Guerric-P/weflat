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
        new transports.File({ filename: 'full.log' }),
        new transports.Console()
    ]
});

async function launch() {

    logger.info('Authenticating as admin');

    const adminLoginResponse = await sendLoginRequest(config.adminLogin, config.adminPassword);

    adminToken = JSON.parse(adminLoginResponse).token;

    logger.info('Authenticated!');

    logger.info('Creating gmail client');

    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
        config.weflatServiceAccount,
        config.googleKeyFile,
        null,
        [config.googleScope],
        config.weflatMail
    );

    logger.info('Gmail client created!');

    const gmail = google.gmail({ version: "v1", auth: jwtClient });

    for (let customer of users.customers) {
        logger.info('Registering customer %s %s (%s)', customer.firstName, customer.lastName, customer.email);
        try {

            logger.info('Generating password');

            const password = generatePassword(6);

            logger.info('Password generated!');

            logger.info('Sending signup request...');

            const signupResult = JSON.parse(await sendSignupRequest(config.apiCustomersEndpoint, JSON.stringify({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                password: password
            })));

            logger.info('Signup request successful! Id is %s', signupResult.id);

            logger.info('Sending patch request...');

            await sendPatchUserRequest(config.apiCustomersEndpoint + '/' + signupResult.id, JSON.stringify(customer), 'Bearer ' + adminToken);

            logger.info('Patch request successful!');

            if (config.mails) {
                logger.info('Sending mail to %s with password %s', customer.email, password);
                await sendMail(gmail, jwtClient, customer.email, 'Création de votre compte', 'Votre mot de passe est : ' + password);
                logger.info('Mail successfully sent!');
            }

            logger.info('Registration of customer %s %s successful!', customer.firstName, customer.lastName);
        }
        catch (e) {
            logger.error('Registration of customer %s %s failed...', customer.firstName, customer.lastName);
        }
    }

    for (let architect of users.architects) {
        logger.info('Registering architect %s %s (%s)', architect.firstName, architect.lastName, architect.email);
        try {

            logger.info('Generating password');

            const password = generatePassword(6);

            logger.info('Password generated!');

            logger.info('Sending signup request...');

            const signupResult = JSON.parse(await sendSignupRequest(config.apiArchitectsEndpoint, JSON.stringify({
                firstName: architect.firstName,
                lastName: architect.lastName,
                email: architect.email,
                password: password
            })));

            logger.info('Signup request successful! Id is %s', signupResult.id);

            logger.info('Sending patch request...');

            await sendPatchUserRequest(config.apiArchitectsEndpoint + '/' + signupResult.id, JSON.stringify(architect), 'Bearer ' + adminToken);

            logger.info('Patch request successful!');
            
            if (config.mails) {
                logger.info('Sending mail to %s with password %s', architect.email, password);
                await sendMail(gmail, jwtClient, architect.email, 'Création de votre compte', 'Votre mot de passe est : ' + password);
                logger.info('Mail successfully sent!');
            }
            logger.info('Registration of architect %s %s successful!', architect.firstName, architect.lastName);
        }
        catch (e) {
            logger.error('Registration of architect %s %s failed...', architect.firstName, architect.lastName);
        }
    }
    return;
}

async function sendLoginRequest(username, password) {
    return sendRequest(config.apiLoginEndpoint, 'POST', JSON.stringify({ username: username, password: password }));
}

async function sendSignupRequest(path, stringData) {
    return sendRequest(path, 'POST', stringData);
}

async function sendPatchUserRequest(path, stringData, auth) {
    return sendRequest(path, 'PATCH', stringData, auth);
}

function sendRequest(path, method, stringData, auth) {
    const protocol = config.secured ? https : http;

    return new Promise((resolve, reject) => {

        const options = {
            host: config.apiHost,
            port: config.apiPort,
            path: path,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': stringData ? Buffer.byteLength(stringData) : '0',
            },
        };

        // Add authorization if present
        if (auth) {
            options.headers.Authorization = auth;
        }

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
                    reject('Server ' + config.apiHost + ' returned code : ' + res.statusCode + ' when trying to ' + method + ' ' + path);
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
        if (stringData) {
            request.write(stringData);
        }

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
