import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginUser from './UserLogIn/loginPage';
import SignUpUsers from './UserLogIn/Signup/signUpUsers';
import ForgotPasswordPage from './UserLogIn/ForgotPassword/forgotPassword';
import MainArea from './MainPage/mainPage';
import { useContext, useEffect, useState } from 'react';
import AuthFactor from './UserLogIn/Auth/authFactor';
import { AutoLogIn } from './API/apiCalls';
import Spinner from './until/spinner/spinner';
import { AuthContext } from './until/useContext';

function App() {
  const { credentials, setCredentials, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const [isLoading, SetIsLoading] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/',
      element: !credentials ? (
        <LoginUser />
      ) : !isAuthenticated ? (
        <AuthFactor />
      ) : (
        <MainArea />
      ),
    },
    { path: '/signUp', element: <SignUpUsers /> },
    { path: '/forgotPassword', element: <ForgotPasswordPage /> },
    { path: '/mainArea', element: <MainArea /> },
  ]);

  // this is for auto login
  useEffect(() => {
    async function AutoLogin() {
      SetIsLoading(true);
      try {
        const data = await AutoLogIn();
        if (!data.success) {
          SetIsLoading(false);
          setCredentials(false);
          setIsAuthenticated(false);
        } else {
          SetIsLoading(false);
          setIsAuthenticated(true);
          setCredentials(true);
        }
      } catch (err) {
        SetIsLoading(false);
        throw new Error('Failed to log in user ' + err.message);
      }
    }

    AutoLogin();
  }, []);

  return (
    <div className={'app'}>
      {!isLoading ? (
        <div>
          <RouterProvider router={router} />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
