// Layout.jsx
import React from 'react';
import Header from '../Header';

// src/components/Layout.jsx


const Layout = ({ children, showHeader = true, onOpenMessageListModal }) => {
  return (
    <div className="layout">
      {showHeader && <Header onOpenMessageListModal={onOpenMessageListModal} />}
      {children}
    </div>
  );
};

export default Layout;