'use strict'

class Circuito{

    constructor(){
    }

    async initMap(){  
        await google.maps.importLibrary("maps");
        var centro = {lat: 43.3672702, lng: -5.8502461};
        // he encontrado dificultades usando el bloque anónimo div con el mapa dinámico
        // ya que no me dejaba moverme en el mapa. Sin embargo, usando article funciona perfectamente
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
    }

    async setKmlFile(files){
        await google.maps.importLibrary("maps");
        this.kmlFile = files[0];
        var script = document.createElement("script");
        document.getElementsByTagName("main")[0].append(script);
        var lector = new FileReader();

        lector.onload = function (event) {
            if (files[0].name.slice(-3) == "kml") {
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
            }else {
                window.alert("Error : ¡¡¡El archivo" + file.name + "no es kml!!!");
            }
        };
        lector.readAsText(this.kmlFile);
        
        
    }

    setSvgFile(files) {
        for (let i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.name.slice(-3) == "svg") {
                var lector = new FileReader();
                lector.onload = function (event) {
                    var svgText = event.target.result;  // El contenido del archivo KML como texto
                    console.log(svgText);
                    var parser = new DOMParser();
                    var svgDoc = parser.parseFromString(svgText, 'text/xml');
                    var svg = svgDoc.getElementsByTagName('svg')[0];
                    var main = document.querySelector("main");
                    var section = document.createElement("section");
                    var header = document.createElement("h3")
                    header.textContent = file.name;
                    section.append(header);
                    section.append(svg);
                    main.append(section);
                }
                lector.readAsText(file);

            }
            else {
                window.alert("Error : ¡¡¡El archivo no es svg!!!");
            }
        }
    }
}

var circuito = new Circuito();