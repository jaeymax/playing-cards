import React from "react";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebookCircular, TiSocialYoutube } from "react-icons/ti";

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "About",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Team", href: "/about#team" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
        { label: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Twitter", href: "#", icon: "twitter" },
        { label: "Discord", href: "#", icon: "discord" },
        { label: "GitHub", href: "#", icon: "github" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Nexus Cards. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <button className="text-gray-400 hover:text-white">
              Dark Mode
            </button>
            <button className="text-gray-400 hover:text-white">Language</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
