/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <div className="landing-page-sign-in-page-div">
        <span className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
          Vision of Labor
          <img
            src="https://api.iconify.design/material-symbols:holiday-village-outline-rounded.svg"
            alt="vision of labor logo"
          />
        </span>
      </div>

      <div className="create-profile-sign-in background-image">
        <div className="landingPageDiv">
          <h1 className="landingPageh1">Vision of Labor</h1>
        </div>
        <h4>Click the button below to login!</h4>
        <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signIn}>
          Sign In
        </button>
      </div>
    </>
  );
}

export default Signin;
