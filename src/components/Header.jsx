import React from 'react'
import logo from '../assets/Logo.svg';
import PrimaryButton from './PrimaryButton';

const Header = () => {
  return (
    <header className="header__container">
      <div className="header__container-inner">
        <img src={logo} alt="Company logo" className="header__logo" />
        <div className="header__wrapper">
          <PrimaryButton btnText={"Users"} link="/#users" />
          <PrimaryButton btnText={"Sign up"} link="/#form" />
        </div>
      </div>
    </header>
  )
}

export default Header;