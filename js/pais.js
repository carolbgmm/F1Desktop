"use strict";
class Pais {
    nombre;
    capital;
    poblacion;
    nCircuito;
    gobierno;
    coordMeta;
    religion;
    constructor(nombre, capital, poblacion){
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    setNCircuito(nCircuito){
        this.nCircuito = nCircuito;
    }

    setGobierno(gobierno){
        this.gobierno = gobierno;
    }

    setCoordMeta(coordMeta){
        this.coordMeta = coordMeta;
    }

    setReligion(religion){
        this.religion = religion;
    }

    getNombre(){
        document.write("<p>" + this.nombre + "</p>");
    }

    getCapital(){
        document.write("<p>" + this.capital + "</p>");
    }

    getInfo(){
        document.write("<ul><li>Nombre del circuito: " + this.nCircuito 
            + "</li><li>Forma de gobierno: " + this.gobierno
            + "</li><li>Religión mayoritaria: " + this.religion + "</li></ul>");
    }

    getCoord(){
        document.write("<p>Coordenadas de la línea de meta del circuito: " + this.coordMeta + "</p>");
    }

    //Haz que el servicio web devuelva la información del tiempo en formato XML, en idioma español y con unidades de medida del sistema métrico.
    apikey = "4e7ac9eaf132fd8c0117221734ed2258";
    getMeteoData() {
        var html = "";
        var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.coordMeta.slice(0, 8) + "&lon=" + this.coordMeta.slice(10)+"&appid=" + this.apikey + "&units=metric&mode=xml&lang=es";
        $.ajax({
            url: url,
            dataType: "xml",
            method: 'GET',
            success: function (datos) {
                console.log(datos);
                var forecast =  $('forecast time', datos);
                var day = -1;
                var lastDateI = 0;
                var maxTemp = 0;
                var minTemp = 0;
                var humidity = 0;
                var lastDate = " ";
                for(let i = 0; i<forecast.length; i++){
                    var newDate = $('time:eq(' + i + ')', datos).attr("from").slice(0, 10);
                    var temp = parseFloat($('temperature:eq(' + i + ')', datos).attr("value"));
                    if(lastDate == newDate){
                        humidity += parseFloat($('humidity:eq(' + i + ')', datos).attr("value"));
                        if(maxTemp < temp){
                            maxTemp  = temp;
                        } else if(minTemp > temp){
                            minTemp = temp;
                        }
                    } else {
                        day++;
                        if(day > 0){
                            
                            humidity = humidity/(i- lastDateI);
                            html += "<article>";
                            html += "<h4>" + lastDate + "</h4>";
                            html += "<img src='https://openweathermap.org/img/wn/" + $('symbol:eq(' + parseInt(i-(i- lastDateI)/2) + ')', datos).attr("var")  +"@2x.png'/>";
                            html += "<p>Máxima:" + maxTemp +"ºC</p>";
                            html += "<p>Mínima:" + minTemp +"ºC</p>";
                            html += "</article>";
                            lastDateI = i;
                        }
                        lastDate = newDate;
                        minTemp = temp;
                        maxTemp = temp;
                        humidity = parseFloat($('humidity:eq(' + i + ')', datos).attr("value"));
                    }     
                }
                humidity = humidity/(forecast.length- lastDateI);
                html += "<article>";
                html += "<h4>" + lastDate + "</h4>";
                html += "<img src='https://openweathermap.org/img/wn/" + $('symbol:eq(' + parseInt(forecast.length-(forecast.length- lastDateI)/2) + ')', datos).attr("var")  +"@2x.png'/>";
                html += "<p>Máxima:" + maxTemp +"ºC</p>";
                html += "<p>Mínima:" + minTemp +"ºC</p>";
                html += "</article>";
                $("section").append(html);
                
              
                
            },
            error: function (err) {
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                console.log(err)
                
            }
        });
    }

}

var pais = new Pais("España", "Madrid", "48.797.875", );
pais.setCoordMeta("41.570025 2.261211");
pais.setNCircuito("Barcelona-Catalunya");