import { baseUrl } from "@/config/api";
import shuffleSound from "@/sounds/riffle-card-shuffle-104313.mp3";
import playedCardSound from "@/sounds/sound4.mp3";

type SetGameCardsFunction = (cards: any[]) => void;
type SetShufflingFunction = (isShuffling: boolean) => void;

import dealCardSound from "@/sounds/sound2.mp3";

function playDealCardSound() {
  const audio = new Audio(dealCardSound);
  audio.play().catch((err) => {
    console.error("Failed to play sound:", err);
  });
}

export function playShuffleSound() {
  const audio = new Audio(shuffleSound);
  audio.play().catch((err) => {
    console.error("Failed to play sound:", err);
  });
}

export function playPlayedCardSound() {
  const audio = new Audio(playedCardSound);
  audio.play().catch((err) => {
    console.error("Failed to play sound:", err);
  });
}

interface CardRefs {
  playerHandRef: React.RefObject<HTMLDivElement>;
  opponentOneHandRef: React.RefObject<HTMLDivElement>;
  opponentTwoHandRef: React.RefObject<HTMLDivElement>;
  opponentThreeHandRef: React.RefObject<HTMLDivElement>;
  deckRef: React.RefObject<HTMLDivElement>;
}

export const shuffleCards = async (
  cardsToShuffle: any[],
  setGameCards: SetGameCardsFunction,
  setIsShuffling: SetShufflingFunction,
  isShuffling: boolean,
  isDealing: boolean
) => {
  if (isShuffling || isDealing) return; // Prevent multiple shuffles at once
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

const getTarget = (
  player_id: number,
  current_player_id: any,
  first_opponent_id: any,
  second_opponent_id: any,
  third_opponent_id: number
) => {
  if (player_id == current_player_id) return "player";
  else if (player_id == first_opponent_id) return "opponent1";
  else if (player_id == second_opponent_id) return "opponent2";
  else if (player_id == third_opponent_id) return "opponent3";
};

export const extractDealingSequence = (
  cards: any[],
  current_player_id: number,
  first_opponent_id: number,
  second_opponent_id: number,
  third_opponent_id: number
) => {
  console.log(
    current_player_id,
    first_opponent_id,
    second_opponent_id,
    third_opponent_id
  );

  const player_ids_and_card_hand_postions = cards
    .filter((card) => card.status == "in_hand")
    .map((card) => {
      return { player_id: card.player_id, hand_position: card.hand_position };
    });

  const sequence: any[] = [];
  //console.log('ids_and_cards', player_ids_and_card_hand_postions)

  let positions = [];
  let index = 0;

  while (index + 1 < player_ids_and_card_hand_postions.length) {
    const { player_id, hand_position } =
      player_ids_and_card_hand_postions[index];
    positions.push(hand_position);

    if (
      player_ids_and_card_hand_postions[index].player_id !=
      player_ids_and_card_hand_postions[index + 1].player_id
    ) {
      const target = getTarget(
        player_id,
        current_player_id,
        first_opponent_id,
        second_opponent_id,
        third_opponent_id
      );
      sequence.push({ target, positions });
      positions = [];
    }

    index++;
  }

  positions.push(player_ids_and_card_hand_postions[index].hand_position);
  const target = getTarget(
    player_ids_and_card_hand_postions[index].player_id,
    current_player_id,
    first_opponent_id,
    second_opponent_id,
    third_opponent_id
  );
  sequence.push({ target, positions });

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

        let xOffset = slotRect?.left - deckRect.left;
        let yOffset = slotRect?.top - deckRect.top;

        if (target == "player") {
          xOffset = slotRect?.left - deckRect.left;
          yOffset = slotRect?.top - deckRect.top;
        } else if (target == "opponent1") {
          xOffset = slotRect?.left - deckRect.left;
          yOffset = slotRect?.top - deckRect.top;
        } else if (target === "opponent2") {
          xOffset = slotRect?.left - deckRect.right;
          yOffset = slotRect?.bottom - deckRect.bottom;
        } else {
          xOffset = slotRect?.left - deckRect.right;
          yOffset = slotRect?.bottom - deckRect.bottom;
        }

        cardToMove.pos_x = xOffset;
        cardToMove.pos_y = yOffset;
        target == "opponent2"
          ? (cardToMove.rotation = 90)
          : target == "opponent3"
          ? (cardToMove.rotation = 90)
          : (cardToMove.rotation = 0);
        cardToMove.inSlot = true;
        cardToMove.slotPosition = { target, position };
        playDealCardSound(); // Play sound for each dealt card
        setGameCards(updatedCards);

        if (index === positions.length - 1) resolve();
      }, delay);

      delay += 300;
    });
  });
};

