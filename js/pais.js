class Pais {
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


}

var pais = new Pais("España", "Madrid", "48.797.875", );