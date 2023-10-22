$(document).ready(function(){

    $("#consultar").on("click", function(){
        $.ajax({

            url: "http://127.0.0.1:3002/chat",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({pregunta: $("#txt_buscador").val()}), //convertir el valor a json gracias a stringify
            
            success: function (data) { //data es la respuesta
                console.log(data)

            }
        })
    
    })
})