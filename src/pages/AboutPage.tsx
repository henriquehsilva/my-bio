import React from 'react';
import ProfilePhoto from '../components/ProfilePhoto';
import ProfileInfo from '../components/ProfileInfo';
import VerticalSidebar from '../components/VerticalSidebar';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#191919] min-h-screen text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
          <ProfilePhoto />
          {/* Força o texto justificado no conteúdo */}
          <div className="text-justify w-full">
            <ProfileInfo />
          </div>
        </div>
      </div>

      {/* Sidebar vertical (desktop) */}
      <div className="hidden md:block absolute top-0 right-0 h-full">
        <VerticalSidebar />
      </div>

      {/* Footer com o mesmo conteúdo da sidebar (mobile) */}
      <footer className="block md:hidden px-4 py-6">
        <VerticalSidebar />
      </footer>
    </div>
  );
};

export default AboutPage;
