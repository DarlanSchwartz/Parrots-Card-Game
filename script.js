let isFlipping = false;
let firstCard = null;
let secondCard = null;

let turnAmount = 0;
let seconds = 0;
let intervalId;

 // Pegar o container das cartas
const cardsContainer = document.querySelector('.cardsContainer');

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

// Perguntar quantas cartas o jogador quer jogar
let quantity = prompt("Com quantas cartas você quer jogar? (4 a 14)");
// Enquanto o número de cartas inserido for menor que quatro maior que 14 ou um numero ímpar
// Gerar um novo prompt para o usuário inserir novo número
while (
    Number(quantity) < 4 ||
    Number(quantity) > 14 ||
    Number(quantity) % 2 !== 0
  ) {
    quantity = prompt("Seu número deve ser par e entre 4 e 14");
  }


function Setup()
{
    // Pegar as cartas disponiveis e cortar essa array baseado na quantidade de cartas selecionada no inicio
    let cardsToShuffle = avaibleCards.slice(0, quantity);
    // Embaralhar essa array de cartas para embaralhar
    cardsToShuffle.sort(comparador);
    // Limpar o container de cartas no html
    cardsContainer.innerHTML = "";

    // Instanciar as cartas no html baseadas na array cardstoshuffle
    for (let i = 0; i < cardsToShuffle.length; i++) {
        cardsContainer.innerHTML += 
            `<div data-test="card" class="card back-face" onclick="FlipCard(this)" >
                <div class="front-face face">
                    <img data-test="face-down-image" src="./img/back.png">
                </div>
                <div class="back-face face">
                <img data-test="face-up-image" src="${cardsToShuffle[i]}.gif" >
                </div>
            </div>
            `;
      }
}

// Configurar o jogo na primeira vez que o código passa por aqui
Setup();
// Iniciar o timer do canto direito superior
StartTimer();

// Tentar virar uma carta
function FlipCard(card)
{
    // Se eu ja estou virando uma carta cancela e volta
    if(isFlipping === true)
    {
        console.log("Cannot flip another card while other is flipping");
        return;
    }
    // Se a carta que eu to tentando virar ja está completa
    if(card.classList.contains("complete"))
    {
        return;
    }

    // Se ja tenho 2 cartas viradas cancela e volta
    if(firstCard != null && secondCard != null)
    {
        return;
    }
    
    // Se não virei nenhuma carta logo antes dessa 
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
        // Se a carta que estou tentando virar é a mesma que virei ja na primeira seleção, cancela e volta
        if(card == firstCard)
        {
            return;
        }
        else
        {
            // Do contrário esta será a segunda carta a ser virada e comparada
            secondCard = card;
            card.classList.toggle('back-face');
            isFlipping = true;
            console.log('isFlipping second card');
            turnAmount ++;

            // Se o src de ambas as cartas viradas checado no CompareCards, for igual, adicione a classe complete
            // Nessas cartas e continue o jogo
            if(CompareCards() == true)
            {
                firstCard.classList.add("complete");
                secondCard.classList.add("complete");
                firstCard = null;
                secondCard = null;
            }
            else
            {
                // As cartas viradas não são iguais, desvireas
                console.log('start unfliping both cards');
                setTimeout(UnflipBothCards, 1000);
            }


            // Se todas as cartas estão viradas e completas termine o jogo
            if(CheckCompletion() == true)
            {
                setTimeout(EndGame, 1000);
            }
        }
    }

    EndFlipping();
}
// Desvirar as 2 cartas que foram viradas mas não são iguais
function UnflipBothCards()
{
    firstCard.classList.add('back-face');
    secondCard.classList.add('back-face');
    firstCard = null;
    secondCard = null;
    isFlipping = false;
    console.log('end unfliping cards');
}
// Terminar a ação de virar carta
function EndFlipping()
{
    isFlipping = false;
}
// Comparar o src da primeira carta com o da segunda carta
function CompareCards()
{
    if(firstCard.querySelector(".back-face.face img").src == secondCard.querySelector(".back-face.face img").src)
    {
        return true;
    }

     return false;
}
// Verificar se todas as cartas estão completas
function CheckCompletion(){

    const allCards = document.querySelectorAll('.card');
    const completo = [...allCards].every(carta => carta.classList.contains('complete'));
    return completo;
}
// Terminar o jogo parando o tempo, alertando o numero de jogadas e tempo passado, e perguntar se quer o reinício
function EndGame()
{
    StopTimer();
    alert(`Você ganhou em: ${turnAmount} jogadas!  A duração do jogo foi de ${document.querySelector('.time-elapsed').innerHTML} segundos!`);
    let restart = prompt('Você gostaria de reiniciar a partida?');
    if(restart === 'sim')
    {
        RestartGame();
    }
}
//Reiniciar o jogo reseta o timer, as variaveis e deleta todas as cartas, além de perguntar com quantas cartas quer jogar
function RestartGame()
{
    ResetTimer();
    firstCard = null;
    secondCard = null;
    isFlipping = false;
    cardsContainer.innerHTML = "";
    quantity = prompt("Com quantas cartas você quer jogar? (4 a 14)");

while (
    Number(quantity) < 4 ||
    Number(quantity) > 14 ||
    Number(quantity) % 2 !== 0
  ) {
    quantity = prompt("Seu número deve ser par e entre 4 e 14");
  }

  Setup();
  StartTimer();
  turnAmount = 0;
}
// Retorna um numero aleatório 
function comparador() 
{ 
    return Math.random() - 0.5; 
}
//Inicia o timer
function StartTimer() {
  intervalId = setInterval(UpdateTimer, 1000);
}
// Atualiza o timer no html
function UpdateTimer() {
  seconds++;
  document.querySelector(".time-elapsed").innerHTML = seconds;
}
// Para o timer
function StopTimer() {
  clearInterval(intervalId);
}
// Reseta o timer
function ResetTimer() {
  seconds = 0;
  document.querySelector(".time-elapsed").innerHTML = seconds;
}





