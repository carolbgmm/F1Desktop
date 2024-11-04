

class Memoria{

    hasFlippedCard;
    lockBoard;
    firstCard;
    secondCard;

    elements = {
        "elements": [
            {
                "element": "Redbull",
                "source":"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg",
            },
            {
                "element": "Redbull",
                "source":"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg",
            },
            {
                "element": "McLaren",
                "source":"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg",
            },
            {
                "element": "McLaren",
                "source":"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg",
            },
            {
                "element": "Alpine",
                "source":"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg",
            },
            {
                "element": "Alpine",
                "source":"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg",
            },
            {
                "element": "AstonMartin",
                "source":"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg",
            },
            {
                "element": "AstonMartin",
                "source":"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg",
            },
            {
                "element": "Ferrari",
                "source":"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
            },
            {
                "element": "Ferrari",
                "source":"https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg",
            },
            {
                "element": "Mercedes",
                "source":"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg",
            },
            {
                "element": "Mercedes",
                "source":"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg",
            }
        ]
    };
    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
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
        }, 1000);
        
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
        document.write("<section>")
        document.write("<h2> Juego de memoria </h2>")
        for (let i in this.elements) {
            document.write("<article data-element=\"" + this.elements[i].element + "\">")
            document.write("<h3>Tarjeta de memoria</h3>")
            document.write("<img src=\"" + this.elements[i].source + "\" alt=\"" + this.elements[i].element + "\">");
            document.write("</article>")
        }
        document.write("</section>")
    }


}