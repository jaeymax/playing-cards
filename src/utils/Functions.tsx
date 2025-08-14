import { baseUrl } from "@/config/api";
import { useAppContext } from "@/data/contexts/AppContext";

type SetGameCardsFunction = (cards: any[]) => void;
type SetShufflingFunction = (isShuffling: boolean) => void;

export const shuffleCards = async (
  cardsToShuffle: any[],
  setGameCards: SetGameCardsFunction,
  setIsShuffling: SetShufflingFunction
) => {
  setIsShuffling(true);

  try {
    const updatedCards = [...cardsToShuffle];

    for (let i = 0; i < updatedCards.length; i++) {
      updatedCards[i].pos_y = i;
    }

    const leftHalf = updatedCards.slice(0, updatedCards.length / 2);
    const rightHalf = updatedCards.slice(
      updatedCards.length / 2,
      updatedCards.length
    );

    await splitDeck(leftHalf, rightHalf, updatedCards, setGameCards);
    await riffleCards(leftHalf, rightHalf, updatedCards, setGameCards);
    await bridgeFinish(updatedCards, setGameCards);
  } catch (error) {
    console.error("Error shuffling cards:", error);
  } finally {
    setIsShuffling(false);
  }
};

export const splitDeck = (
  leftHalf: any[],
  rightHalf: any[],
  currentCards: any[],
  setGameCards: SetGameCardsFunction
) => {
  return new Promise<void>((resolve) => {
    const updatedCards = [...currentCards];

    leftHalf.forEach((_, i) => {
      updatedCards[i].pos_x = -120;
      updatedCards[i].pos_y = i * 0.5;
      updatedCards[i].rotation = -5;
    });

    rightHalf.forEach((_, i) => {
      updatedCards[i + leftHalf.length].pos_x = 120;
      updatedCards[i + leftHalf.length].pos_y = i * 0.5;
      updatedCards[i + leftHalf.length].rotation = 5;
    });

    setGameCards(updatedCards);
    setTimeout(resolve, 500);
  });
};

export const riffleCards = (
  leftHalf: any[],
  rightHalf: any[],
  currentCards: any[],
  setGameCards: SetGameCardsFunction
) => {
  return new Promise<void>((resolve) => {
    const updatedCards = [...currentCards]; // Use passed in cards instead of gameCards state
    let delay = 0;
    const shuffledPositions: any[] = [];

    for (let i = 0; i < Math.max(leftHalf.length, rightHalf.length); i++) {
      if (i < leftHalf.length) {
        setTimeout(() => {
          const randomOffset = Math.random() * 3 - 1.5;
          if (updatedCards[i]) {
            updatedCards[i].pos_x = randomOffset; // Fixed typo: pox_x -> pos_x
            updatedCards[i].pos_y = shuffledPositions.length * 0.5;
            shuffledPositions.push(updatedCards[i]);
          }
          setGameCards([...updatedCards]);
        }, delay);
        delay += 50;
      }

      if (i < rightHalf.length) {
        setTimeout(() => {
          const randomOffset = Math.random() * 3 - 1.5;
          const rightIndex = i + leftHalf.length;
          if (updatedCards[rightIndex]) {
            updatedCards[rightIndex].pos_x = randomOffset; // Fixed typo: pox_x -> pos_x
            updatedCards[rightIndex].pos_y = shuffledPositions.length * 0.5;
            shuffledPositions.push(updatedCards[rightIndex]);
          }
          setGameCards([...updatedCards]);
        }, delay);
        delay += 50;
      }
    }

    setTimeout(resolve, delay + 500);
  });
};

export const bridgeFinish = (
  currentCards: any[],
  setGameCards: SetGameCardsFunction
) => {
  return new Promise<void>((resolve) => {
    const updatedCards = [...currentCards];

    // First animation - arch formation
    updatedCards.forEach((card, i) => {
      const progress = i / updatedCards.length;
      const archHeight = Math.sin(progress * Math.PI) * 30;

      if (card) {
        card.pos_y = i * 0.5 - archHeight;
        card.rotation = (progress - 0.5) * 2;
      }
    });

    setGameCards([...updatedCards]);

    // Second animation - final deck position
    setTimeout(() => {
      updatedCards.forEach((card, i) => {
        if (card) {
          card.pos_x = i * 0.5; // Reduced spacing for tighter deck
          card.pos_y = i * 0.1; // Add slight vertical offset
          card.rotation = 0; // Reset rotation
        }
      });
      setGameCards([...updatedCards]);

      setTimeout(resolve, 300); // Give time for final animation
    }, 600);
  });
};

