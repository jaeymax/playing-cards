import { useState } from "react";
import {
  Book,
  Play,
  HandMetal,
  Sword,
  Crown,
  Trophy,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";

const RulesPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "basic"
  );

  const rules = {
    basic: [
      {
        title: "Game Overview",
        content:
          "Spa is a traditional Ghanaian/African trick-taking card game without trumps. The goal is to win the final trick by playing the highest-ranked card of the leading suit.",
        icon: <Play className="w-6 h-6 text-blue-400" />,
      },
      {
        title: "Players",
        content:
          "Spar is usually played by 2, 3 or 4 players (or more with enough cards). Each player receives exactly 5 cards — no more, no less.",
        icon: <Users className="w-6 h-6 text-green-400" />,
      },
    ],
    cards: [
      {
        title: "Cards Used",
        content:
          "The game uses 35 cards from a standard international 52-card pack, the cards of each suit ranking from high to low: A, K, Q, J, 10, 9, 8, 7, 6, but the Ace of Spades is normally not used, so the highest card in that suit is the King. It can be played in either direction: clockwise or counter-clockwise.Cards ranked 5 and below are not used.",
        // icon: <Cards className="w-6 h-6 text-purple-400" />,
      },
      {
        title: "Dealing Rules",
        content:
          "The first dealer is chosen at random; thereafter the winner of each hand deals the next. The dealer shuffles and deals five cards to each player: a batch of three cards to each player, starting with the player to dealer's left if playing clockwise, and then a batch of two cards each, ending with the dealer.",
        icon: <HandMetal className="w-6 h-6 text-yellow-400" />,
      },
    ],
    gameplay: [
      {
        title: "Basic Rules",
        content:
          "The next player after the dealer plays first. The first card played sets the leading suit. All players in turn must play a card of the same suit if they can. If a player cannot follow suit, they may play any card. When all have played one card, the first trick is complete. Whoever played the highest card of the suit that the first player led is the winner of the trick. The winner of the previous trick plays any card from hand to begin the next trick. This continues until five tricks have been played.",
        icon: <Sword className="w-6 h-6 text-red-400" />,
      },
      {
        title: "Final Trick",
        content:
          "Only the final trick determines the winner. The winner of the hand becomes the dealer for the next hand, and therefore plays last to the first trick of the next hand.",
        icon: <Crown className="w-6 h-6 text-amber-400" />,
      },
      {
        title: "Scoring",
        content:
          "Whoever wins the fifth and last trick wins the hand and scores:  \n 3 points if the winning card is a 6.  2 points if the winning card is a 7. 1 point for any other card.",
        icon: <Trophy className="w-6 h-6 text-amber-400" />,
      },
    ],
    // advanced: [
    //   {
    //     title: "Match Play",
    //     content:
    //       "Set a target score (e.g., 20 points) before playing. The first player to reach or exceed the target wins the match. This creates longer, more strategic games.",
    //     icon: <Trophy className="w-6 h-6 text-indigo-400" />,
    //   },
    //   {
    //     title: "Strategy Tips",
    //     content:
    //       "Save your best cards for the final trick. Track what suits opponents lack — it helps in planning. Being the leader early doesn't matter if you lose the last trick.",
    //     icon: <Star className="w-6 h-6 text-orange-400" />,
    //   },
    // ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Spa Card Game Rules</h1>
            <p className="text-xl text-gray-300">
              Learn how to play Spa, a traditional Ghanaian trick-taking card
              game
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Quick Navigation */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {Object.entries(rules).map(([key]) => (
              <button
                key={key}
                onClick={() => setExpandedSection(key)}
                className={`flex-1 px-6 py-3 rounded-lg border ${
                  expandedSection === key
                    ? "bg-blue-500 border-blue-400 text-white"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-750"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Book className="w-5 h-5" />
                  <span className="font-medium capitalize">{key}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Rules Content */}
          <div className="space-y-6">
            {Object.entries(rules).map(([section, items]) => (
              <div
                key={section}
                className="bg-gray-800 rounded-xl border border-gray-700"
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-750"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section ? null : section
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Book className="w-6 h-6 text-blue-400" />
                    <span className="font-bold capitalize">
                      {section} Rules
                    </span>
                  </div>
                  {expandedSection === section ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>

                {expandedSection === section && (
                  <div className="px-6 pb-6 space-y-4">
                    {items.map((rule, index) => (
                      <div
                        key={index}
                        className="pt-4 border-t border-gray-700 first:border-0"
                      >
                        <div className="flex items-center mb-2">
                          {rule.icon}
                          <h3 className="font-medium text-blue-400 ml-2">
                            {rule.title}
                          </h3>
                        </div>
                        <p className="text-gray-300 ml-8">{rule.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Video Tutorial Section */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <h2 className="text-xl font-bold mb-4">Video Tutorials</h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden mb-4">
                <div className="flex items-center justify-center">
                  <Play className="w-12 h-12 text-gray-600" />
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Watch our comprehensive video tutorials to learn advanced
                strategies and gameplay mechanics
              </p>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium">
                Watch Tutorials
              </button>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <h2 className="text-xl font-bold mb-4">Ready to Play?</h2>
              <p className="text-gray-300 mb-6">
                Try out these rules in a practice match against AI without
                affecting your ranking
              </p>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium">
                Start Practice Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
