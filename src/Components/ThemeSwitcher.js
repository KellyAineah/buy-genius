import React from 'react';
//import './Theme.css';

const ThemeSwitcher = ({ isDark, onChange }) => (
  <label className={`container ${isDark ? "IsDark" : "IsLight"}`}>
    <input
      type="checkbox"
      defaultChecked={isDark}
      onChange={onChange}
    />
    <div />
  </label>
);

export default ThemeSwitcher;
