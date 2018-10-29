import React, { Fragment } from 'react';
import './Header.css';
import Select from 'react-select';

// Options for dropdown
const options = [
  { value: 1, label: 'Go to Spotify' },
  { value: 2, label: 'Disconnect from Spotify'}
];

// Styles for dropdown
const selectStyles = {
  control: () => ({ 
    display: 'flex',
    backgroundColor: 'transparent',
    border: 'none'
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
    alignItems: 'center'
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    width: '10rem'
  })
};

// Placeholder for dropdown
const placeholder = (user) => (
  <Fragment>
    <img className="userPic" src={user.images[0].url} alt="Thumbnail of logged-in user's avatar" />
    <span>{user.display_name}</span>
  </Fragment>
);

// Display the current user
const renderAuthedUser = (user) => (
  <Select
    value={user.display_name}
    className="user" 
    classNamePrefix="select"
    isSearchable={false}
    placeholder={placeholder(user)}
    options={options}
    styles={selectStyles}
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