"use strict";

class Viajes{

    kmlFile;

    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),  this.verErrores.bind(this));
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

    

    initMap(){  
        var centro = {lat: 43.3672702, lng: -5.8502461};
        var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName("div")[0],{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
    
                infoWindow.setPosition(pos);
                infoWindow.setContent('Localización encontrada');
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
              }, function() {
                handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
              });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
    }

    initKmlMap(){  
        var map = new google.maps.Map(document.getElementsByTagName("div")[0], {
            center: new google.maps.LatLng(-19.257753, 146.823688),
            zoom: 2,
            mapTypeId: 'terrain'
          });
        
        var kmlLayer = new google.maps.KmlLayer(this.kmlFile, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map,
          });
        kmlLayer.addListener('click', function(event) {
            var content = event.featureData.infoWindowHtml;
            var testimonial = document.getElementById('capture');
            testimonial.innerHTML = content;
          });
    }

    setFile(file){
        this.kmlFile = file;
        var script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("defer", "");
        script.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3k7yZNPOEKeeFsGYF0329YKwyMWL6MsY&callback=viajes.initKmlMap");
        document.getElementsByTagName("main")[0].append(script);
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