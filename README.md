# Procédure d'installation poste développeur frontend

Créer un compte sur GitHub.com, puis me demander les droits sur le repository

Installer [Node.js](https://nodejs.org/download/release/v6.12.0/node-v6.12.0-x64.msi)

Installer [GitHub Desktop](https://central.github.com/deployments/desktop/desktop/latest/win32) en utilisant le compte créé au préalable.

Installer [Visual Studio Code](https://code.visualstudio.com/docs/?dv=win)

Ouvrir `GitHub Desktop` et cliquer sur `Clone a repository`, dans l'onglet `URL` copier l'URL suivante : https://github.com/youkouleley/talfew

Lorsque `GitHub Desktop` a terminé de récupérer les fichiers, lancer Visual Studio Code et cliquer sur `Fichier` `Ouvrir le dossier` puis sélectionner le dossier  `frontend` dans le dossier créé par GitHub (par défaut `Mes Documents\GitHub\talfew`)

Dans Visual Studio Code, ouvrir le fichier `proxy.config.json` puis remplacer la valeur `http://localhost` par `http://ec2-18-217-96-165.us-east-2.compute.amazonaws.com`

Dans Visual Studio Code, cliquer sur `Afficher`, `Terminal intégré`

Exécuter successivement les commandes suivantes :
> npm install
> 
> npm run start

Lorsque le message `webpack: Compiled successfully` apparait, laisser l'invite de commandes ouverte en arrière-plan puis lancer l'URL http://localhost:4200

Les fois suivantes, seule la commande `npm run start` est nécessaire pour démarrer le frontend
