import React from 'react';
import { Github, FileText, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">TerraScan</h3>
            <p className="text-sm">
              An advanced landslide detection system using digital image processing techniques 
              to analyze satellite and drone imagery for early warning and disaster prevention.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-400 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About the Project</h3>
            <p className="text-sm">
              This project aims to develop an automated landslide detection system 
              using image processing techniques to identify landslide-prone areas 
              and provide early warnings, improving disaster response and mitigation efforts.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} TerraScan Landslide Detection System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;