import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import './components/GeneralStyling/GeneralListStyling.css'
import './components/GeneralStyling/Student.css'
import './components/GeneralStyling/Employer.css'
import './components/GeneralStyling/Headhunter.css'
import './components/GeneralStyling/Admin.css'
import './components/GeneralStyling/CommonPages.css'
import './components/GeneralStyling/AllDarkModeChanges.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

