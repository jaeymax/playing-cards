I'm working on creating an online multiplayer card game called spa. where users can play with friends.
below are the details of the game and how it is played


Detailed Explanation of Spar (Spa)
Spar, also called Don, is one of the most popular card games in Ghana. It’s a strategic and competitive game that requires a mix of skill, observation, and a little luck. Here’s a detailed breakdown of the game, its rules, and how it is typically played:

Objective of the Game
The main goal in Spar is to win rounds (known as "tricks") by playing the highest-ranking card in a particular suit during a turn. Ultimately, players aim to score the highest points by strategically managing their cards.

Setup
Number of Players:
Typically, 2 to 4 players, though it can accommodate more with adjustments to rules.
Deck:
A standard 52-card deck is used.
Dealing:
The dealer shuffles the deck and deals 5 cards to each player if there are 4 players.
In smaller groups (e.g., 2 players), the dealer may give 7 cards each.
The rest of the deck is placed face down in the center to serve as the draw pile.

Gameplay
Starting the Game:

1. The first player is usually chosen randomly or by mutual agreement. In subsequent rounds, the winner of the previous round often starts.
   The first player plays any card, which sets the lead suit for that round.
   Playing Turns:

2. Players take turns playing a card, following the lead suit (the suit of the first card played in that round) if they can.
   If a player does not have a card of the lead suit, they can play a card of any other suit.
   Winning a Round (Trick):

3. The round is won by the player who plays the highest card in the lead suit.
   If a card of the lead suit is not played, cards of other suits are ignored for ranking purposes in that round.

4. Trump Suit (Optional Rule):

Before the game starts, players may agree to designate a trump suit (e.g., hearts, spades, etc.).
A card of the trump suit automatically beats cards of any other suit, regardless of their rank.
Scoring:

Each trick (round) won earns the winner 1 point.
The game continues until all the cards in the players' hands are played.
The player with the most tricks won is declared the winner of the game.

Special Rules
Cutting (Blocking):

If a player suspects they will lose the round, they may strategically play a card to "block" another player from winning the trick.
For instance, a player may play a high card of a different suit to force another player to use their stronger cards early.
Drawing from the Pile:

If players agree to extend the game or introduce flexibility, players may draw a card from the draw pile when they cannot play.
Double Spar:

In some versions of Spar, players can form teams, where teammates collaborate to block the opposing team from scoring points.

Strategy
Memory and Observation: Keep track of cards that have already been played, especially high-value cards, to predict your opponents' possible moves.
Bluffing: Use misleading moves to throw off other players, especially when you have a weak hand.
Timing: Save your highest cards for critical moments to ensure you win a trick.


NB: 
1. Now not that in our implementation we won't be using a 52 deck but rather a 32 the reason being that we typically don't use the cards 1 - 5 of all suits. and we also don't use the Aces. For now we won't be having any trump suit for simplicity. 

2. And in this particular variation points are not awarded until the end of the game. only the last card (round) counts as a score. the one with the leading suit at the last round wins. each win point is only awarded a score of one. but if the last card played is a 6, then the score awarded is 3 and 2 if the last card is a 7. 

3. if the last two cards are a 6 and a 7 or a 6 and 6 or a 7 and 7 the mark score awarded is (3+2), (3+3), (2+2) respectively. but if the last two cards are of the same suit, only the score of the last card is counted. e.g if the last two cards are 7Club and 6Club then 
the score awared is 3 because only the last card 6C counts. 

4. all other winning combinations are awarded a score of one. 