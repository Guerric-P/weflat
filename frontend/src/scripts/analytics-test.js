var googleId = 'UA-127701707-1';
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`;
head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', googleId);
