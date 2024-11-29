import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginUser from './UserLogIn/loginPage';
import SignUpUsers from './UserLogIn/Signup/signUpUsers';
import ForgotPasswordPage from './UserLogIn/ForgotPassword/forgotPassword';
import UploadProfilePicture from './UserLogIn/UserProfile/userPicture';
import MainArea from './MainPage/mainPage';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <LoginUser /> },
    { path: '/signUp', element: <SignUpUsers /> },
    { path: '/forgotPassword', element: <ForgotPasswordPage /> },
    { path: '/profilePicture', element: <UploadProfilePicture /> },
    { path: '/mainArea', element: <MainArea /> },
  ]);
  return (
    <div className={'app'}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
