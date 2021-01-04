const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function(){
    //Current index of word
    const current = this.wordIndex % this.words.length;
   
    //Get full text of current word
    const fullTxt = this.words[current];

    //Check for deleting
    if(this.isDeleting){
        //Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else{
        //Add character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial Type speed
    let typeSpeed = 250;

    if(this.isDeleting){
        typeSpeed /= 2;
    }

    //Check if word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Pause at end
        typeSpeed = 500;
        //set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}