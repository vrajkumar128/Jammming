import React, { Fragment } from 'react';
import './Header.css';
import Select from 'react-select';

// Options for dropdown
const options = [
  { value: 1, label: 'Go to Spotify' },
  { value: 2, label: 'Disconnect from Spotify' }
];

// Handle option selection
const handleOptionChange = (option) => {
  if (option.value === 1) {
    window.open('https://open.spotify.com', '_blank');
  } else if (option.value === 2) {
    localStorage.clear();
    window.location.href = '/';
  }
};

// Select component that either shows profile pic or default dropdown
const UserDropdown = ({ user }) => {
  const hasProfilePic = user.images && user.images.length > 0;

  const profilePicStyles = {
    control: () => ({
      display: 'flex',
      backgroundColor: 'transparent',
      border: 'none',
      minWidth: '120px'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: () => ({
      display: 'none' // Hide arrow when showing profile pic
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      color: 'black'
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: '10rem'
    }),
    container: (baseStyles) => ({
      ...baseStyles,
      minWidth: '150px'
    })
  };

  const arrowStyles = {
    control: () => ({
      display: 'flex',
      backgroundColor: 'transparent',
      border: 'none',
      minWidth: '150px'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      color: 'black'
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '25px'
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: '10rem'
    }),
    container: (baseStyles) => ({
      ...baseStyles,
      minWidth: '150px'
    })
  };

  // Either show user's profile picture or their username and a dropdown arrow
  if (hasProfilePic) {
    return (
      <Select
        value={user.display_name}
        className="user"
        classNamePrefix="select"
        isSearchable={false}
        placeholder={
          <Fragment>
            <div className="userPic">
              <img src={user.images[0].url} alt="Thumbnail of logged-in user's avatar" />
            </div>
            <span>{user.display_name}</span>
          </Fragment>
        }
        options={options}
        styles={profilePicStyles}
        onChange={handleOptionChange}
      />
    );
  } else {
    return (
      <Select
        value={user.display_name}
        className="user"
        classNamePrefix="select"
        isSearchable={false}
        placeholder={<span className="username-with-space">{user.display_name}</span>}
        options={options}
        styles={arrowStyles}
        onChange={handleOptionChange}
      />
    );
  }
};

// Header component
const Header = ({ user }) => (
  <div className="header">
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    {user && <UserDropdown user={user} />}
  </div>
);

export default Header;