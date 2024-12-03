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
        document.body.append(section);
        
    
    }

    initSequence(){
        var div0 = document.getElementById("div0");
        var div1 = document.getElementById("div1");
        var div2 = document.getElementById("div2");
        var div3 = document.getElementById("div3");
        div0.className ="load";
        setTimeout(function(){
            div1.className ="load";
        }, 750);
        setTimeout(function(){
            div2.className ="load";
        }, 1500);
        setTimeout(function(){
            div3.className ="load";
        }, 2250);
    }

}
