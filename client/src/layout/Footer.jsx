import React from 'react';

function Footer() {
  return (
    <footer style={{ background: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>
      <div style={{ backgroundColor: 'white', display: 'inline-block', padding: '20px', width: '80%', height: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <a href="#">Link 1</a>
          </div>
          <div>
            <a href="#">Link 2</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;