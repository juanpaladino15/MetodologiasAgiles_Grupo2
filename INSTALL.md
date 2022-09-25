## Instalar los modulos de cada api

 > cd frontEnd/trapito
 > npm i
 > cd ../driver
 > npm i

## Levantar las API
En cada directorio de las api existe un archivo main.js. Lanzando
el intérprete de comandos de Javascript sobre ese archivo se lanzan
los servicios de las API

 > npm main.js

## Configurando el React
El Dashboard desarrollado en React requiere de APIS. Las mismas deben
poder ser alcanzadas por el React. Si se lanzan las api de forma local,
las mismas estarán estuchando en localhost en los siguientes puertos:

- La API de trapito en el puerto 8081
- La API de driver en el puerto 8082

El Dashboard posee un archivo de configuración para indicarle a React
cómo alcanzar las API. Se debe editar el archivo siguiente:

 "dashboard/src/config.js"

y cambiar los atributos api_trapito y api_driver por la ip localhost

## Levantar el React en modo Develop
Nos situamos en el directorio del Dashboard programado en React
y lo lanzamos de la siguiente forma

> npm start

