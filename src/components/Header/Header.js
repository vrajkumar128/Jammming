import React from 'react';
import './Header.css';
import Select from 'react-select';

// Options for dropdown
const options = [
  { value: 1, label: 'Go to Spotify' },
  { value: 2, label: 'Disconnect from Spotify' }
];

// Styles for dropdown
const selectStyles = {
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

// Go to or disconnect from Spotify
const handleOptionChange = (option) => {
  if (option.value === 1) {
    window.open('https://open.spotify.com', '_blank');
  } else if (option.value === 2) {
    localStorage.clear();
    window.location.href = '/';
  }
};

// Display the current user
const renderAuthedUser = (user) => (
  <Select
    value={user.display_name}
    className="user"
    classNamePrefix="select"
    isSearchable={false}
    placeholder={<span>{user.display_name}</span>}
    options={options}
    styles={selectStyles}
    onChange={handleOptionChange}
  />
);

// Header component
const Header = ({ user }) => (
  <div className="header">
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    {user && renderAuthedUser(user)}
  </div>
);

export default Header;