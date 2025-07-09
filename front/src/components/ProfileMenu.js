import React from 'react';
import DefaultProfile from '../features/assets/default-profile.png';

function ProfileMenu({ isProfileOpen, toggleProfile, handleMyPage, handleLoginClick, navigate }) {
  return (
    <div className="profile-menu-container">
      <button className="user-menu-button" onClick={toggleProfile}>
        <img src={DefaultProfile} alt="Toggle Profile" className="user-icon"/>
      </button>
      {isProfileOpen && (
        <div className="user-dropdown show">
          <div className="dropdown-item" onClick={handleMyPage}>
            마이페이지
          </div>
          <div className="dropdown-item" onClick={handleLoginClick}>
            로그인
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
