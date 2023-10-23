var converter = new showdown.Converter();//se crea un nuevo objeto converter para el manejo de showdown
var artyom = new Artyom();//el sonido
var banderaSonido = false;
var audioAux;
main();

function main() {

    $("#sonidoDesactivado").hide();

    $(".consultar").on("click", function () {
        responder(verificarPregunta());

    });

    $("#txt_buscador").keyup(function (event) { //keyup evento cuando se oprime una tecla
        if (event.keyCode === 13) {//si se oprime enter es el 13 en la tabla key code
            responder();
        }
    });

    $("#sonidoActivado").on("click", function () {
        activarSonido();
    });

    $("#sonidoDesactivado").on("click", function () {
        desactivarSonido();
    });
    $("#buscarAudio").on("click", function () {
        mostrarBusquedaAudio();
        limpiar();
    });
    $("#limpiar").on("click", function () {
        limpiar()
    })

}

function responder(preg) {

    $.ajax({ //mandar mensajes de manera asincronicas al server sin refrescar el navegador

        url: "http://127.0.0.1:3002/chat",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ pregunta: preg }), //convertir el valor a json gracias a stringify

        //succes es si hay un funcionamiento exitoso haga la funcion
        success: function (data) { //data es la respuesta dada por el servidor del Back
            //console.log(data)
            $("#chat").append(`<p class="chat-response"> ${converter.makeHtml(data.respuesta)} </p>`) //imprimir la respuesta en el id chat
            if (banderaSonido) {
                artyom.say(data.respuesta);//hablar
            }
        }
    });

    limpiar();
    audioAux = "";
}

function limpiar() {
    document.getElementById("txt_buscador").value = "";
    $(".audio").remove();

}

function activarSonido() {
    artyom.say("sonido activado");
    banderaSonido = true;
    $("#sonidoDesactivado").show();//mostrar objeto
    $("#sonidoActivado").hide();//ocultar objeto
}

function desactivarSonido() {
    artyom.say("sonido desactivado");
    banderaSonido = false;
    $("#sonidoActivado").show();//mostrar objeto
    $("#sonidoDesactivado").hide();//ocultar objeto
}


//configurar sonido:
artyom.initialize({
    lang: "es-ES",
    debug: true,
    listen: true,
    continuous: true,
    speed: 0.9,
    mode: "normal"
});
//Acciones de voz
artyom.addCommands({
    indexes: ["Activar", "Desactivar", "Buscar", "audio"],
    action: function (i) {
        if (i == 0) {
            activarSonido();
        } else if (i == 1) {
            desactivarSonido();
        }
        else if (i == 2) {
            responder(verificarPregunta());
        }
        else if (i == 3) {
            $("#buscarAudio").click();
            mostrarBusquedaAudio();
            limpiar();
        }
    }
});

function mostrarBusquedaAudio() {
    artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
        if (isFinal) {
            $("#fondoConsultar").append(`<p class="audio"> ${recognized} </p>`);
            audioAux = recognized;
        }
    });
}

function verificarPregunta() {
    if ($("#txt_buscador").val().length != 0) {
        return $("#txt_buscador").val()
    } else {
        return audioAux;
    }
}