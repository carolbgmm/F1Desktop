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
        var section = document.createElement("section");
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode("Semáforo"));
        section.appendChild(h2);
        var section2 = document.createElement("section");
        for(let i = 0; i<this.ligths; i++){
            section2.appendChild(document.createElement("div"));
        }
        section.appendChild(section2);
        var section3 = document.createElement("section");
        var startBtn = document.createElement("button");
        var reactBtn = document.createElement("button");
        startBtn.appendChild(document.createTextNode("Start"));
        reactBtn.appendChild(document.createTextNode("Tiempo de reacción"));
        section3.appendChild(startBtn);
        section3.appendChild(reactBtn);
        section.appendChild(section3);
        document.body.appendChild(section);
    }

    initSequence(){

    }

}