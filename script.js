let quantity = prompt("Com quantas cartas você quer jogar? (4 a 14)");

while (
    Number(quantity) < 4 ||
    Number(quantity) > 14 ||
    Number(quantity) % 2 !== 0
  ) {
    quantity = prompt("Seu número deve ser par e entre 4 e 14");
  }


let isFlipping = false;
let firstCard = null;
let secondCard = null;
let turnAmount = 0;
let timePlaying = 0;

// Array de todas as cartas duplicadas para que eu possa usar o slice, cortar no meio, e não faltar cartas..
// porque o numero de cartas sempre vai ser par e 
// o slice vai me retornar as cartas de 0 até a quantidade de cartas selecionada
let avaibleCards = [
    "./img/parrot1",
    "./img/parrot1",
    "./img/parrot2",
    "./img/parrot2",
    "./img/parrot3",
    "./img/parrot3",
    "./img/parrot4",
    "./img/parrot4",
    "./img/parrot5",
    "./img/parrot5",
    "./img/parrot6",
    "./img/parrot6",
    "./img/parrot7",
    "./img/parrot7",
  ];

function Setup()
{
    // Pegar o container das cartas
    let cardsContainer = document.querySelector('.cardsContainer');
    // Pegar as cartas disponiveis e cortar essa array baseado na quantidade de cartas selecionada no inicio
    let cardsToShuffle = avaibleCards.slice(0, quantity);
    // Embaralhar essa array de cartas para embaralhar
    cardsToShuffle.sort(comparador);

    for (let i = 0; i < cardsToShuffle.length; i++) {
        cardsContainer.innerHTML += 
            `<div class="card back-face" onclick="FlipCard(this)">
                <div class="front-face face">
                    <img src="./img/back.png" alt="">
                </div>
                <div class="back-face face">
                    <img src="${cardsToShuffle[i]}.gif" alt="">
                </div>
            </div>
            `;
      }
}

Setup();

function FlipCard(card)
{
    if(isFlipping === true)
    {
        console.log("Cannot flip another card while other is flipping");
        return;
    }
    
    if(card.classList.contains("complete"))
    {
        return;
    }
    
    if(firstCard == null)
    {
        isFlipping = true;
        console.log('isFlipping first card');
        firstCard = card;
        card.classList.toggle('back-face');
        turnAmount ++;
    }
    else
    {
        if(card == firstCard)
        {
            return;
        }
        else
        {
            secondCard = card;
            card.classList.toggle('back-face');
            isFlipping = true;
            console.log('isFlipping second card');
            turnAmount ++;

            if(CompareCards() == true)
            {
                firstCard.classList.add("complete");
                secondCard.classList.add("complete");
                firstCard = null;
                secondCard = null;
            }
            else
            {
                console.log('start unfliping both cards');
                setTimeout(function () {
                    firstCard.classList.add('back-face');
                    secondCard.classList.add('back-face');
                    firstCard = null;
                    secondCard = null;
                    isFlipping = false;
                    console.log('end unfliping cards');
                  }, 1000);
            }

            if(CheckCompletion() == true)
            {
                alert("Você ganhou em:" + turnAmount + "jogadas!");
            }
        }
    }

    setTimeout(function () {
        isFlipping = false;
      }, 1000);
}


function CompareCards()
{
    if(firstCard.querySelector(".back-face.face img").src == secondCard.querySelector(".back-face.face img").src)
    {
        return true;
    }

     return false;
}

function CheckCompletion(){

    const allCards = document.querySelectorAll('.card');
    const completo = [...allCards].every(carta => carta.classList.contains('complete'));
    return completo;
}

function comparador() 
{ 
    return Math.random() - 0.5; 
}