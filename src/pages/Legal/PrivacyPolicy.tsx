import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    {
      id: "information-collection",
      title: "Information Collection",
      content: `We collect information that you provide directly to us, including:
        • Account information (username, email, password)
        • Profile information (avatar, display name)
        • Game statistics and play history
        • Communications with other players
        • Payment information when making purchases`,
    },
    {
      id: "data-usage",
      title: "How We Use Your Data",
      content: `Your information helps us:
        • Create and manage your gaming account
        • Match you with other players
        • Track game progress and statistics
        • Improve our services and game features
        • Send important updates about the game
        • Prevent cheating and ensure fair play`,
    },
    {
      id: "data-sharing",
      title: "Information Sharing",
      content: `We do not sell your personal information. We may share your information:
        • With other players (limited to username and game statistics)
        • With service providers who assist our operations
        • When required by law or to protect our rights
        • In connection with a business transaction (merger, acquisition)`,
    },
    {
      id: "data-security",
      title: "Data Security",
      content: `We implement appropriate security measures to protect your information:
        • Encryption of sensitive data
        • Regular security assessments
        • Access controls and authentication
        • Secure data storage practices`,
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      content: `We use cookies and similar technologies to:
        • Keep you logged in
        • Remember your preferences
        • Analyze game performance
        • Improve user experience
        You can control cookie settings through your browser.`,
    },
    {
      id: "childrens-privacy",
      title: "Children's Privacy",
      content: `Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.`,
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content: `You have the right to:
        • Access your personal data
        • Correct inaccurate data
        • Request deletion of your data
        • Export your data
        • Opt-out of marketing communications`,
    },
    {
      id: "updates",
      title: "Policy Updates",
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps = {true} />
      <div className="bg-gray800 border- border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
          <p className="text-gray-400 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-gray-800 rounded-lg border border-gray-700 p-4">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-600/10 text-blue-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="prose prose-invert max-w-none">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="mb-12">
                    <h2 className="text-xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="text-gray-300 space-y-4">
                      {section.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
