
import Card from "./Card";

type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
type Rank = '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king' ;


class Deck {
    private cards: Card[] = [];

    constructor() {
        this.initializeDeck();
        this.shuffle();
        assert(this.cards.length === 32, 'Deck should have 32 cards');
    }
    
    private initializeDeck() {
        const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks: Rank[] = ['6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        
        for (const suit of suits) {
            for (const rank of ranks) {
                const card = new Card({ suit, rank,imageUrl:`/cards/${rank}-of-${suit}.jpg` });
                this.cards.push(card);
            }
        }
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public drawCard(): Card | undefined {
        return this.cards.pop();
    }

    public getRemainingCards(): number {
        return this.cards.length;
    }
}

export default Deck;

function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}
