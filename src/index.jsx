import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthProvider from './context/AuthContext';
import NavbarProvider from './context/NavbarContext';
import CompanyProvider from './context/CompanyContext';
import InterestsProvider from './context/InterestsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CompanyProvider>
        <InterestsProvider>
          <NavbarProvider>
            <App />
          </NavbarProvider>
        </InterestsProvider>
      </CompanyProvider>
    </AuthProvider>
  </React.StrictMode>,
);
