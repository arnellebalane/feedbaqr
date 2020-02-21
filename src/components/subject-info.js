import React from 'react';
import QRCode from 'qrcode.react';

const SubjectInfo = ({ subject }) => {
  return (
    <header>
      <h1>{subject.title}</h1>
      <p>{subject.description}</p>

      <QRCode value={subject.id} />
    </header>
  );
};

export default SubjectInfo;
