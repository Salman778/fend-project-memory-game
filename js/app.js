//Initial value
let count = -1, move = 0, events = [], start = 0;
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
    //Remove all the stars
    setInterval(function() {
        document.getElementById("time").innerHTML = start + "S";
        if(start != 0)
        start++;
    }, 1000);
    document.getElementsByClassName("stars")[0].innerHTML = '';
    //Add three stars
    for(let i = 0; i < 3; i++)
        document.getElementsByClassName("stars")[0].innerHTML += '<li><i class="fa fa-star"></i></li>';
    //shuffle our array
    shuffle(cards);
    //get all our cards
    cardsNumbers = document.querySelectorAll(".card");
    //add Event Listener for each one from our cards
    for(let i = 0; i < cardsNumbers.length; i++)
        cardsNumbers[i].addEventListener("click", check), cardsNumbers[i].className = "card", 
        cardsNumbers[i].childNodes[1].className = cards[i];
}



function check(){
    //The timer start
    if(start === 0)
        start++
    //Remove Event Listener
    this.removeEventListener("click", check);
    //flip the card
    this.className = "card open show";
    //push to the events array to compare with first/second push
    events.push(this);
    //check if there were two cards flip and if same
    if(events.length === 2 && events[0].childNodes[1].className === events[1].childNodes[1].className){
        events[0].className = "card match", events[1].className = "card match", move++, events = [], count++;
        if(move === 8 || move === 9)
            document.getElementsByClassName("stars")[0].childNodes[0].remove();
    }
    //check if there were two cards flip and if not same
    else if(events.length === 2)
        setTimeout(function(){
        events[0].className = "card", events[1].className = "card";
        events[0].addEventListener("click", check), events[1].addEventListener("click", check);
        events = [];
        move++;
        if(move === 7 || move === 9)
            document.getElementsByClassName("stars")[0].childNodes[0].remove();
        }, 200);
    //if all our cards fliped
    if(count === 7)
        setTimeout(function() {
            //re-assign Initial value
            alert("Congratulate\nTime: " + start + " Seconds\n" + "Strar: " + document.getElementsByClassName("fa-star").length);
            count = -1;
            move = 0;
            start = 0;
            document.getElementsByClassName("moves")[0].textContent = move;
            game();
        }, 200)
    document.getElementsByClassName("moves")[0].textContent = move;
    
}

document.getElementsByClassName("restart")[0].addEventListener("click", function(){
    //re-assign Initial value
    count = -1;
    move = 0;
    start = 0;
    document.getElementsByClassName("moves")[0].textContent = move;
    game();
})

game()