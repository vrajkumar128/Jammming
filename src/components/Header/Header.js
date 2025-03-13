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
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: 'white',
    display: 'flex',
    padding: '0 8px',
    opacity: 1,
    visibility: 'visible'
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
  })
};

const handleOptionChange = (option) => {
  if (option.value === 1) {
    // Go to Spotify
    window.open('https://open.spotify.com', '_blank');
  } else if (option.value === 2) {
    // Disconnect from Spotify
    localStorage.clear();
    window.location.href = '/';
  }
};

const CustomDropdownIndicator = (props) => {
  return (
    <div className="select__dropdown-indicator">
      <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" fill="white">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    </div>
  );
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
    components={{ DropdownIndicator: CustomDropdownIndicator }}
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