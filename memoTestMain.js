// variables

let cardsUp = 0;
let card1 = null;
let card2 = null;
let firstRes = 0;
let secondRes = 0;
let hits = 0;
let timer = 60;
let timerInitial = 60;
let tLeftId = null;
let movements = 0;
let starTimer = false;


let showMovements = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showtLeft = document.getElementById('tLeftId');
// array
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
numbers = numbers.sort(function() {return Math.random() - 0.5});
console.log(numbers);
// funciones 
function countTime(){
    tLeftId = setInterval(()=>{
        timer--;
        showtLeft.innerHTML = `Tiempo restante: ${timer} segundos` ;
        if (timer == 0){
            clearInterval(tLeftId);
            blockCards();
            //youLose();
            
        }
    },1000)
}
/*
function youLose(){
    let showLoser = document.createElement('p');
    showLoser.textContent = "SE TERMINO EL TIEMPO, HAS PERDIDO";
    showLoser.classList.add('border', 'border-red-500');
}
*/
function blockCards(){
    for (let i = 0; i <= 19; i++) {
        let lockedCard = document.getElementById(i)
        lockedCard.innerHTML = numbers[i];
        lockedCard.disabled = true;
        
    }
}

function uncover(id){
    if (starTimer == false){
        countTime();
        starTimer = true;
    }
    cardsUp++;
    console.log(cardsUp);
    if (cardsUp == 1){
        // Mostar primer numero
        card1 = document.getElementById(id);
        firstRes = numbers[id];
        card1.innerHTML = firstRes;
        card1.disabled = true;
    
    } else if(cardsUp == 2){
        // Mostrar segundo numero
        card2 = document.getElementById(id);
        secondRes = numbers[id];
        card2.innerHTML = secondRes;
        card2.disabled = true;
        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;


        if(firstRes === secondRes){
            // contador de cartas vuelve a 0 una vez que di vuelta 2 cartas y son iguales
            cardsUp = 0;
            // aumentar hits
            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`;

            if(hits == 10){
                clearInterval(tLeftId); 
                showHits.innerHTML = `Aciertos: ${hits}`;
                showtLeft.innerHTML = `GANASTE, solo te demoraste ${timerInitial - timer} segundos!`;
                showMovements.innerHTML = `Movimientos: ${movements}`;
            }
        } else{
            setTimeout(()=>{
                card1.innerHTML = "";
                card2.innerHTML = "";
                card1.disabled = false;
                card2.disabled = false;
                cardsUp = 0;
            },500)
        }
    } 

}