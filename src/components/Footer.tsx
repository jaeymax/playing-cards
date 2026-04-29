import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const footerLinks = [
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="borde border-gray-700 pt-0 text-center">
          <div className="text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} SparPlay. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
