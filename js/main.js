//$(document).ready(function () { //si el documento esta listo
var converter = new showdown.Converter();//se crea un nuevo objeto converter para el manejo de showdown
var artyom = new Artyom();//el sonido
var banderaSonido = false;
main();

function main() {
    //configurar sonido:
    artyom.initialize({
        lang: "es-ES",
        debug: true,
        listen: true,
        continuous: true,
        speed: 0.9,
        mode: "normal"
    });
    $("#consultar").on("click", function () {
        responder();
    });

    $("#txt_buscador").keyup(function (event) { //keyup evento cuando se oprime una tecla
        if (event.keyCode === 13) {//si se oprime enter es el 13 en la tabla key code
            responder();
        }
    });

    $("#sonido").on("click", function () {
        artyom.say("sonido activado");
        banderaSonido = true;
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
            if (banderaSonido) {
                artyom.say(data.respuesta);
            }

        }
    });

    limpiar();
}

function limpiar() {
    document.getElementById("txt_buscador").value = "";
}