import { useState, useEffect } from "react";
import {
  //Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  // ExternalLink,
} from "lucide-react";
import NavBar from "@/components/NavBar";

const faqCategories = {
  general: {
    title: "General Questions",
    icon: "🎮",
    questions: [
      {
        q: "What is SparPlay?",
        a: "SparPlay is a strategic online card game where players compete in matches using custom-built decks. Players can participate in casual games, ranked matches, and tournaments.",
      },
      {
        q: "Is the game free to play?",
        a: "Yes! SparPlay is completely free to play. Players can earn cards through gameplay and complete daily quests for rewards.",
      },
    ],
  },
  gameplay: {
    title: "Gameplay",
    icon: "⚔️",
    questions: [
      {
        q: "How does the ranking system work?",
        a: "Players earn or lose rating points based on match outcomes. Rankings include Bronze, Silver, Gold, Platinum, Diamond, and Master tiers.",
      },
      {
        q: "How do I build a deck?",
        a: "Use the Deck Builder from your profile to create decks with 40-60 cards. You can include up to 3 copies of any card.",
      },
    ],
  },
  technical: {
    title: "Technical Support",
    icon: "🔧",
    questions: [
      {
        q: "What are the system requirements?",
        a: "The game runs in modern web browsers with 2GB RAM minimum and a stable internet connection.",
      },
      {
        q: "How do I report bugs?",
        a: "Use the 'Report Bug' feature in settings or contact support with detailed information about the issue.",
      },
    ],
  },
  account: {
    title: "Account & Security",
    icon: "🔒",
    questions: [
      {
        q: "How do I change my password?",
        a: "Go to Settings > Security to change your password. You'll need to verify your current password first.",
      },
      {
        q: "What happens if I lose my account?",
        a: "Contact support with your account details and email for account recovery assistance.",
      },
    ],
  },
};

const FAQ = () => {
  const [searchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] =
    useState<any>(faqCategories);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredQuestions(faqCategories);
      return;
    }

    const filtered: any = {};
    Object.entries(faqCategories).forEach(([category, data]) => {
      const matchingQuestions = data.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingQuestions.length > 0) {
        filtered[category] = {
          ...data,
          questions: matchingQuestions,
        };
      }
    });
    setFilteredQuestions(filtered);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps = {true} />
      {/* Header */}
      <div className="bg-gray800 border- border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            {/* <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full px-12 py-4 bg-gray-700 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {Object.entries(filteredQuestions).map(
            ([category, data]: [string, any]) => (
              <div
                key={category}
                className="bg-gray-800 rounded-xl border border-gray-700"
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-750"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === category ? null : category
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{data.icon}</span>
                    <span className="font-bold">{data.title}</span>
                  </div>
                  {expandedSection === category ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>

                {expandedSection === category && (
                  <div className="px-6 pb-6 space-y-4">
                    {data.questions.map((item: any, index: number) => (
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
            )
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Please contact our
              support team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:support@sparplay.com"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex items-center justify-center"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Contact Support
              </a>
              {/* <a
                href="/help"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center"
              >
                View Help Center
                <ExternalLink className="w-4 h-4 ml-2" />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
