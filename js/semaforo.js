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
        console.log("createStructure");
        var main = document.getElementsByTagName("main")[0];
        var section = document.createElement("section");
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode("Semáforo"));
        
        var section2 = document.createElement("section");
        for(let i = 0; i<this.ligths; i++){
            var div = document.createElement("div");
            div.id = "div" + i;
            section2.appendChild(div);
        }
        var section3 = document.createElement("section");
        var startBtn = document.createElement("button");
        var reactBtn = document.createElement("button");
        section3.append(startBtn);
        section3.append(reactBtn);
        startBtn.appendChild(document.createTextNode("Arranque"));
        startBtn.setAttribute("onclick", "semaforo.initSequence()");
        reactBtn.appendChild(document.createTextNode("Reacción"));
        section.append(h2)
        section.append(section2);
        section.append(section3);
        main.append(section);
        
    
    }

    initSequence(){
        var main = document.getElementsByTagName("main")[0];
        main.classList.add('load');
    }

}