const moveDrawPileOffScreen = (
  cards: any[],
  setGameCards: (cards: any) => void
) => {
  const cardsInDrawPile = cards.filter(
    (card: any) => card.status === "in_drawpile"
  );
  cardsInDrawPile.forEach((card: any) => {
    setGameCards((prevCards: any) => {
      return prevCards.map((c: any) => {
        if (c.id === card.id) {
          return {
            ...c,
            pos_x: -1000,
            pos_y: 0,
            rotation: 0,
            inSlot: false,
            slotPosition: { target: "player", position: 0 },
          };
        }
        return c;
      });
    });
  });
};

export const dealCards = async (
  cards: any[],
  current_player_id: number,
  first_opponent_id: number,
  second_opponent_id: number,
  third_opponent_id: number,
  refs: CardRefs,
  setGameCards: (cards: any[]) => void,
  isDealing: boolean,
  isShuffling: boolean,
  setIsDealing: (dealing: boolean) => void
) => {
  if (isDealing || isShuffling) return;
  setIsDealing(true);

  let cardIndex = 0;

  for (const sequence of extractDealingSequence(
    cards,
    current_player_id,
    first_opponent_id,
    second_opponent_id,
    third_opponent_id
  )) {
    await dealSequenceToPositions(
      cardIndex,
      sequence.target,
      sequence.positions,
      cards,
      refs,
      setGameCards
    );
    cardIndex += sequence.positions.length;
  }

  setIsDealing(false);

  moveDrawPileOffScreen(cards, setGameCards);
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
    saveToken(body.token);
  } else {
    // handle errors (username/email taken)
  }
}

export const authHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};

export const getSlotByPosition = (
  position: number,
  ref: React.RefObject<HTMLDivElement> | null
) => {
  if (!ref?.current) return null;
  return ref.current.querySelector(`[data-position="${position}"]`);
};

export const playCardToSlot = (
  card: any,
  destSlot: Element | null,
  trick_number: number,
  deckRef: React.RefObject<HTMLDivElement>,
  setGameCards: (cb: (prevCards: any[]) => any[]) => void,
  opponent_number: number
) => {
  const slotRect = destSlot?.getBoundingClientRect();
  const deckRect = deckRef?.current?.getBoundingClientRect();
  let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
  let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);

  if (opponent_number == 0) {
    xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
    yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
  } else if (opponent_number == 1) {
    xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
    yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
  } else if (opponent_number == 2) {
    xOffset = (slotRect?.left || 0) - (deckRect?.right || 0);
    yOffset = (slotRect?.bottom || 0) - (deckRect?.bottom || 0);
  } else {
    xOffset = (slotRect?.left || 0) - (deckRect?.right || 0);
    yOffset = (slotRect?.bottom || 0) - (deckRect?.bottom || 0);
  }

  card.pos_x = xOffset;
  card.pos_y = yOffset;
  card.rotation = 0;
  card.inSlot = true;
  card.slotPosition = { target: "player", position: 0 };

  let rotation = 0;

  switch (opponent_number) {
    case 0:
      rotation = 0;
      break;
    case 1:
      rotation = 0;
      break;
    case 2:
      rotation = 90;
      break;
    case 3:
      rotation = 90;
      break;
  }

  setGameCards((prevCards) => {
    return prevCards.map((c) => {
      if (c.id === card.id) {
        return {
          ...c,
          pos_x: xOffset,
          status: "played",
          pos_y: yOffset,
          rotation: rotation,
          inSlot: true,
          z_index: trick_number,
          slotPosition: { target: "player", position: 0 },
        };
      }
      return c;
    });
  });
};

interface PlayedCardArgs {
  card_id: number;
  player_id: number;
  trick_number: number;
  gameCards: any[];
  game: any;
  me: any;
  firstOpponent: any;
  secondOpponent: any;
  thirdOpponent: any;
  deckRef: React.RefObject<HTMLDivElement>;
  playerPlayAreaRef: React.RefObject<HTMLDivElement>;
  opponentOnePlayAreaRef: React.RefObject<HTMLDivElement>;
  opponentTwoPlayAreaRef: React.RefObject<HTMLDivElement>;
  opponentThreePlayAreaRef: React.RefObject<HTMLDivElement>;
  setGameCards: (cb: (prevCards: any[]) => any[]) => void;
  playSound: () => void;
}

export const handlePlayedCard = ({
  card_id,
  player_id,
  trick_number,
  gameCards,
  game,
  me,
  firstOpponent,
  secondOpponent,
  thirdOpponent,
  deckRef,
  playerPlayAreaRef,
  opponentOnePlayAreaRef,
  opponentTwoPlayAreaRef,
  opponentThreePlayAreaRef,
  setGameCards,
  playSound,
}: PlayedCardArgs) => {
  const card = gameCards.find((card: any) => card.id === card_id);
  const player = game.players.find((player: any) => player.id === player_id);

  console.log(
    `${player.user.username} played ${card.card.rank} of ${card.card.suit}`
  );

  playSound();

  if (player_id === me?.id) {
    const destSlot = getSlotByPosition(trick_number - 1, playerPlayAreaRef);
    playCardToSlot(card, destSlot, trick_number, deckRef, setGameCards, 0);
  } else if (player_id === firstOpponent?.id) {
    const destSlot = getSlotByPosition(
      trick_number - 1,
      opponentOnePlayAreaRef
    );
    playCardToSlot(card, destSlot, trick_number, deckRef, setGameCards, 1);
  } else if (player_id === secondOpponent?.id) {
    const destSlot = getSlotByPosition(
      trick_number - 1,
      opponentTwoPlayAreaRef
    );
    playCardToSlot(card, destSlot, trick_number, deckRef, setGameCards, 2);
  } else if (player_id === thirdOpponent?.id) {
    const destSlot = getSlotByPosition(
      trick_number - 1,
      opponentThreePlayAreaRef
    );
    playCardToSlot(card, destSlot, trick_number, deckRef, setGameCards, 3);
  }
};

