# maxoft-frontend-dev-env

1. nodeJS és npm installálása - nodeJS-sel futtatunk javascriptet, amikor nem a böngészőben akarjuk, az npm pedig egy build tool/dependency manager (Node Package Manager - olyasmi, mint c# környezetben a NuGet):
https://nodejs.org/en/


2. A szükséges library-k telepítése - ezek a dependency-k a package.json-ben vannak leírva:
command line (a projekt mappában): npm install
(ekkor létrejön a node_modules mappa)

3. A target mappa beállítása - ide fog kerülni a bundle (itt most olyan path van beállítva, amit én használtam):
webpack.config.js - output - path

4. Ekkor futtatható a webpack:
command line (a projekt mappában): node_modules\.bin\webpack --config webpack.config.js
Ha a végére kerül a --watch, akkor debug mode-ban fut, és folymatosan frissíti a target mappában a scripte
