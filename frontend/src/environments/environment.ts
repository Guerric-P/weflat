// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backendUrl: 'http://localhost',
  baseBackendUrl: '/backend',
  stripePublicKey: 'pk_test_EJlsBsLshUf7TNnB2ITpQ7sB',
  googleMapsUrl: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAK7jAiHuz-NhGcZWd8mwdRBQWzNTkfXyY&libraries=places',
  displayTestWarning: true
};
