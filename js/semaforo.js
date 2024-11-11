"use strict";

class Semaforo{
    levels = [0.2, 0.5, 0.8];
    ligths = 4;
    unload_moment = null;
    click_moment = null;
    difficulty;

    constructor(){
        this.difficulty = this.levels[Math.floor(Math.random() * (this.levels.length ) )];
        this.createStructure();
    }

    createStructure(){
        document.write("<section>");
        document.write("<h3>Semáforo</h3>")
        document.write("<section>");
        for(let i = 0; i<this.ligths; i++){
            document.write("<div></div>");
        }
        document.write("</section>");
        document.write("<button>Start</button>");
        document.write("<button>Ver tiempo de reacción</button>");
        document.write("</section>");
    }

}