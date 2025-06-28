import React from 'react';

const ProfilePhoto: React.FC = () => {
  // Using a placeholder image - in a real application, replace with actual image path
  const profileImage = "/me.jpeg?auto=compress&cs=tinysrgb&w=700";

  return (
    <div className="flex-shrink-0 transition-transform duration-700 ease-out transform translate-y-8 opacity-0 animate-appear">
      <div className="w-48 h-48 md:w-56 md:h-56 lg:w-30 lg:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-lg">
        <img 
          src={profileImage} 
          alt="Henrique Silva" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;