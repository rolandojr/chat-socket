var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


function renderizarUsuarios(personas) {

    var html = '';

    html += '<li>'
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>'
    html += '</li>'

    personas.forEach(persona => {

        html += '<li>'
        html += '    <a data-id=' + persona.id + ' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ' + persona.nombre + ' <small class="text-success">online</small></span></a>'
        html += '</li>'
    });
    divUsuarios.html(html);

}

function renderizarMensajes(mensaje, yo) {
    var html = '';

    var fecha = new Date(mensaje.fecha);
    var horaMinutos = fecha.getHours() + ":"+ fecha.getMinutes();
    
    var adminClass = 'info';

    
    if (yo) {
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+ mensaje.nombre +'</h5>';
        html += '        <div class="box bg-light-inverse">'+ mensaje.mensaje +'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+ horaMinutos +'</div>';
        html += '</li>';

    } else {
        html += '<li class="animated fadeIn">';
        if (mensaje.nombre === 'Administrador') {
            adminClass = 'danger';
        }
        if (!mensaje.nombre === 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
            
        }
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        
        html += '        <div class="box bg-light-'+ adminClass +'">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time"> '+ horaMinutos +'</div>';
        html += '</li>';
    }

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
})

formEnviar.on('submit', (e) => {
    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // crear el mensaje y enviarlo al servidor
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val(),
        fecha : new Date().getTime()
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje,true);
        scrollBottom();
    });

})



