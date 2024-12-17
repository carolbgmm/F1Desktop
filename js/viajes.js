"use strict";

class Viajes{

    kmlFile;
    dinamicMap;

    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),  this.verErrores.bind(this));
        this.dinamicMap = false;
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    //api:
    //AIzaSyD3k7yZNPOEKeeFsGYF0329YKwyMWL6MsY
    
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    verTodo(dondeVerlo){
        var ubicacion=document.getElementById(dondeVerlo);
        var datos='<p>'+ this.mensaje + '</p>'; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la longitud y latitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }

    getMapaEstaticoGoogle(dondeVerlo){
        var ubicacion=document.getElementById(dondeVerlo);
        
        var apiKey = "&key=AIzaSyD3k7yZNPOEKeeFsGYF0329YKwyMWL6MsY";
        //URL: obligatoriamente https
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = "center=" + this.latitud + "," + this.longitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom ="&zoom=15";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "&size=800x600";
        //Escala (opcional)
        //Formato (opcional): PNG,JPEG,GIF
        //Tipo de mapa (opcional)
        //Idioma (opcional)
        //region (opcional)
        //marcadores (opcional)
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        //rutas. path (opcional)
        //visible (optional)
        //style (opcional)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
    }

    

    async initMap(){  
        if(!this.dinamicMap){
            await google.maps.importLibrary("maps");
            var centro = {lat: 43.3672702, lng: -5.8502461};
            var map = document.createElement("article");
            let mapaGeoposicionado = new google.maps.Map(map,{
                zoom: 10,
                center:centro,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            let infoWindow = new google.maps.InfoWindow;
        
            infoWindow.setPosition(centro);
            infoWindow.setContent('Localización encontrada');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(centro);
    
            var main = document.querySelector("main");
            main.prepend(map);
            this.dinamicMap = true;
        }
        
    }

    async setFile(files){
        this.kmlFile = files[0];
        var script = document.createElement("script");
        document.getElementsByTagName("main")[0].append(script);
        var lector = new FileReader();

        console.log("before load");
        lector.onload = function (event) {
            console.log("hey");
            var kmlText = event.target.result;  // El contenido del archivo KML como texto

            // Convierte el texto KML a un documento XML
            var parser = new DOMParser();
            var kmlDoc = parser.parseFromString(kmlText, 'text/xml');

            // Obtiene todos los elementos Placemark del documento KML
            var placemarks = kmlDoc.getElementsByTagName('Placemark');
            var pathlinecoords = []
            for (var i = 0; i < placemarks.length; i++) {
                console.log(placemarks);
                var placemark = placemarks[i];
                console.log(placemark);
                // Obtiene las coordenadas del Placemark
                var coordinates = placemark.getElementsByTagName('coordinates')[0].textContent.split(',');

                if (self.kmlMap == undefined) {
                    var mapArt = document.getElementsByTagName("div")[0];
                    self.kmlMap = new google.maps.Map(mapArt, {
                        zoom: 14,
                        center: { lat: parseFloat(coordinates[1]), lng: parseFloat(coordinates[0]) }
                    });
                }

                // Crea un marcador en el mapa para cada Placemark
                new google.maps.Marker({
                    position: { lat: parseFloat(coordinates[1]), lng: parseFloat(coordinates[0]) },
                    title: "",
                    map: self.kmlMap
                });

                pathlinecoords.push(new google.maps.LatLng(parseFloat(coordinates[1]), parseFloat(coordinates[0])));

            }
            var pathLine = new google.maps.Polyline({
                path: pathlinecoords,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            pathLine.setMap(self.kmlMap)
        };
        console.log("post load");
        lector.readAsText(this.kmlFile);
        
    }
    
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                                'Error: Ha fallado la geolocalización' :
                                'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
    }

    slides;
    curSlide;
    maxSlide;
    showCarrusel() {
        self = this;
        var article = document.querySelector("aside article");

        this.slides = document.querySelector("aside").querySelector("article").querySelectorAll("img");
        this.curSlide = 0;
        this.maxSlide = this.slides.length - 1;

        $("<button></button>").attr("data-action", "next").append(">").click(function () {
            if (self.curSlide == self.maxSlide) {
                self.curSlide = 0;
            } else {
                self.curSlide++;
            }
            self.slides.forEach((slide, indx) => {
                var trans = 100 * (indx - self.curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        }).appendTo(article);
        $("<button></button>").attr("data-action", "prev").append("<").click(function () {
            if (self.curSlide == 0) {
                self.curSlide = self.maxSlide;
            } else {
                self.curSlide--;
            }
            self.slides.forEach((slide, indx) => {
                var trans = 100 * (indx - self.curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        }).appendTo(article);


    }
}

var viajes = new Viajes();