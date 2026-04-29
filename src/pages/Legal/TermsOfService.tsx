import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";

const TermsOfService: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: `Welcome to SparPlay. By accessing our service, you agree to these terms. Please read them carefully.`,
    },
    {
      id: "account",
      title: "Account Terms",
      content: `You must be 13 years or older to use this service. You are responsible for maintaining the security of your account and password.`,
    },
    {
      id: "gameplay",
      title: "Gameplay Rules",
      content: `Players must adhere to fair play principles. Cheating, exploitation of bugs, or any form of manipulation will result in account suspension.`,
    },
    {
      id: "purchases",
      title: "Purchases & Currency",
      content: `All purchases are final. Virtual currency and items have no real-world value and cannot be exchanged for real money.`,
    },
    {
      id: "conduct",
      title: "Code of Conduct",
      content: `Users must treat others with respect. Harassment, hate speech, or disruptive behavior will not be tolerated.`,
    },
    {
      id: "privacy",
      title: "Privacy & Data",
      content: `We collect and process data as outlined in our Privacy Policy. We use this data to improve your gaming experience.`,
    },
    {
      id: "termination",
      title: "Account Termination",
      content: `We reserve the right to suspend or terminate accounts that violate these terms or disrupt the gaming experience of others.`,
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
      <NavBar showSignUps ={true} />
      <div className="bg-gray800 border- border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white">Terms of Service</h1>
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
                        <p key={index}>{paragraph}</p>
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

export default TermsOfService;