export const extractDealingSequence = (
  cards: any[],
  current_player_id: number
) => {
  const player_ids_and_card_hand_postions = cards
    .filter((card) => card.status == "in_hand")
    .map((card) => {
      return { player_id: card.player_id, hand_position: card.hand_position };
    });
  const opponents = ["opponent1", "opponent2", "opponent3"];
  let opponent_index = 0;
  const sequence: any[] = [];
  const player_id_map = new Map();
  let hand_positions = [];
  let target = "";
  for (let id_and_hand_position of player_ids_and_card_hand_postions) {
    const { player_id, hand_position } = id_and_hand_position;
    if (player_id_map.has(player_id)) {
      if (target == player_id_map.get(player_id)) {
        hand_positions.push(hand_position);
      } else {
        sequence.push({ target, positions: hand_positions });
        hand_positions = [];
        target = player_id_map.get(player_id);
        hand_positions.push(hand_position);
      }
    } else {
      sequence.push({ target, positions: hand_positions });
      hand_positions = [];
      target = "";
      if (player_id == current_player_id) {
        console.log("current_player_id", current_player_id);
        player_id_map.set(player_id, "player");
        target = player_id_map.get(player_id);
        hand_positions.push(hand_position);
      } else {
        player_id_map.set(player_id, opponents[opponent_index]);
        target = player_id_map.get(player_id);
        hand_positions.push(hand_position);
        opponent_index++;
      }
    }
  }
  sequence.push({ target, positions: hand_positions });
  sequence.shift();
  //console.log("player_id_map", player_id_map);
  console.log("sequence", sequence);
  return sequence;
};

export const dealSequenceToPositions = (
  startIndex: number,
  target: string,
  positions: number[],
  cardsToDeal: any[],
  refs: {
    playerHandRef: React.RefObject<HTMLDivElement>;
    opponentOneHandRef: React.RefObject<HTMLDivElement>;
    opponentTwoHandRef: React.RefObject<HTMLDivElement>;
    opponentThreeHandRef: React.RefObject<HTMLDivElement>;
    deckRef: React.RefObject<HTMLDivElement>;
  },
  setGameCards: SetGameCardsFunction
) => {
  return new Promise<void>((resolve) => {
    let targetArea = refs.playerHandRef.current;

    if (target == "opponent1") {
      targetArea = refs.opponentOneHandRef.current;
    } else if (target == "opponent2") {
      targetArea = refs.opponentTwoHandRef.current;
    } else if (target == "opponent3") {
      targetArea = refs.opponentThreeHandRef.current;
    } else if (target == "player") {
      targetArea = refs.playerHandRef.current;
    }

    let delay = 0;

    positions.forEach((position, index) => {
      setTimeout(() => {
        const updatedCards = [...cardsToDeal];
        const cardToMove = updatedCards[startIndex + index];
        if (!targetArea) return;
        const slot = targetArea?.children[position];
        const slotRect = slot?.getBoundingClientRect();
        if (!refs.deckRef.current) return;
        const deckRect = refs.deckRef.current.getBoundingClientRect();

        const xOffset = slotRect?.left - deckRect.left;
        const yOffset = slotRect?.top - deckRect.top;

        cardToMove.pos_x = xOffset;
        cardToMove.pos_y = yOffset;
        target == "opponent2"
          ? (cardToMove.rotation = 90)
          : target == "opponent3"
          ? (cardToMove.rotation = 90)
          : (cardToMove.rotation = 0);
        cardToMove.inSlot = true;
        cardToMove.slotPosition = { target, position };

        setGameCards(updatedCards);

        if (index === positions.length - 1) resolve();
      }, delay);

      delay += 300;
    });
  });
};

export const removeToken = () => {
  sessionStorage.removeItem("accessToken");
};

export const getToken = () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    console.error("No token found in sessionStorage");
    return null;
  }
  return token;
};

export const saveToken = (token: string) => {
  sessionStorage.setItem("accessToken", token);
};

export async function ensureGuest() {
  const token = getToken();

  if (token) return;

  const res = await fetch(`${baseUrl}/auth/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Failed to ensure guest status");
    return;
  }

  //const { updateUser } = useAppContext();
  const data = await res.json();
  saveToken(data.token);
  console.log(data.user);
  console.log("Guest token saved:", data.token);
  return data.user;
}

export async function upgradeGuest(
  username: string,
  email: string,
  password: string
) {
  const res = await fetch(`${baseUrl}/auth/upgrade`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ username, email, password }),
  });
  const body = await res.json();
  if (res.ok) {
    saveToken(body.token); // replace token
    // update UI to show registered state
  } else {
    // handle errors (username/email taken)
  }
}

export const authHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};
