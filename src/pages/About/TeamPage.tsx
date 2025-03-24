
import {  Github, Linkedin, Mail, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & Lead Developer",
    image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
    bio: "Full-stack developer with 8 years of game development experience. Passionate about creating engaging gaming experiences.",
    social: {
      twitter: "https://twitter.com/alexchen",
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      email: "alex@nexuscards.com",
    },
  },
  {
    name: "Sarah Johnson",
    role: "Game Designer",
    image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sarah",
    bio: "Former pro card game player turned designer. Specializes in game balance and player experience.",
    social: {
      twitter: "https://twitter.com/sarahj",
      linkedin: "https://linkedin.com/in/sarahj",
      email: "sarah@nexuscards.com",
    },
  },
  {
    name: "Mike Torres",
    role: "Art Director",
    image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Mike",
    bio: "Digital artist with a background in traditional card game illustration. Creates the visual identity of Nexus Cards.",
    social: {
      twitter: "https://twitter.com/miketorres",
      linkedin: "https://linkedin.com/in/miketorres",
      email: "mike@nexuscards.com",
    },
  },
  // Add more team members as needed
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Meet Our Team</h1>
            <p className="text-gray-400">
              The passionate individuals behind Nexus Cards, working together to
              create the best gaming experience for our community.
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full bg-gray-700"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-blue-400 mb-4">{member.role}</p>
              <p className="text-gray-400 mb-6">{member.bio}</p>

              {/* Social Links */}
              <div className="flex gap-4 mt-auto">
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
