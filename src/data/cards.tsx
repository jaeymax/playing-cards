import Card from "@/utils/Card";

export let cards: Card[] = []

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['6','7','8','9','10','jack','queen','king'];

suits.forEach((suit)=>{
  ranks.forEach((rank)=>{
    //cards.push(`${rank}_of_${suit}.png`)
    const card = new Card({suit, rank, imageUrl:`/cards/${rank}_of_${suit}.png`})
    cards.push(card);
  })
})











