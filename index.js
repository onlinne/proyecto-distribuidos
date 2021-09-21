//Importar
// Importo express
const express = require('express');
//Importo socket.io
const socketio = require('socket.io');
//Importo http porque scoketio usa un servidor http, http va a tener la app de express
const http = require('http');

//Inicializar
// Inicializo express
const app = express();


//Crear el sv http que contiene la app express con todo el server creado
const server = http.createServer(app);
//Le paso el sv a socket io
const io = socketio(server);

// Configuraciones
//En que puerto esta escuchando la app ?, si la pc no tiene un
//puerto establecido para ejecutar apps usa el 8080
app.set('port', process.env.PORT || 8080);

//sockets
require('./sockets')(io);

//Documentos
//Donde esta public ? el metodo static de express nos dice
app.use(express.static('public'));

//Inicializar el servidor
server.listen(app.get('port'), () => {
    console.log('El servidor esta en el puerto 8080');
})