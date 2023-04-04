/*let quantity = prompt("Com quantas cartas você quer jogar? (4 a 14)");

while (
    Number(quantity) < 4 ||
    Number(quantity) > 14 ||
    Number(quantity) % 2 !== 0
  ) {
    quantity = prompt("Seu número deve ser par e entre 4 e 14");
  }
*/

let isSelecting;
let firstCard;
let secondCard;

function FlipCard(card)
{
    if(card.classList.contains("complete"))
    {
        return;
    }
    
    if(firstCard == null)
    {
        firstCard = card;
        card.classList.toggle('back-face');
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

            if(CompareCards() == true)
            {
                firstCard.classList.add("complete");
                secondCard.classList.add("complete");
            }

            card.classList.toggle('back-face');

            if(CheckCompletion() == true)
            {
                alert("Fim de jogo!");
            }
        }
    } 
}

function CompareCards()
{
    return firstCard.id === secondCard.id;
}

function CheckCompletion(){
    const allCards = document.querySelectorAll(".card");

    let completo = true;

    allCards.forEach(allCards => {
        if (!allCards.classList.contains('complete')) {
          // Se uma carta não estiver completa, marca completo como false e encerra o loop
          completo = false;
          return false;
        }
      });

      return true;
}