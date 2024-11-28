import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header>Header</header>
            <main>{children}</main>
            <footer>Footer</footer>
        </div>
    );
};

export default Layout;
