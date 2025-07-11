import React from 'react';
import { Linkedin, Youtube, Github, Instagram } from 'lucide-react';
import ProfilePhoto from '../components/ProfilePhoto';
import ProfileInfo from '../components/ProfileInfo';
import VerticalSidebar from '../components/VerticalSidebar';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#191919] min-h-screen text-white relative overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 flex-1">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
          <ProfilePhoto />
          {/* Texto justificado sempre */}
          <div className="w-full text-justify">            
            {/* Social icons */}
            <div className="mt-8 flex gap-6 text-[#d0d0d0] justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/henriquesilvadev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.youtube.com/@henriquesilvadev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://github.com/henriquehsilva"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.instagram.com/henriquesilvadev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
            <ProfileInfo />
          </div>
        </div>
      </div>

      {/* Sidebar vertical (direita, apenas desktop) */}
      {/* <div className="hidden md:flex absolute right-0 top-0 h-full items-center pr-4">
        <VerticalSidebar />
      </div> */}

      {/* Sidebar no rodapé (mobile) */}
      <div className="block w-full py-6 border-t border-white/10">
        <div className="flex justify-center">
          <VerticalSidebar />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
