// Tip: Customize the login logout button
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest } from 'src/utils/msal';
import { PrimaryButton } from '@fluentui/react';

const LoginLogoutButton = () => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = (loginType: string) => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest);
    } else if (loginType === 'redirect') {
      instance.loginRedirect(loginRequest);
    }
  };

  const handleLogout = (logoutType: string) => {
    if (logoutType === 'popup') {
      instance.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else if (logoutType === 'redirect') {
      instance.logoutRedirect();
    }
  };

  if (isAuthenticated) {
    return (
      <PrimaryButton onClick={() => handleLogout('redirect')}>
        Logout
      </PrimaryButton>
    );
  } else if (
    inProgress !== InteractionStatus.Startup &&
    inProgress !== InteractionStatus.HandleRedirect
  ) {
    // inProgress check prevents sign-in button from being displayed briefly after returning from a redirect sign-in. Processing the server response takes a render cycle or two
    return (
      <PrimaryButton onClick={() => handleLogin('redirect')}>
        Login
      </PrimaryButton>
    );
  } else {
    return null;
  }
};

export default LoginLogoutButton;
