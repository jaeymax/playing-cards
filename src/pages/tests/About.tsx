import React from "react";
import {
  Github,
  Twitter,
  
  Mail,
  Heart,
  Award,
  Shield,
  Zap,
} from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Jane Smith",
      role: "Lead Developer",
      avatar: "/api/placeholder/128/128",
      github: "github.com/janesmith",
      twitter: "@janesmith",
    },
    {
      name: "Mike Johnson",
      role: "Game Designer",
      avatar: "/api/placeholder/128/128",
      github: "github.com/mikej",
      twitter: "@mikejgames",
    },
    {
      name: "Sarah Lee",
      role: "Art Director",
      avatar: "/api/placeholder/128/128",
      github: "github.com/sarahlee",
      twitter: "@sarahleeart",
    },
  ];

  const features = [
    {
      title: "Strategic Gameplay",
      description: "Master complex card mechanics and outthink your opponents",
      icon: <Shield className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "Competitive Ranking",
      description: "Climb the leaderboards and prove your skills",
      icon: <Award className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Regular Updates",
      description: "New cards and features added regularly",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Nexus Cards
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A next-generation digital card game bringing strategy and skill to
              the web3 gaming space.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Launched in 2024, Nexus Cards was born from a passion for
              strategic card games and modern web technology. Our mission is to
              create an engaging and competitive digital card game that brings
              players together from around the world.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl border border-blue-900/50 p-6 shadow-xl"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our dedicated team of developers, designers, and gaming
              enthusiasts working to create the best possible experience for our
              players.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl border border-blue-900/50 p-6 shadow-xl text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto ring-4 ring-blue-600/20"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-400 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={`https://${member.github}`}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/${member.twitter}`}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-800 rounded-xl border border-blue-900/50 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="https://discord.gg/nexuscards"
              className="flex flex-col items-center p-6 bg-gray-750 rounded-lg hover:bg-gray-700 transition"
            >
              {/* <Discord className="w-8 h-8 mb-2 text-purple-400" /> */}
              <span className="font-medium">Join Discord</span>
              <span className="text-sm text-gray-400">Community Chat</span>
            </a>

            <a
              href="mailto:support@nexuscards.com"
              className="flex flex-col items-center p-6 bg-gray-750 rounded-lg hover:bg-gray-700 transition"
            >
              <Mail className="w-8 h-8 mb-2 text-blue-400" />
              <span className="font-medium">Email Us</span>
              <span className="text-sm text-gray-400">
                support@nexuscards.com
              </span>
            </a>

            <a
              href="https://twitter.com/nexuscards"
              className="flex flex-col items-center p-6 bg-gray-750 rounded-lg hover:bg-gray-700 transition"
            >
              <Twitter className="w-8 h-8 mb-2 text-blue-400" />
              <span className="font-medium">Follow Us</span>
              <span className="text-sm text-gray-400">@nexuscards</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NEXUS CARDS
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">© 2024</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <a href="/terms" className="hover:text-white transition">
                Terms
              </a>
              <a href="/privacy" className="hover:text-white transition">
                Privacy
              </a>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            Made with <Heart className="w-4 h-4 inline-block text-red-400" /> by
            the Nexus Cards Team
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
