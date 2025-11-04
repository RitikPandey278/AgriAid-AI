import { Sprout, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">AgriAid</span>
            </div>
            <p className="text-sm">
              Empowering farmers with technology for better crop health and disaster preparedness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/disease-detection" className="hover:text-green-400 transition-colors">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-green-400 transition-colors">
                  Weather Alerts
                </Link>
              </li>
              <li>
                <Link to="/suggestions" className="hover:text-green-400 transition-colors">
                  Expert Tips
                </Link>
              </li>
              <li>
                <Link to="/knowledge-base" className="hover:text-green-400 transition-colors">
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Farming Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Video Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-400" />
                support@agriaid.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400" />
                +91 1800-XXX-XXXX
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 AgriAid. All rights reserved. Built for farmers, by students.</p>
        </div>
      </div>
    </footer>
  );
}
