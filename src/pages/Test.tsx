import { useEffect, useState } from "react"
import Card from "@/components/Card";

const Test = () => {


  const [cards, setCards] = useState<Card[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleCards = async () => {
    if (isShuffling) return;

    setIsShuffling(true);

    const updatedCards = [...cards];

    // for (let i = updatedCards.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [updatedCards[i], updatedCards[j]] = [updatedCards[j], updatedCards[i]];
    // }

    for (let i = 0; i < updatedCards.length; i++) {
      updatedCards[i].transform = `translateY(${i}px)`;
    }

    const leftHalf = cards.slice(0, updatedCards.length / 2);
    const rightHalf = cards.slice(updatedCards.length / 2, updatedCards.length);

    await splitDeck(leftHalf, rightHalf);

    await riffleCards(leftHalf, rightHalf);

    await bridgeFinish();

    setCards(updatedCards);

    setIsShuffling(false);
  };

  const splitDeck = (leftHalf: Card[], rightHalf: Card[]) => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...cards];

      leftHalf.forEach((_, i) => {
        updatedCards[i].transform = `translate(-120px, ${
          i * 0.5
        }px) rotate(-5deg)`;
      });

      rightHalf.forEach((_, i) => {
        updatedCards[i + leftHalf.length].transform = `translate(120px, ${
          i * 0.5
        }px) rotate(5deg)`;
      });

      setCards(updatedCards);
      setTimeout(resolve, 500);
    });
  };

  const riffleCards = (leftHalf: Card[], rightHalf: Card[]) => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...cards];
      let delay = 0;
      const shuffledPositions: Card[] = [];

      for (let i = 0; i < Math.max(leftHalf.length, rightHalf.length); i++) {
        if (i < leftHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            updatedCards[i].transform = `translate(${randomOffset}px, ${
              shuffledPositions.length * 0.5
            }px)`;
            shuffledPositions.push(updatedCards[i]);
            setCards([...updatedCards]);
          }, delay);
          delay += 50;
        }

        if (i < rightHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            updatedCards[
              i + leftHalf.length
            ].transform = `translate(${randomOffset}px, ${
              shuffledPositions.length * 0.5
            }px)`;
            shuffledPositions.push(updatedCards[i + leftHalf.length]);
            setCards([...updatedCards]);
          }, delay);
          delay += 50;
        }
      }

      setTimeout(resolve, delay + 500);
    });
  };

  const bridgeFinish = () => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...cards];
      updatedCards.forEach((_, i) => {
        const progress = i / updatedCards.length;
        const archHeight = Math.sin(progress * Math.PI) * 30;

        updatedCards[i].transform = `translateY(${
          i * 0.5 - archHeight
        }px) rotate(${(progress - 0.5) * 2}deg)`;
      });

      setCards(updatedCards);

      setTimeout(() => {
        updatedCards.forEach((_, i) => {
          updatedCards[i].transform = `translateX(${i * 0.5}px)`;
        });
        setCards(updatedCards);
        resolve();
      }, 600);
    });
  };




   

  useEffect(() => {

    // This is a test component to check if the environment is working correctly
    console.log("Test component mounted");
    const getCards = async () => {
      const cards = await fetch('http://localhost:5000/api/cards');
        const data = await cards.json();
        setCards(data);
    };
    getCards();
  }, []);

  return (
    <div>
      
      <h1>Test Component</h1>
      <p>This component is working correctly.</p>
        <div className="flex gap-10 flex-wrap" >
            {cards.map((card, index) => (
                <div className="w-14 h-14" key={index}>
                    {/* <img className="w-full h-full object-contain" src={card.image_url} alt={``} /> */}
                   
                </div>
            ))}
        </div>

    </div>
  )
}

export default Test
