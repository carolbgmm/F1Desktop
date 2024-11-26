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
        var section = document.getElementById("sectionSemaforo");
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode("Semáforo"));
        
        var section2 = document.createElement("section");
        for(let i = 0; i<this.ligths; i++){
            var div = document.createElement("div");
            div.id = "div" + i;
            section2.appendChild(div);
        }
        var startBtn = document.getElementById("btnArranque");
        var reactBtn = document.getElementById("btnReaccion");
        startBtn.appendChild(document.createTextNode("Arranque"));
        reactBtn.appendChild(document.createTextNode("Reacción"));
        section.prepend(section2);
        section.prepend(h2)

    }

    initSequence(){
        document.getElementsById("div0");
    }

}
