import { useEffect } from 'react'
import Deck from '@/utils/Deck';
import Card from '@/utils/Card';

const Play = () => {


  const DeckOfCards = new Deck();
  
  console.log(DeckOfCards.getCards());
  
  

  useEffect(() => {

    
    const playerArea = document.getElementById('playerArea');
    const opponentArea = document.getElementById('opponentArea');
    const deck = document.querySelector('.deck');
    const numCards = 32;

    const resetButton = document.getElementById('reset')
    const dealCardsButton = document.getElementById('deal-cards');
    const shuffleButton = document.getElementById('shuffle');

    resetButton?.addEventListener('click', ()=>{
      createCards();
      
    })

    dealCardsButton?.addEventListener('click', ()=>{
      dealCards();
    })

    shuffleButton?.addEventListener('click', ()=>{
      shuffleCards();
    })
    
    if (deck) {
      (deck as HTMLElement).style.display = 'non';
    }
    
    //const cards = document.querySelectorAll('.card');


    const createCards = () =>{
      //cards = []
      deck!.innerHTML = "";
      DeckOfCards.shuffle();
      
      //cards.forEach(card=>card.remove());
      
      for(let i = 0; i < numCards; i++){
        // const card = document.createElement('div');
        // card.setAttribute('id', `${DeckOfCards.getCards()[i].getCardName()}`);
        // card.className = 'card';
        // card.addEventListener('click', ()=>{
        //   console.log(`${DeckOfCards.getCards()[i].getCardName()} has been clicked`);
        // });
        // card.innerHTML = DeckOfCards.getCards()[i].getHtml();
        // card.style.transform = `translateX(${i*10}px)`;
        const card = DeckOfCards.getCards()[i];
        const cardHtml = card.html
        cardHtml.style.transform = `translateY(${i}px)`;
        deck?.appendChild(cardHtml);
        //cards.push(cardHtml);
      }
      
    }

    //console.log(cards);
    let isDealing = false;
    let isShuffling = false;

    const dealingSequence = [
      {target:'opponent', positions:[0,1,2]},
      {target:"player", positions:[0,1,2]},
      {target:"opponent", positions:[3,4]},
      {target:'player', positions:[3,4]}
    ]


    async function shuffleCards(){
        if(isShuffling)return;
        isShuffling = true;
        DeckOfCards.shuffle();

        for(let i = 0; i < numCards; i++){
          const card = DeckOfCards.getCards()[i];
          const cardHtml = card.html
          cardHtml.style.transform = `translateY(${i}px)`;
        }
        
        const leftHalf = DeckOfCards.getCards().slice(0, DeckOfCards.getCards().length/2)
        const rightHalf = DeckOfCards.getCards().slice(DeckOfCards.getCards().length/2, DeckOfCards.getCards().length);

        await splitDeck(leftHalf, rightHalf);

        await riffleCards(leftHalf, rightHalf);

        await bridgeFinish();

        isShuffling = false;
    }

    const splitDeck = (leftHalf:Card[], rightHalf:Card[]) =>{
        return new Promise<void>(resolve=>{
            leftHalf.forEach((card, i)=>{
              card.html.style.transform = `translate(-120px, ${i * 0.5}px) rotate(-5deg)`;
            })

            rightHalf.forEach((card, i)=>{
              card.html.style.transform = `translate(120px, ${i * 0.5}px) rotate(5deg)`;
            })

            setTimeout(resolve,500);
        })
    }

    const riffleCards = (leftHalf:Card[], rightHalf:Card[]) =>{
        return new Promise<void>(resolve=>{
            let delay = 0;
            const shuffledPositions = [];

            // Interleave cards
            for(let i = 0; i < Math.max(leftHalf.length, rightHalf.length); i++){
              if(i < leftHalf.length){
                setTimeout(()=>{
                  const randomOffset = Math.random() * 3 - 1.5;
                  leftHalf[i].html.style.transform = `translate(${randomOffset}px, ${shuffledPositions.length * 0.5}px`;
                  shuffledPositions.push(leftHalf[i].html);
                },delay);
                delay += 50;
              }

              if(i < rightHalf.length){
                setTimeout(()=>{
                  const randomOffset = Math.random() * 3 - 1.5;
                  rightHalf[i].html.style.transform = `translate(${randomOffset}px, ${shuffledPositions.length * 0.5}px`;
                  shuffledPositions.push(rightHalf[i].html);
                },delay);
                delay += 50;
              }

            }

            setTimeout(resolve, delay + 500);
        });
    }

    const bridgeFinish = () =>{
        return new Promise<void>(resolve=>{
          DeckOfCards.getCards().forEach((card, i)=>{
            const progress = i / DeckOfCards.getCards().length;
            const archHeight = Math.sin(progress * Math.PI) * 30;

            card.html.style.transform = `
              translateY(${i*0.5 - archHeight}px)
              rotate(${(progress-0.5) * 2}deg)
            `
          });

          setTimeout(()=>{
            DeckOfCards.getCards().forEach((card, i)=>{
              card.html.style.transform = `translateX(${i*0.5}px)`;
            });

            resolve();
          }, 600);
        })
    }

    const dealCards = async() =>{
      console.log(isDealing);

      /*if(cards.length === 0){
        console.log('No cards to deal');
        return;
      }*/
      
      if(isDealing)return;
      isDealing = true;

      let cardIndex = 0;

      for(const sequence of dealingSequence){
        await dealSequenceToPositions(cardIndex, sequence.target, sequence.positions);
        cardIndex += sequence.positions.length;
      }

      isDealing = false;

    }

    const dealSequenceToPositions = (startIndex:number, target:string, positions:number[]) =>{
         return new Promise<void>(resolve=>{
           const targetArea = target === 'opponent' ? opponentArea : playerArea;
           let delay = 0;

           positions.forEach((position, index)=>{
               setTimeout(()=>{
                  const card = DeckOfCards.getCards()[startIndex + index].html as HTMLElement;
                  const slot =  targetArea?.children[position];
                  const slotRect = slot?.getBoundingClientRect()
                  const deckRect = deck?.getBoundingClientRect();

                  // Calculate position relative to the deck
                  const xOffset = slotRect!.left - deckRect!.left;
                  const yOffset = slotRect!.top - deckRect!.top;

                  //console.log('here');
                  console.log(card);
                  
                  card!.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                  // card.style.zIndex = (1000 + startIndex + index).toString();

                  if(index === positions.length - 1)resolve();

               },delay)

               delay+=300;
           })


         });
    }

    const handleClick = (e: Event) =>{
 
    }


   /* cards.forEach((card)=>{
      card.addEventListener('click', handleClick);
    })
*/
     createCards();

    // setTimeout(()=>{
    //   dealCards();
    // },2000)
    
    return () => {

   /* cards.forEach((card)=>{
      card.removeEventListener('click', handleClick);
    })*/
  }

  },[])

  return (
    <div className="min-h-screen bg-[url(./assets/background1.jpg)] bg-cover bg-center w-full flex flex-col justify-between" >
        <div id='opponentArea' className="borde container left-1/2 -translate-x-1/2 opponent-area borde flex gap-5 mx-auto w-full mt-20">
           <div className="card-slot" data-position="0" ></div>
           <div className="card-slot" data-position="1" ></div>
           <div className="card-slot" data-position="2" ></div>
           <div className="card-slot" data-position="3"></div>
           <div className="card-slot" data-position="4" ></div>

        </div>

        <div className=' flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 deck w-fit borde p-2' >
        
            
            {/* {[cardback, cardback, cardback, cardback].map((image, key)=>(
                <div className='card absolute left-0' key={key} >
                   <div className="card-inner">
                    <img src={image} alt="" className="object-contain" />
                   </div>
                </div>
                
            ))} */}

          
        </div>

        <div className='' >
        <div className=' h-[100px flex' id='player-1'>
        
        </div>
        <div className=' h-[100px] flex' id='player-2'>
        
        </div>
        </div>
        <div id='playerArea' className='container border left-1/2 -translate-x-1/2 bottom-10 player-area flex gap-5 mx-auto w-full mb-20'>
           <div className="card-slot" data-position="0" ></div>
           <div className="card-slot" data-position="1" ></div>
           <div className="card-slot" data-position="2" ></div>
           <div className="card-slot" data-position="3" ></div>
           <div className="card-slot" data-position="4"></div>
        </div>
        <div className='w-fit mx-auto flex gap-5 mb- hidde' >
          <button id='shuffle' className='bg-green-600 rounded p-1 hover:bg-green-700' >Shuffle</button>
          <button id='deal-cards' className='bg-green-600 rounded p-1 hover:bg-green-700' >Deal Cards</button>
          <button id = 'reset' className='bg-green-600 rounded p-1 hover:bg-green-700' >Reset</button>
        </div>
    </div>
  )
}

export default Play
