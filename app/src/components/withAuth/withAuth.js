import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SideBar from '../SideBar/SideBarGeneral/SideBar';
import './withAuth.css';
import Header from '../Header/Header';

const withAuth = (WrappedComponent) => {
  
  const AuthComponent = (props) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Get isLoggedIn from localStorage
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

    const toggleDarkModeClass = (selector, add) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (add) {
          element.classList.add('dark-mode');
        } else {
          element.classList.remove('dark-mode');
        }
      });
    };
    
    const toggleMode = () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
      const targetElements = [
        'body',
        'li:nth-child(odd)',
        'li:nth-child(even)',
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        '.TableContainer th:first-child',
        '.TableContainer td:first-child',
        '.TableContainer th:nth-child(2)',
        '.TableContainer td:nth-child(2)',
        '.TableContainer th:nth-child(3)',
        '.TableContainer td:nth-child(3)',
        '.TableContainer th:last-child',
        '.TableContainer td:last-child',
        '.ButtonStyleLinks',
        '.EditProfileContainer',
        '.EditProfileContainer2',
        '.SpecificUserContainer',
        '.EditProfileImageContainer',
        '.JobListingWordContainer',
        '.WholeJobContainer',
        '.NotificationContainer',
        '.EditJobContainer'
      ];
      const addDarkModeClass = mode === 'dark';
      targetElements.forEach((element) => {
        toggleDarkModeClass(element, addDarkModeClass);
      });
    
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            targetElements.forEach((element) => {
              toggleDarkModeClass(element, addDarkModeClass);
            });
          }
        });
      });
    
      const config = { childList: true, subtree: true };
      observer.observe(document, config);
    
      localStorage.setItem('mode', mode);
    
      // Clean up the observer on unmount
      return () => {
        observer.disconnect();
      };
    }, [mode]);

    if (isLoggedIn) {
      return (
        <div className='EverythingContainer'>
          <div className='HeaderContainer'>
            <Header />
          </div>
          <div className='ComponentsContainer'>
            <div className='SideBarContainerInAuth'>
              <SideBar mode={mode} toggleMode={toggleMode} />
            </div>
            <div className='WrappedComponentContainer'>
              <WrappedComponent mode={mode} toggleMode={toggleMode} {...props} />
            </div>          
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  };
  return AuthComponent;
};

export default withAuth;
