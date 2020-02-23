import React from 'react';
import QRCode from 'qrcode.react';
import logo from '../images/logo.png';
import '../styles/index.css';

const SubjectDetails = ({ subject }) => {
  const url = `${window.location.origin}/subject/?id=${subject.id}`;

  return (
    <div className="main-wrapper">
      <img id="logo-small" src={logo} alt="FeedbaQR Logo" />

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

export default SubjectDetails;
