"use strict";

class Semaforo{
    levels = [0.2, 0.5, 0.8];
    ligths = 4;
    unload_moment = null;
    click_moment = null;
    difficulty;
    unload_moment;
    click_moment;

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
        var text = document.createElement("p");
        section3.append(startBtn);
        section3.append(reactBtn);
        section3.append(text);
        startBtn.appendChild(document.createTextNode("Arranque"));
        startBtn.setAttribute("onclick", "semaforo.initSequence()");
        reactBtn.appendChild(document.createTextNode("Reacción"));
        reactBtn.setAttribute("disabled", "true");
        reactBtn.setAttribute("onclick", "semaforo.stopReaction()");
        section.append(h2)
        section.append(section2);
        section.append(section3);
        main.append(section);  
    }

    initSequence(){
        var main = document.getElementsByTagName("main")[0];
        main.classList.add('load');
        var startBtn = document.getElementsByTagName("button")[0];
        startBtn.setAttribute("disabled", "true");

        setTimeout(()=>{
            this.unload_moment = new Date();
            this.endSequence();
        },this.difficulty*100+2000);

        
    }

    endSequence(){
        var main = document.getElementsByTagName("main")[0];
        main.className ='unload';

        var reactBtn = document.getElementsByTagName("button")[1];
        reactBtn.removeAttribute("disabled");
    }

    stopReaction(){
        this.click_moment = new Date();
        var milliseconds;
        if(this.click_moment.getSeconds() - this.unload_moment.getSeconds() == 0){
            milliseconds= this.click_moment.getMilliseconds() - this.unload_moment.getMilliseconds();
        } else {
            milliseconds= this.click_moment.getMilliseconds() - this.unload_moment.getMilliseconds() + 1000*(this.click_moment.getSeconds() - this.unload_moment.getSeconds()) ;
        }
        var text = document.getElementsByTagName("p")[1];
        text.textContent = "Tiempo de reacción: " + milliseconds + " ms.";
        var main = document.getElementsByTagName("main")[0];
        main.className ='';
        var reactBtn = document.getElementsByTagName("button")[1];
        reactBtn.setAttribute("disabled", "true");
        var startBtn = document.getElementsByTagName("button")[0];
        startBtn.removeAttribute("disabled");
    }

}
