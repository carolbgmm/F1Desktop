
"use strict";
class Memoria{

    hasFlippedCard;
    lockBoard;
    firstCard;
    secondCard;

    elements = [
        {"element": "Redbull", "source":"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"},
        {"element": "Redbull", "source":"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"},
        {"element": "McLaren", "source":"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"},
        {"element": "McLaren", "source":"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"},
        {"element": "Alpine", "source":"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"},
        {"element": "Alpine", "source":"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"},
        {"element": "AstonMartin", "source":"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"},
        {"element": "AstonMartin", "source":"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"},
        {"element": "Ferrari", "source":"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"},
        {"element": "Ferrari", "source":"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"},
        {"element": "Mercedes", "source":"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"},
        {"element": "Mercedes", "source":"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"}
    ];

    constructor(){
        this.resetBoard();
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements(){
        var len = this.elements.length;
        for(let i = 0; i < len; i++){
            var index = Math.floor(Math.random() * (len - i) + i);
            var temp = this.elements[i];
            this.elements[i] = this.elements[index];
            this.elements[index] = temp;
        }
    }

    unflipCards(){
        this.lockBoard = true;
        setTimeout(()=> {
            this.firstCard.dataset.style = '';
            this.secondCard.dataset.style = '';
            this.resetBoard();
        }, 2500);
        
    }

    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false; 
    }

    checkForMatch(){
        this.firstCard.dataset.element == this.secondCard.dataset.element ?
        this.disableCards():
        this.unflipCards();
    }

    disableCards(){
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed";
        this.resetBoard();
    }

    createElements() { 
        var section = document.createElement("section");
        var h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode("Juego de memoria"));
        section.appendChild(h2);
        
        for (let i in this.elements) {
            // create the element article
            var article = document.createElement("article");
            // create and set the value to the attribute data-element
            var dataElement = document.createAttribute("data-element");
            dataElement.value = this.elements[i].element ;
            // create the h3 element and set the text
            var h3 = document.createElement("h3");
            h3.appendChild(document.createTextNode("Tarjeta de memoria"));
            // create the img with attributes
            var img = document.createElement("img");
            var src = document.createAttribute("src");
            src.value = this.elements[i].source;
            var alt = document.createAttribute("alt");
            alt.value = this.elements[i].element ;
            img.setAttributeNode(src);
            img.setAttributeNode(alt);
            // set the article
            article.setAttributeNode(dataElement);
            article.appendChild(h3);
            article.appendChild(img);
            section.appendChild(article);
        }
        document.body.appendChild(section);
    }

    addEventListeners() {
        document.querySelectorAll("article").forEach(card =>
            card.addEventListener("click", this.flipCard.bind(this, this, card))
        )
    }

    flipCard(game, card) {
        if (card.dataset.state == 'revealed') {
            return;
        }
        if (game.lockBoard == true) {
            return;
        }
        if (card == game.firstCard) {
            return;
        }

        card.dataset.style = 'flip';

        if (game.hasFlippedCard == false) {
            game.firstCard = card;
            game.hasFlippedCard = true;
        } else {
            game.lockBoard = true; 
            game.secondCard = card;
            game.checkForMatch()
        }
    };

}