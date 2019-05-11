let count = -1, move = 0, events = []
const cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube",
               "fa fa-leaf", "fa fa fa-bicycle", "fa fa-bomb", "fa fa-anchor",
               "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube",
               "fa fa-leaf", "fa fa fa-bicycle", "fa fa-bomb", "fa fa-anchor"];


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
     return array;
}


function game() {
    shuffle(cards);
    cardsNumbers = document.querySelectorAll(".card");
    for(let i = 0; i < cardsNumbers.length; i++)
        cardsNumbers[i].addEventListener("click", check), cardsNumbers[i].className = "card", 
        cardsNumbers[i].childNodes[1].className = cards[i];
}



function check(){
    this.removeEventListener("click", check);
    this.className = "card open show";
    events.push(this);
    if(events.length === 2 && events[0].childNodes[1].className === events[1].childNodes[1].className)
        events[0].className = "card match", events[1].className = "card match", move++, events = [], count++;
    else if(events.length === 2)
        setTimeout(function(){
        events[0].className = "card", events[1].className = "card";
        events[0].addEventListener("click", check), events[1].addEventListener("click", check);
        events = [];
        move++;
        }, 200);
    if(count === 7)
        setTimeout(function() {
            alert("you win");
            count = -1;
            move = 0;
            document.getElementsByClassName("moves")[0].textContent = move;
            game();
        }, 200)
    document.getElementsByClassName("moves")[0].textContent = move;
}


game()
document.getElementsByClassName("restart")[0].addEventListener("click", function(){
    count = -1;
    move = 0;
    document.getElementsByClassName("moves")[0].textContent = move;
    game();
})