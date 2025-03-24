import { useState } from "react";
import {
  HelpCircle,
  Search,
  Mail,
  MessageCircle,
  Book,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const faqSections = {
    basics: [
      {
        q: "What is Nexus Cards?",
        a: "Nexus Cards is a strategic online card game where players compete in matches using custom-built decks. Players can participate in casual games, ranked matches, and tournaments.",
      },
      {
        q: "How do I get started?",
        a: "Create an account, complete the tutorial to learn basic gameplay mechanics, and receive your starter deck. You can then play practice matches against AI or join casual games with other players.",
      },
      {
        q: "Is the game free to play?",
        a: "Yes! Nexus Cards is completely free to play. Players can earn cards through gameplay and complete daily quests for rewards.",
      },
    ],
    gameplay: [
      {
        q: "How does the ranking system work?",
        a: "Players earn or lose rating points based on match outcomes. The amount depends on the relative skill levels of the players. Higher ranks include Bronze, Silver, Gold, Platinum, Diamond, and Master.",
      },
      {
        q: "What are the different game modes?",
        a: "We offer Casual Play, Ranked Matches, Tournament Mode, and Practice vs AI. Each mode has its own matchmaking system and rewards.",
      },
      {
        q: "How do I build a deck?",
        a: "Access the Deck Builder from your profile, select cards from your collection, and follow the deck-building rules: 40-60 cards per deck, maximum 3 copies of any card, and must include element cards.",
      },
    ],
    technical: [
      {
        q: "What are the system requirements?",
        a: "Nexus Cards runs in modern web browsers (Chrome, Firefox, Safari, Edge). Minimum 2GB RAM, stable internet connection, and 1024x768 screen resolution recommended.",
      },
      {
        q: "I'm experiencing lag/connection issues",
        a: "Check your internet connection, clear browser cache, and ensure no background downloads. If issues persist, try our desktop client or contact support.",
      },
      {
        q: "How do I report a bug?",
        a: "Use the 'Report Bug' feature in settings or contact support with details including: what happened, steps to reproduce, and any error messages.",
      },
    ],
  };

  const quickLinks = [
    { title: "Game Rules", icon: <Book className="w-5 h-5" />, url: "/rules" },
    {
      title: "Card Database",
      icon: <Search className="w-5 h-5" />,
      url: "/cards",
    },
    {
      title: "Support Center",
      icon: <HelpCircle className="w-5 h-5" />,
      url: "/support",
    },
    {
      title: "Contact Us",
      icon: <Mail className="w-5 h-5" />,
      url: "/contact",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">How can we help you?</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full px-12 py-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-xl border border-blue-900/50 hover:bg-gray-750 transition"
            >
              <div className="mb-3 text-blue-400">{link.icon}</div>
              <span className="font-medium">{link.title}</span>
            </a>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="space-y-6">
            {/* Basics Section */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-750"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "basics" ? null : "basics"
                  )
                }
              >
                <div className="flex items-center">
                  <Book className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="font-bold">Game Basics</span>
                </div>
                {expandedSection === "basics" ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSection === "basics" && (
                <div className="px-6 pb-6 space-y-4">
                  {faqSections.basics.map((item, index) => (
                    <div key={index} className="pt-4">
                      <h3 className="font-medium text-blue-400 mb-2">
                        {item.q}
                      </h3>
                      <p className="text-gray-300">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Gameplay Section */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-750"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "gameplay" ? null : "gameplay"
                  )
                }
              >
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
                  <span className="font-bold">Gameplay</span>
                </div>
                {expandedSection === "gameplay" ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {expandedSection === "gameplay" && (
                <div className="px-6 pb-6 space-y-4">
                  {faqSections.gameplay.map((item, index) => (
                    <div key={index} className="pt-4">
                      <h3 className="font-medium text-blue-400 mb-2">
                        {item.q}
                      </h3>
                      <p className="text-gray-300">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Technical Support Section */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-750"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "technical" ? null : "technical"
                  )
                }
              >
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                  <span className="font-bold">Technical Support</span>
                </div>
                {expandedSection === "technical" ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {expandedSection === "technical" && (
                <div className="px-6 pb-6 space-y-4">
                  {faqSections.technical.map((item, index) => (
                    <div key={index} className="pt-4">
                      <h3 className="font-medium text-blue-400 mb-2">
                        {item.q}
                      </h3>
                      <p className="text-gray-300">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-gray-800 rounded-xl border border-blue-900/50 p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-300 mb-6">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/support/ticket"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Submit a Ticket
              </a>
              <a
                href="https://discord.gg/nexuscards"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition flex items-center justify-center"
              >
                Join Discord Community
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
