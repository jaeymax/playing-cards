import { useEffect } from "react";
import Deck from "@/utils/Deck";
import Card from "@/utils/Card";
import { shuffleCards } from "@/utils/Functions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Play = () => {
  const DeckOfCards = new Deck();

  console.log(DeckOfCards.getCards());

  useEffect(() => {
    const playerArea = document.getElementById("playerArea");
    const opponentArea = document.getElementById("opponentArea");
    const deck = document.querySelector(".deck");
    const numCards = 32;

    let isDealing = false;
    let isShuffling = false;
    const resetButton = document.getElementById("reset");
    const dealCardsButton = document.getElementById("deal-cards");
    const shuffleButton = document.getElementById("shuffle");

    resetButton?.addEventListener("click", () => {
      createCards();
    });

    dealCardsButton?.addEventListener("click", () => {
      dealCards();
    });

    shuffleButton?.addEventListener("click", () => {
      shuffleCards(isShuffling, DeckOfCards);
    });

    if (deck) {
      (deck as HTMLElement).style.display = "non";
    }

    //const cards = document.querySelectorAll('.card');

    const createCards = () => {
      //cards = []
      deck!.innerHTML = "";
      DeckOfCards.shuffle();

      //cards.forEach(card=>card.remove());

      for (let i = 0; i < numCards; i++) {
        const card = DeckOfCards.getCards()[i];
        const cardHtml = card.html;
        cardHtml.style.transform = `translate(-${i * 0.1}px, ${i * 0.1}px)`;
        cardHtml.style.zIndex = (1000 + i).toString();

        deck?.appendChild(cardHtml);
      }
    };

    //console.log(cards);

    const dealingSequence = [
      { target: "opponent", positions: [0, 1, 2] },
      { target: "player", positions: [0, 1, 2] },
      { target: "opponent", positions: [3, 4] },
      { target: "player", positions: [3, 4] },
    ];

    const dealCards = async () => {
      console.log(isDealing);

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
      positions: number[]
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
            //console.log(card);

            card!.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            card.style.zIndex = (1000 + startIndex + index).toString();

            if (index === positions.length - 1) resolve();
          }, delay);

          delay += 300;
        });
      });
    };

    /* cards.forEach((card)=>{
      card.addEventListener('click', handleClick);
    })
*/
    createCards();

    return () => {
      /* cards.forEach((card)=>{
      card.removeEventListener('click', handleClick);
    })*/
    };
  }, []);

  return (
    <div className="min-h-screen b-green-800 bg-[url(./assets/background1.jpg)] bg-cover  gap-4 bg-center w-full flex flex-col justify-betwee">
      <div className="player-info borde mt-5 w-fit mx-auto flex flex-col items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?semt=ais_hybrid" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="font-medium">Witty</div>
          <div className="text-sm">4 cards</div>
          <div className="text-sm font-semibold">3 pts</div>
        </div>
      </div>
      <div
        id="opponentArea"
        className="borde container opponent-area borde flex gap- mx-auto w-full mtx-20"
      >
        <div className="card-slot" data-position="0"></div>
        <div className="card-slot -ml-7" data-position="1"></div>
        <div className="card-slot -ml-7" data-position="2"></div>
        <div className="card-slot -ml-7" data-position="3"></div>
        <div className="card-slot -ml-7" data-position="4"></div>
      </div>

      <div className="flex-1 borde relative flex items-center justify-center">
        {/* <div className=" h-[100px flex" id="player-1"></div>
        <div className=" h-[100px] flex" id="player-2"></div> */}
        <div className="borde flex flex-col items-center borde">
          <div className="flex zo-50 deck   p-2 relative borde w-[50px] border-red-600 h-[80px]"></div>
          <div className="flex gap-2 mt-5">
            <button
              id="deal-cards"
              className="border border-gray-800 bg-gray-50 text-black py-2 px-4 rounded"
            >
              Deal
            </button>
            <button
              id="shuffle"
              className="border border-gray-800 bg-gray-50 text-black py-2 px-4 rounded"
            >
              Shuffle
            </button>
          </div>
        </div>
      </div>
      <div className="bg-yellow-200 text-black mx-auto max-w-md w-full w- p-4 rounded-md text-xs">
        Your turn! Click to play
      </div>
      <div
        id="playerArea"
        className="container player-area flex gap-5 mx-auto w-full mbx-20"
      >
        <div className="card-slot" data-position="0"></div>
        <div className="card-slot -ml-7" data-position="1"></div>
        <div className="card-slot -ml-7" data-position="2"></div>
        <div className="card-slot -ml-7" data-position="3"></div>
        <div className="card-slot -ml-7" data-position="4"></div>
      </div>
      <div className="player-info borde mb-5 w-fit mx-auto flex flex-col items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="font-medium">Jaey</div>
          <div className="text-sm">4 cards</div>
          <div className="text-sm font-semibold">5 pts</div>
        </div>
      </div>
      {/* <div className="w-fit mx-auto flex gap-5 mb- hidde">
        <button
          id="shuffle"
          className="bg-green-600 rounded p-1 hover:bg-green-700"
        >
          Shuffle
        </button>
        <button
          id="deal-cards"
          className="bg-green-600 rounded p-1 hover:bg-green-700"
        >
          Deal Cards
        </button>
        <button
          id="reset"
          className="bg-green-600 rounded p-1 hover:bg-green-700"
        >
          Reset
        </button>
      </div> */}
    </div>
  );
};

export default Play;
