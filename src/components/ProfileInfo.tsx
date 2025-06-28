import React from 'react';

const ProfileInfo: React.FC = () => {
  return (
    <div className="flex-1 text-center md:text-left transition-transform duration-700 ease-out transform translate-y-8 opacity-0 animate-appear animation-delay-300">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
        Henrique Silva
      </h1>
      
      <div className="text-[#d0d0d0] mb-6 space-y-1">
        <p className="text-lg md:text-xl">
          Senior consultant and developer with full-stack experience, 
          <br />
          data-driven mindset, and passion for productivity. <br />
          Ready to solve complex challenges and drive quality delivery.        
        </p>
      </div>
      
      <div className="text-[#d0d0d0] space-y-4 max-w-2xl text-justify">
        <p className="leading-relaxed">
          I am a professional passionate about technology and productivity, with a degree in Systems Analysis and Development (2012) 
          and over 10 years of experience working in cross-functional software development teams. I am currently pursuing a Bachelor's 
          degree in Applied and Computational Mathematics (MAC) at the Federal University of Goiás (UFG) (2024). My journey has always 
          had one thing in common: turning complex ideas into elegant solutions, whether it's Python APIs, React/Next.js front-ends, 
          or robust data pipelines.        
        </p>
        
        <p className="leading-relaxed">
          In summary, I bring experience in both front-end and back-end, 
          a strong data-driven mindset, and a passion for productivity. 
          I'm ready to contribute to the team, help untangle complex 
          architecture challenges, and ensure the Project, Team, 
          and Company move forward with quality and agility.
        </p>

        <p className="leading-relaxed">
          Programmer, mathematician, and eternal learner in search of meaning in the world through sketches of calculation and lines of code.
          <br /><small>- H.H.Silva-</small>
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
