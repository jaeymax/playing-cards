import { useState } from "react";
import {
  Book,
  Play,
  HandMetal,
  Star,
  Sword,
  Shield,
  Crown,
  Trophy,
  ChevronDown,
  ChevronUp,
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
          "Nexus Cards is a strategic card game where players battle using custom-built decks. Each player starts with 20 life points and aims to reduce their opponent's life points to zero.",
        icon: <Play className="w-6 h-6 text-blue-400" />,
      },
      {
        title: "Turn Structure",
        content:
          "Each turn consists of three phases: Draw Phase (draw a card), Main Phase (play cards and attack), and End Phase (resolve end-of-turn effects).",
        icon: <HandMetal className="w-6 h-6 text-green-400" />,
      },
    ],
    cards: [
      {
        title: "Card Types",
        content:
          "There are three main card types: Unit Cards (creatures that battle), Spell Cards (one-time effects), and Enhancement Cards (ongoing effects).",
        icon: <Star className="w-6 h-6 text-purple-400" />,
      },
      {
        title: "Card Stats",
        content:
          "Unit cards have Attack Power (damage dealt) and Defense Points (health). Some cards also have special abilities that trigger under certain conditions.",
        icon: <Shield className="w-6 h-6 text-yellow-400" />,
      },
    ],
    combat: [
      {
        title: "Combat Rules",
        content:
          "Units can attack once per turn. When attacking, compare the attacker's Attack Power with the defender's Defense Points. The difference is dealt as damage.",
        icon: <Sword className="w-6 h-6 text-red-400" />,
      },
      {
        title: "Special Abilities",
        content:
          "Many units have special abilities like 'First Strike' (attacks first) or 'Guard' (must be attacked first). These abilities can significantly impact combat.",
        icon: <Crown className="w-6 h-6 text-amber-400" />,
      },
    ],
    advanced: [
      {
        title: "Deck Building",
        content:
          "Decks must contain 40-60 cards. You can include up to 3 copies of any card, except for Legendary cards which are limited to 1 copy per deck.",
        icon: <Trophy className="w-6 h-6 text-indigo-400" />,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Game Rules</h1>
            <p className="text-xl text-gray-300">
              Learn how to play Nexus Cards and master the game mechanics
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Object.entries(rules).map(([key]) => (
              <button
                key={key}
                onClick={() => setExpandedSection(key)}
                className={`p-4 rounded-xl border transition ${
                  expandedSection === key
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-750"
                }`}
              >
                <div className="text-center">
                  <Book className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium capitalize">{key} Rules</span>
                </div>
              </button>
            ))}
          </div>

          {/* Rules Content */}
          <div className="space-y-6">
            {Object.entries(rules).map(([section, items]) => (
              <div
                key={section}
                className="bg-gray-800 rounded-xl border border-blue-900/50 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-750"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section ? null : section
                    )
                  }
                >
                  <div className="flex items-center">
                    <Book className="w-5 h-5 mr-2 text-blue-400" />
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
                  <div className="px-6 pb-6">
                    {items.map((rule, index) => (
                      <div key={index} className="mt-6 first:mt-4">
                        <div className="flex items-center mb-3">
                          {rule.icon}
                          <h3 className="text-lg font-semibold ml-2">
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
          <div className="mt-12 bg-gray-800 rounded-xl border border-blue-900/50 p-6">
            <h2 className="text-xl font-bold mb-4">Video Tutorials</h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-750 rounded-lg overflow-hidden">
              <div className="flex items-center justify-center">
                <Play className="w-12 h-12 text-gray-600" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-400">
                Watch our comprehensive video tutorials to learn advanced
                strategies and gameplay mechanics
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition">
                Watch Tutorials
              </button>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 p-6">
              <h3 className="font-bold mb-2">Practice Mode</h3>
              <p className="text-gray-300 mb-4">
                Try out these rules in a practice match against AI without
                affecting your ranking
              </p>
              <button className="w-full py-2 bg-green-600 hover:bg-green-500 rounded-lg transition">
                Start Practice Game
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-blue-900/50 p-6">
              <h3 className="font-bold mb-2">Card Database</h3>
              <p className="text-gray-300 mb-4">
                Browse our complete card database to learn about all available
                cards and their effects
              </p>
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                View Card Database
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
