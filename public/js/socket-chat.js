var socket = io();

var params = new URLSearchParams(window.location.search)
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre/sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function () {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp) => {
            console.log('Chat',resp);
        });
});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información

socket.on('crearMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);

});
socket.on('listaPersona', function (mensaje) {
    console.log(mensaje);

});
socket.on('mensajePrivado', mensaje => {
    console.log('Mensaje Privado' , mensaje);
} )