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


# -------------------

A tech-stack-ről:

A végeredmény egy app lesz, ami a javascript egy régebbi, minden böngésző által ismert verziójában íródott.

Ennek ellenére a fejlesztéshez modern tool-okat és library-ket használok, ezekről írok néhány mondatot - egy readme-ben elég nehéz lenne összefogalni az egész rendszert, de szerintem egy jó alapot tudok nyújtani a fő elemekről.

Amiket érdemes átnézni:

- Virtual DOM: A react futtatja a háttérben, nagyon gyors, hatékony újrarenderelést biztosít (folyamatosan, minden apró változatás után újraépíthetjük vele az egész DOM-ot, mindig csak azt építi újra ami ténylegesen változott, de nekünk itt ezt nem kell figyelni)

- Unidirectional data flow: A komponensek közötti adatáramlás egy irányú - minden komponens kibocsát action-öket, ezek "legfelül", a legmagasabb "rangú" komponens state-jét változtatják meg, innen pedig leáramlik az adat minden komponenshez.

- Redux: Tulajdonképp a legmagasabb "rangú" komponens kiszervezése egy külön file-ba. + fő funkciója van: dispatch(), egy eseményt kibocsájtunk, ezt fogja majd megváltoztatni a state-et, getState(), ezzel kapjuk meg a state aktuális állapotát, illetve subscribe(), ezzel iratkozunk fel egy methoddal a változásokra - jelen esetben csak egy reactDOM renderrel, ami újrarajzolja az egész alkalmazást minden apró változás után.

- .jsx: Ez a kiterjesztés a reactJS-hez tartozik - html-szerű kódot írhatunk vele a javascriptbe.

- babel: Egy compiler, mely segítségével előállítunk minden böngésző által ismert ES5-ös javascript kódot az általunk használt nyelvekből - legyen ez ES6, ami a javascript egy modernebb változata, TyepScript, ami egy superset a javascripthez, CoffeeScript (...), illetve különböző stylesheet-ek (css, sass...) vagy akár a reactJS .jsx kiterjesztésű fájlai.

- webpack: Egy build tool, rengeteg alternatívája van - itt konfigurálunk "mindent" (is). Miből, mit, honnan, hova milyen library-k és toolok segítségével, hogy működjenek az importok, különbségek a dev és a prod kód között...


# --------------------------

Object assign bugfix:

Coming soon...
