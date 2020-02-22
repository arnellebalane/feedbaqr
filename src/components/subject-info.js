import React from 'react';
import QRCode from 'qrcode.react';

import logo from '../images/logo.png';
import '../styles/index.css';

const SubjectInfo = ({ subject }) => {
  const url = `${window.location.origin}/subject/?id=${subject.id}`;

  return (
    <div class="main-wrapper">
      <img id="logo-small" src={logo} />
      <div className="header-wrapper">
        <QRCode value={url} size={100} />
        <div className="description-wrapper">
          <h3>{subject.title}</h3>
          <p>{subject.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectInfo;
