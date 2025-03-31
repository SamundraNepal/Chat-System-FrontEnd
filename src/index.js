import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  AuthProvider,
  FileUploadProvider,
  NotificationsContextProvider,
  UserMessagesProvider,
  UserProvider,
} from './until/useContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <UserProvider>
      <FileUploadProvider>
        <NotificationsContextProvider>
          <UserMessagesProvider>
            <App />
          </UserMessagesProvider>
        </NotificationsContextProvider>
      </FileUploadProvider>
    </UserProvider>
  </AuthProvider>,
);
