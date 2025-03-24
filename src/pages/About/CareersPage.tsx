
import {
  Briefcase,
  Clock,
  Globe,
  Heart,
  Zap,
} from "lucide-react";

const openPositions = [
  {
    id: 1,
    title: "Senior Game Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Looking for an experienced game developer to help build and scale our card game platform.",
    requirements: [
      "5+ years of game development experience",
      "Strong TypeScript and React knowledge",
      "Experience with multiplayer game architecture",
      "Understanding of game balance and mechanics",
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Create engaging and intuitive user experiences for our gaming platform.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Strong portfolio of gaming interfaces",
      "Proficiency in Figma and design systems",
      "Experience with animation and motion design",
    ],
  },
  {
    id: 3,
    title: "Community Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and nurture our growing player community across various platforms.",
    requirements: [
      "3+ years community management experience",
      "Experience in gaming industry",
      "Excellent communication skills",
      "Knowledge of community tools and platforms",
    ],
  },
];

const benefits = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Remote-First",
    description: "Work from anywhere in the world with our distributed team",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Hours",
    description: "Choose your working hours to maintain work-life balance",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Health Coverage",
    description: "Comprehensive health, dental, and vision insurance",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Learning Budget",
    description: "Annual budget for courses, books, and conferences",
  },
];

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-400">
              Help us build the future of digital card gaming. We're looking for
              passionate individuals who want to make an impact in the gaming
              industry.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1M+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">32</div>
              <div className="text-gray-400">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">15</div>
              <div className="text-gray-400">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
          <div className="grid grid-cols-1 gap-6">
            {openPositions.map((position) => (
              <div
                key={position.id}
                className="bg-gray-800 rounded-xl border border-gray-700 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <span className="inline-flex items-center text-sm text-gray-400">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-400">
                        <Globe className="w-4 h-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{position.description}</p>
                <div className="space-y-2">
                  {position.requirements.map((req, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2"></div>
                      <span className="text-gray-400">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Why Join Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
