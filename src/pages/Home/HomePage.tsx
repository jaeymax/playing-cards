import React from "react";
import HeroSection from "./components/HeroSection";
import NavBar from "@/config/NavBar";
import ConnectionStatusIndicator from "@/components/ConnectionStatusIndicator";
import { useAppContext } from "@/data/contexts/AppContext";

const HomePage: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8 space-y-16">
        <HeroSection />

        <div className="max-w-4xl mx-auto space-y-16">
          {/* About Section */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              PlaySpa.com is a digital adaptation of the traditional Ghanaian
              card game "Spa". Our mission is to bring this beloved game to
              players worldwide while preserving its authentic rules and
              competitive spirit. We try very hard to make the game simple and
              easy to play, and hope you enjoy it as much as we do!
            </p>
          </section>

          {/* How to Play */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              How to Play
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">
                  Objective
                </h3>
                <p className="text-gray-300">
                  Win the final trick with the highest-ranked card of the
                  leading suit.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">Players</h3>
                <p className="text-gray-300">
                  2-4 players can participate, each receiving exactly 5 cards.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-400">Scoring</h3>
                <p className="text-gray-300">
                  Only the winner of the last trick scores points for the round.
                </p>
              </div>
            </div>
          </section>

          {/* Add Rules Section between How to Play and FAQ sections */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Game Rules
            </h2>
            <div className="max-w-3xl mx-auto text-left space-y-6 bg-gray-800/50 rounded-xl p-8">
              <p className="text-lg text-gray-200 text-center italic">
                A traditional African trick-taking game where the final trick
                determines the winner!
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Setup
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>A game for 2-4 players</li>
                    <li>Only cards ranked 6 and above are used (7-Ace)</li>
                    <li>Each player receives exactly 5 cards</li>
                    <li>The dealer shuffles and deals the cards</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Playing the Game
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>The dealer plays first</li>
                    <li>Players must follow the leading suit if possible</li>
                    <li>If unable to follow suit, any card may be played</li>
                    <li>Highest card of the leading suit wins the trick</li>
                    <li>Winner of each trick leads the next round</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Scoring
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Only the final trick matters for scoring</li>
                    <li>Regular cards: 1 point</li>
                    <li>Seven (7): 2 points</li>
                    <li>Six (6): 3 points (if included)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Winning
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>The winner of the final trick wins the round</li>
                    <li>Winner becomes the dealer for the next round</li>
                    <li>Play continues for as many rounds as desired</li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">
                    Pro Tips:
                  </h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Save your highest cards for the final trick</li>
                    <li>Keep track of which suits opponents cannot follow</li>
                    <li>
                      Early tricks don't affect scoring - focus on the last one!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="text-center space-y-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-8 text-left">
              <div className="space-y-6">
                {[
                  {
                    q: "Why won't you add rule-variations or other features?",
                    a: "We prioritize simplicity and an uncluttered interface. Our games have one set of rules, minimal controls, and no login requirements. While we appreciate suggestions, we maintain this simplicity to keep the game easily accessible.",
                  },
                  {
                    q: "Why can't I see my statistics on another computer?",
                    a: "For simplicity and privacy, we store statistics locally in your browser rather than requiring accounts. This means your stats won't transfer between different browsers or devices.",
                  },
                  {
                    q: "Does this site use cookies and/or track people?",
                    a: "Yes, we use cookies for game functionality (like saving scores) and analytics to improve our service. For details, please check our Privacy Policy.",
                  },
                  {
                    q: "Do the computer players cheat?",
                    a: "No. Cards are dealt randomly, and computer players make decisions based only on their hand and played cards - the same information available to human players.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-800 pb-6 last:border-none"
                  >
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
                <div className="bg-gray-800/50 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Have more questions?
                  </h3>
                  <p className="text-gray-300">
                    If your question wasn't covered here, feel free to{" "}
                    <a
                      href="mailto:support@playspa.com"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      contact our support team
                    </a>
                    . We're here to help!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <div className="flex justify-center gap-8">
              <a
                href="mailto:support@playspa.com"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                support@playspa.com
              </a>
              <a
                href="https://twitter.com/playspagame"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                @playspagame
              </a>
            </div>
          </section>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>© 2024 PlaySpa. All rights reserved.</p>
          </div>

          {user && <ConnectionStatusIndicator />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
