// Layout.jsx

import React from 'react';
import  Hero  from './hero';

function Layout({ children }) {
  return (
    <div>
      <Hero />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
