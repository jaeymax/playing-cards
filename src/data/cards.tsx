interface Card {
    id: number;
    value: number;
    rank:string;
    suit: string;
    imageUrl:string; 
    transform: string;
    inSlot: boolean;
    slotPosition: null | { target: string; position: number };
}


export let playing_cards: Card[] = []

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['6','7','8','9','10','jack','queen','king'];

// suits.forEach((suit)=>{
//   ranks.forEach((rank)=>{
//     //cards.push(`${rank}_of_${suit}.png`)
//     const card = new Card({suit, rank, imageUrl:`/cards/${rank}_of_${suit}.png`})
//     cards.push(card);
//   })
// })

let cardId = 1

suits.forEach((suit)=>{
  ranks.forEach((rank)=>{
    //cards.push(`${rank}_of_${suit}.png`)
    let list = ['jack', 'queen', 'king']
    let val;

    if(list.includes(rank)){
       switch(rank){
         case 'jack':
          val = 11;
          break;
         case 'queen':
          val = 12;
          break;
         case 'king':
          val = 13;
          break;
       }
    }
    else{
       val = parseInt(rank);
    }

    const card = {
        id: cardId++,
        value: val,
        rank:rank,
        suit: suit,
        imageUrl:`/cards/${rank}-of-${suit}.jpg`,
        transform: `translate(${1}px, ${1}px)`,
        inSlot: false,
        slotPosition: null,
    }
    playing_cards.push(card);
  })
})






