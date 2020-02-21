import React from 'react';
import QRCode from 'qrcode.react';

const SubjectInfo = ({ subject }) => {
  return (
    <header>
      <h1>{subject.title}</h1>
      <p>{subject.description}</p>

      <QRCode value={subject.id} size={1000} />
    </header>
  );
};

export default SubjectInfo;
