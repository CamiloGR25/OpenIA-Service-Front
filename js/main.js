//$(document).ready(function () { //si el documento esta listo
var converter = new showdown.Converter();//se crea un nuevo objeto converter para el manejo de showdown
main();

function main() {
    $("#consultar").on("click", function () {
        responder();
    });

    $("#txt_buscador").keyup(function (event) { //keyup evento cuando se oprime una tecla
        if (event.keyCode === 13) {//si se oprime enter es el 13 en la tabla key code
            responder();
        }
    });
}
//})
function responder() {

    $.ajax({ //mandar mensajes de manera asincronicas al server sin refrescar el navegador

        url: "http://127.0.0.1:3002/chat",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ pregunta: $("#txt_buscador").val() }), //convertir el valor a json gracias a stringify

        //succes es si hay un funcionamiento exitoso haga la funcion
        success: function (data) { //data es la respuesta dada por el servidor del Back
            //console.log(data)
            $("#chat").append(`<p class="chat-response"> ${converter.makeHtml(data.respuesta)} </p>`) //imprimir la respuesta en el id chat

        }
    });

    limpiar();
}

function limpiar() {
    document.getElementById("txt_buscador").value = "";
}