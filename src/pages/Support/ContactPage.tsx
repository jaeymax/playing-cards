import NavBar from "@/components/NavBar";
import React from "react";
import { Link } from "react-router-dom";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <NavBar showSignUps = {true} />
      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-6">
            Contact Support
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            For any questions, suggestions or issues, please contact us at{" "}
            <a
              href="mailto:support@sparplay.com"
              className="text-blue-400 hover:text-blue-300 underlin"
            >
              support@sparplay.com
            </a>
          </p>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mt-8">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="flex justify-center gap-6">
              <Link
                to="/faq"
                className="text-blue-400 hover:text-blue-300 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                FAQs
              </Link>
              <Link
                to="/rules"
                className="text-blue-400 hover:text-blue-300 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Game Rules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
