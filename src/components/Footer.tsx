import React from "react";
import { Link } from "react-router-dom";
// import { SlSocialInstagram } from "react-icons/sl";
// import { TiSocialFacebookCircular, TiSocialYoutube } from "react-icons/ti";

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "About",
      links: [
        { label: "About Us", href: "/about" },
        // { label: "Team", href: "/about#team" },
        // { label: "Careers", href: "/careers" },
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
        // { label: "Cookie Policy", href: "/cookies" },
      ],
    },
    // {
    //   title: "Social",
    //   links: [
    //     { label: "Twitter", href: "#", icon: "twitter" },
    //     { label: "Discord", href: "#", icon: "discord" },
    //     { label: "GitHub", href: "#", icon: "github" },
    //   ],
    // },
  ];

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-1 text-sm md:text-base">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0 text-xs md:text-sm">
            © {new Date().getFullYear()} SparPlay. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <button className="text-gray-400 hover:text-white text-xs md:text-sm">
              Dark Mode
            </button>
            <button className="text-gray-400 hover:text-white text-xs md:text-sm">
              Language
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
