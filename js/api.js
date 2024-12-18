"use strict";
class APIRaces {
    draggingRace = null;

    addRace(race) {
        this.storeRace(race);
        this.showRace(race);
    }

    //Carga las carreras del WebStorage
    loadRaces() {
        var races = JSON.parse(localStorage.getItem('races')) || [];
        console.log(races)
        var sectionRaces = document.querySelector('main section');
        sectionRaces.innerHTML = '';
        for (var i = 0; i < races.length; i++) {
            this.showRace(races[i]);
        }
    }

    //Elimina una carrera de la página web y del WebStorage
    deleteRace(e) {
        e.preventDefault();
        var race = e.dataTransfer.getData('text');
        var pRaces = document.querySelectorAll('main section p');
        var pRace;
        for (var i = 0; i < pRaces.length; i++) {
            if (pRaces[i].textContent === race) {
                pRace = pRaces[i];
                break;
            }
        }
        if (pRace) {
            //Elimina la carrera del WebStorage
            pRace.parentNode.removeChild(pRace);
            this.removeRace(race);
        }
    }

    //Método a parte para eliminar la carrera del WebStorage
    removeRace(race) {
        var races = JSON.parse(localStorage.getItem('races')) || [];
        var index = races.indexOf(race);
        if (index !== -1) {
            races.splice(index, 1);
        }
        localStorage.setItem('races', JSON.stringify(races));
    }

    storeRace(race) {
        var races = JSON.parse(localStorage.getItem('races')) || [];
        races.push(race);
        localStorage.setItem('races', JSON.stringify(races));
    }

    //WebStorage
    storeRace(race) {
        var races = JSON.parse(localStorage.getItem('races')) || [];
        races.push(race);
        localStorage.setItem('races', JSON.stringify(races));
    }

    //Guarda orden en localStorage
    storeRaces() {
        var races = Array.from(document.querySelectorAll('main section p')).map(p => p.textContent);
        localStorage.setItem('races', JSON.stringify(races));
    }

    //Marca una carrera como vista. 
    // La elimina del WebStorage.
    checkRace(e) {
        e.preventDefault();
        if (this.draggingRace) {
            var delElement = document.createElement('del');
            delElement.textContent = this.draggingRace.textContent;

            var sectionRaces = document.querySelector('main section');
            sectionRaces.appendChild(delElement); // Añade el nuevo elemento 'del' al final del bloque 'main section'

            this.draggingRace.parentNode.removeChild(this.draggingRace); // Elimina la carrera original del elemento 'p'
            this.removeRace(this.draggingRace.textContent);
            this.draggingRace = null; // Restablece la carrera que se está arrastrando después de manejarla
        }
    }

    //Se ha llamado al método de añadir una nueva carrera con los datos del input
    clickAdd() {
        var input = document.querySelector('main input');
        var race = input.value;
        if (race != "") {
            input.value = "";
            this.addRace(race);
        }
    }

    //Borramos todas las carreras del WebStorage y de la página
    clickClear() {
        localStorage.clear()
        var sectionRaces = document.querySelector('main section');
        sectionRaces.innerHTML = '';
    }

    //Copia el texto de la carrera seleccionada
    copyRace(e) {
        e.preventDefault();
        var race = e.dataTransfer.getData('text');
        navigator.clipboard.writeText(race);
    }

    //Pega el texto como una nueva carrera
    pasteRace() {
        navigator.clipboard.readText().then((text) => {
            this.addRace(text);
        });
    }

    //Comprobar que la tecla pulsada sea enter y no otra y añadir.
    keyDown(e){
        if (e == 'Enter') {
            this.clickAdd()
        }
    }

    showRace(race) {
        self = this;
        var sectionRaces = document.querySelector('main section');
        var pRace = document.createElement('p');
        pRace.textContent = race;
        pRace.draggable = true;

        pRace.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text', this.textContent);
            this.classList.add('dragging');
            self.draggingRace = this;
        });

        pRace.addEventListener('dragend', function () {
            this.classList.remove('dragging');
            self.storeRaces();
            self.draggingRace = null;
        });

        sectionRaces.addEventListener('dragover', function (e) {
            e.preventDefault();
            var dragging = document.querySelector('.dragging');
            var target = e.target;
            if (target.nodeName === 'P') {
                var rect = target.getBoundingClientRect();
                var offset = (e.clientY - rect.top) / (rect.bottom - rect.top);
                if (offset < 0.5) {
                    this.insertBefore(dragging, target); //De la mitad para arriba, insertamos antes
                } else {
                    this.insertBefore(dragging, target.nextSibling); //De la mitad para abajo, insertamos después
                }
            }
        });

        sectionRaces.insertBefore(pRace, sectionRaces.firstChild);
    }
}

var api = new APIRaces();