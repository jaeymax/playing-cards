import Deck from "./Deck";
import Card from "./Card";

export async function shuffleCards(isShuffling:boolean, DeckOfCards:Deck) {
    if (isShuffling) return;
    isShuffling = true;
    DeckOfCards.shuffle();

    for (let i = 0; i < DeckOfCards.getCards().length; i++) {
      const card = DeckOfCards.getCards()[i];
      const cardHtml = card.html;
      cardHtml.style.transform = `translateY(${i}px)`;
    }

    const leftHalf = DeckOfCards.getCards().slice(
      0,
      DeckOfCards.getCards().length / 2
    );
    const rightHalf = DeckOfCards.getCards().slice(
      DeckOfCards.getCards().length / 2,
      DeckOfCards.getCards().length
    );

    await splitDeck(leftHalf, rightHalf);

    await riffleCards(leftHalf, rightHalf);

    await bridgeFinish(DeckOfCards);

    isShuffling = false;
  }


  const splitDeck = (leftHalf: Card[], rightHalf: Card[]) => {
    return new Promise<void>((resolve) => {
      leftHalf.forEach((card, i) => {
        card.html.style.transform = `translate(-120px, ${
          i * 0.5
        }px) rotate(-5deg)`;
      });

      rightHalf.forEach((card, i) => {
        card.html.style.transform = `translate(120px, ${
          i * 0.5
        }px) rotate(5deg)`;
      });

      setTimeout(resolve, 500);
    });
  };



  const riffleCards = (leftHalf: Card[], rightHalf: Card[]) => {
    return new Promise<void>((resolve) => {
      let delay = 0;
      const shuffledPositions = [];

      // Interleave cards
      for (let i = 0; i < Math.max(leftHalf.length, rightHalf.length); i++) {
        if (i < leftHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            leftHalf[
              i
            ].html.style.transform = `translate(${randomOffset}px, ${
              shuffledPositions.length * 0.5
            }px`;
            shuffledPositions.push(leftHalf[i].html);
          }, delay);
          delay += 50;
        }

        if (i < rightHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            rightHalf[
              i
            ].html.style.transform = `translate(${randomOffset}px, ${
              shuffledPositions.length * 0.5
            }px`;
            shuffledPositions.push(rightHalf[i].html);
          }, delay);
          delay += 50;
        }
      }

      setTimeout(resolve, delay + 500);
    });
  };


  const bridgeFinish = (DeckOfCards:Deck) => {
    return new Promise<void>((resolve) => {
      DeckOfCards.getCards().forEach((card, i) => {
        const progress = i / DeckOfCards.getCards().length;
        const archHeight = Math.sin(progress * Math.PI) * 30;

        card.html.style.transform = `
            translateY(${i * 0.5 - archHeight}px)
            rotate(${(progress - 0.5) * 2}deg)
          `;
      });

      setTimeout(() => {
        DeckOfCards.getCards().forEach((card, i) => {
          card.html.style.transform = `translateX(${i * 0.5}px)`;
        });

        resolve();
      }, 600);
    });
  };

 /* const dealCards = async (isDealing:boolean) => {
    console.log(isDealing);

    const dealingSequence = [
        { target: "opponent", positions: [0, 1, 2] },
        { target: "player", positions: [0, 1, 2] },
        { target: "opponent", positions: [3, 4] },
        { target: "player", positions: [3, 4] },
      ];

    if (isDealing) return;
    isDealing = true;

    let cardIndex = 0;

    for (const sequence of dealingSequence) {
      await dealSequenceToPositions(
        cardIndex,
        sequence.target,
        sequence.positions
      );
      cardIndex += sequence.positions.length;
    }

    isDealing = false;
  };

  const dealSequenceToPositions = (
    startIndex: number,
    target: string,
    positions: number[],
    DeckOfCards:Deck,
    opponentArea:HTMLElement,
    playerArea:HTMLElement,
    deck:Element,
  ) => {
    return new Promise<void>((resolve) => {
      const targetArea = target === "opponent" ? opponentArea : playerArea;
      let delay = 0;

      positions.forEach((position, index) => {
        setTimeout(() => {
          const card = DeckOfCards.getCards()[startIndex + index]
            .html as HTMLElement;
          const slot = targetArea?.children[position];
          const slotRect = slot?.getBoundingClientRect();
          const deckRect = deck?.getBoundingClientRect();

          // Calculate position relative to the deck
          const xOffset = slotRect!.left - deckRect!.left;
          const yOffset = slotRect!.top - deckRect!.top;

          //console.log('here');
          console.log(card);

          card!.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
          // card.style.zIndex = (1000 + startIndex + index).toString();

          if (index === positions.length - 1) resolve();
        }, delay);

        delay += 300;
      });
    });
  };*/