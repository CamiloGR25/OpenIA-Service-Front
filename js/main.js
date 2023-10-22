$(document).ready(function () { //si el documento estamlisto

    var converter = new showdown.Converter();//se crea un nuevo objeto converter para el manejo de showdown

    $("#consultar").on("click", function () {
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
        })

    })
})