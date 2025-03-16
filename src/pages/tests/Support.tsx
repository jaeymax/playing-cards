import React, { useState } from "react";
import {
  MessageCircle,
  AlertCircle,
  Search,
  Clock,
  Mail,
  ChevronRight,
  ArrowRight,
  CornerDownRight,
  Flag,
} from "lucide-react";

const SupportPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const supportCategories = [
    { id: "account", name: "Account Issues", icon: "👤" },
    { id: "technical", name: "Technical Problems", icon: "🔧" },
    { id: "billing", name: "Billing & Payments", icon: "💳" },
    { id: "gameplay", name: "Gameplay Help", icon: "🎮" },
    { id: "bug", name: "Report a Bug", icon: "🐛" },
    { id: "other", name: "Other Issues", icon: "❓" },
  ];

  const activeTickets = [
    {
      id: "T-1234",
      subject: "Account Login Issue",
      status: "in-progress",
      lastUpdate: "2 hours ago",
      priority: "high",
    },
    {
      id: "T-1235",
      subject: "Payment Failed",
      status: "waiting",
      lastUpdate: "1 day ago",
      priority: "medium",
    },
  ];

  const commonIssues = [
    {
      title: "Can't login to my account",
      category: "account",
      views: 1520,
    },
    {
      title: "How to reset password",
      category: "account",
      views: 1243,
    },
    {
      title: "Game freezing during matches",
      category: "technical",
      views: 892,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Support Header */}
        <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help or type your question..."
                className="w-full px-12 py-4 bg-gray-700 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Categories & Common Issues */}
          <div className="lg:col-span-2 space-y-8">
            {/* Support Categories */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-xl border transition ${
                      selectedCategory === category.id
                        ? "bg-blue-600 border-blue-500"
                        : "bg-gray-750 border-gray-700 hover:bg-gray-700"
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-2 block">
                        {category.icon}
                      </span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Common Issues */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Common Issues</h2>
                <a
                  href="/help"
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="space-y-4">
                {commonIssues.map((issue, index) => (
                  <a
                    key={index}
                    href={`/help/article/${issue.category}/${index}`}
                    className="block p-4 bg-gray-750 rounded-lg border border-gray-700 hover:bg-gray-700 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <CornerDownRight className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium">{issue.title}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {issue.views} views
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Contact Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Live Chat Support
                </button>
                <button className="p-4 bg-purple-600 hover:bg-purple-500 rounded-lg transition flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Support
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Active Tickets & Status */}
          <div className="space-y-8">
            {/* Active Tickets */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Tickets</h2>
                <button className="text-blue-400 hover:text-blue-300 flex items-center">
                  New Ticket <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {activeTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 bg-gray-750 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm text-gray-400">
                          #{ticket.id}
                        </span>
                        <h3 className="font-medium">{ticket.subject}</h3>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          ticket.priority === "high"
                            ? "bg-red-500/20 text-red-400 border border-red-500/50"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={`flex items-center ${
                          ticket.status === "in-progress"
                            ? "text-green-400"
                            : "text-gray-400"
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {ticket.status}
                      </span>
                      <span className="text-gray-400">{ticket.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Game Servers</span>
                  <span className="flex items-center text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Matchmaking</span>
                  <span className="flex items-center text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg">
                  <span className="text-gray-300">Payment System</span>
                  <span className="flex items-center text-yellow-400">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                    Minor Issues
                  </span>
                </div>
              </div>
              <a
                href="/status"
                className="block mt-4 text-center text-blue-400 hover:text-blue-300"
              >
                View Detailed Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
