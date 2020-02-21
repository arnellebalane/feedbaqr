import React from 'react';
import QRCode from 'qrcode.react';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8000/';

const SubjectInfo = ({ subject }) => {
  const url = `${BASE_URL}subject/?id=${subject.id}`;

  return (
    <header>
      <h1>{subject.title}</h1>
      <p>{subject.description}</p>

      <QRCode value={url} size={1000} />
    </header>
  );
};

export default SubjectInfo;
