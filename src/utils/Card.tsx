interface CardProps {
    suit: string;
    rank: string;
    imageUrl:string;
}

class Card {
    suit: string;
    rank: string;
    imageUrl:string;
    html: HTMLElement;

    constructor({ suit, rank, imageUrl }: CardProps) {
        this.suit = suit;
        this.rank = rank;
        this.imageUrl = imageUrl;
        this.html = this.getHtml();
    }

    getCardName(): string {
        return `${this.rank}-of-${this.suit}`;
    }

    getHtml(): HTMLElement {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.id = this.getCardName();

        const cardInner  = document.createElement('div');
        cardInner.className = "card-inner"

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front'
        const cardFrontImage = document.createElement('img');
        cardFrontImage.className = 'card-img';
        cardFrontImage.src = this.imageUrl;
        cardFront.appendChild(cardFrontImage);


        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const cardBackImage = document.createElement('img');
        cardBackImage.className = 'card-img'
        cardBackImage.src = '/card_back_blue.jpeg'
        cardBack.appendChild(cardBackImage);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        /*const img = document.createElement('img');
        img.src = this.imageUrl;
        img.alt = '';
        img.className = 'card-img';*/

        cardDiv.appendChild(cardInner);

        return cardDiv;
    }
}

export default Card;