export const handleGameMessage = (
  message: string,
  setMessage: (message: string) => void
) => {
  console.log("Game message:", message);
  setMessage(message);
};

export const getPlayerIds = (players: any, currentUser: any) => {
  let firstOpponentId;
  let secondOpponentId;
  let thirdOpponentId;
  const meId = players.find(
    (player: any) => player.user?.id === currentUser?.id
  ).id;
  const opponents = players.filter(
    (player: any) => player.user?.id !== currentUser?.id
  );
  if (opponents.length > 0) firstOpponentId = opponents[0].id;
  if (opponents.length > 1) secondOpponentId = opponents[1].id;
  if (opponents.length > 2) thirdOpponentId = opponents[2].id;

  return { meId, firstOpponentId, secondOpponentId, thirdOpponentId };
};

export const reconcileCards = (
  cards: any,
  setGameCards: any,
  meId: any,
  firstOpponentId: any,
  secondOpponentId: any,
  thirdOpponentId: any,
  deckRef: any,
  playerHandRef: any,
  opponentOneHandRef: any,
  opponentTwoHandRef: any,
  opponentThreeHandRef:any,
  playerPlayAreaRef: any,
  opponentOnePlayAreaRef: any,
  opponentTwoPlayAreaRef:any,
  opponentThreePlayAreaRef:any
) => {
  console.log("reconciling game cards");

  const newCardsState = cards.map((card: any) => {
    if (card.status == "played") {
      const slot_position = card.trick_number - 1;
      if (card.player_id == meId) {
        const targetArea = playerPlayAreaRef.current;
        const slot = targetArea?.children[slot_position];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
        let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 0;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
          z_index: card.trick_number,
        };
      } else if (card.player_id == firstOpponentId) {
        const targetArea = opponentOnePlayAreaRef.current;
        const slot = targetArea?.children[5 - slot_position - 1];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
        let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 0;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
          z_index: card.trick_number,
        };
      }
      else if(card.player_id == secondOpponentId){
        const targetArea = opponentTwoPlayAreaRef.current;
        const slot = targetArea?.children[5 - slot_position - 1];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.right || 0);
        let yOffset = (slotRect?.bottom || 0) - (deckRect?.bottom || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 90;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
          z_index: card.trick_number,
        };
      }
      else if(card.player_id == thirdOpponentId){
        const targetArea = opponentThreePlayAreaRef.current;
        const slot = targetArea?.children[slot_position];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.right || 0);
        let yOffset = (slotRect?.bottom || 0) - (deckRect?.bottom || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 90;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
          z_index: card.trick_number,
        };
      }
    } else if (card.status == "in_hand") {
      const hand_position = card.hand_position;
      if (card.player_id == meId) {
        const targetArea = playerHandRef.current;
        const slot = targetArea?.children[hand_position];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
        let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 0;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
        };
      } else if (card.player_id == firstOpponentId) {
        const targetArea = opponentOneHandRef.current;
        const slot = targetArea?.children[hand_position];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
        let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 0;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
        };
      } else if (card.player_id == secondOpponentId) {
        const targetArea = opponentTwoHandRef.current;
        const slot = targetArea?.children[hand_position];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.right || 0);
        let yOffset = (slotRect?.bottom || 0) - (deckRect?.bottom || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 90;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
        };
      } else if (card.player_id == thirdOpponentId) {
        const targetArea = opponentThreeHandRef.current;
        const slot = targetArea?.children[hand_position];
        const slotRect = slot?.getBoundingClientRect();
        const deckRect = deckRef?.current?.getBoundingClientRect();
        let xOffset = (slotRect?.left || 0) - (deckRect?.right || 0);
        let yOffset = (slotRect?.bottom || 0) - (deckRect?.bottom || 0);
        card.x_pos = xOffset;
        card.y_pos = yOffset;
        card.rotation = 90;

        return {
          ...card,
          pos_x: xOffset,
          pos_y: yOffset,
        };
      }
    } else if (card.status == "in_drawpile") {
      return {
        ...card,
        pos_x: -1000,
      };
    } else if (card.status == "in_deck") {
      return card;
    }
  });

  setGameCards(newCardsState);
};
