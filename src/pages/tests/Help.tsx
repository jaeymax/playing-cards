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
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">How can we help you?</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full px-12 py-4 bg-gray-700 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-750 transition"
            >
              <div className="mb-3 text-blue-400">{link.icon}</div>
              <span className="font-medium">{link.title}</span>
            </a>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          {Object.entries(faqSections).map(([section, questions]) => (
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
                  {section === "basics" && (
                    <Book className="w-6 h-6 text-blue-400" />
                  )}
                  {section === "gameplay" && (
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                  )}
                  {section === "technical" && (
                    <AlertCircle className="w-6 h-6 text-blue-400" />
                  )}
                  <span className="font-bold capitalize">{section}</span>
                </div>
                {expandedSection === section ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedSection === section && (
                <div className="px-6 pb-6 space-y-4">
                  {questions.map((item, index) => (
                    <div
                      key={index}
                      className="pt-4 border-t border-gray-700 first:border-0"
                    >
                      <h3 className="font-medium text-blue-400 mb-2">
                        {item.q}
                      </h3>
                      <p className="text-gray-300">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-300 mb-6">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Submit a Ticket
              </button>
              <a
                href="https://discord.gg/nexuscards"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center"
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
