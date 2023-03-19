import { Route, Switch, useHistory } from 'react-router-dom';
import HomePage from './components/homePage';
import PhpMysql from './components/phpMysql';
import WebApi from './components/webApi';
import { ThemeProvider } from '@fluentui/react';
import Header from './components/header';
import Footer from './components/footer';
import { GetCurrentTheme } from 'src/utils';
import { Helmet } from 'react-helmet';

// MSAL imports
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from '@azure/msal-browser';
import { CustomNavigationClient, msalConfig } from 'src/utils/msal';
import { MsalProvider } from '@azure/msal-react';
import { AuthenticatedRoute } from './components/common';

export const msalInstance = new PublicClientApplication(msalConfig);

// Tip: Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

function Main() {
  const themeMode = GetCurrentTheme();

  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
  msalInstance.setNavigationClient(navigationClient);

  return (
    <ThemeProvider theme={themeMode}>
      <MsalProvider instance={msalInstance}>
        <Helmet
          defaultTitle='Mocktail Msal'
          titleTemplate='%s - Mocktail Msal'
        ></Helmet>
        <Header />
        <Switch>
          {/* Chore: cleanup, for demo purpose only */}
          <Route
            path={'/phpMysql'}
            render={(): JSX.Element => {
              return <PhpMysql />;
            }}
          />
          {/* Chore: cleanup, for demo purpose only */}
          <Route
            path={'/webApi'}
            render={(): JSX.Element => {
              return <AuthenticatedRoute component={<WebApi />} />;
            }}
          />
          <Route
            path={'/'}
            render={(): JSX.Element => {
              return <HomePage />;
            }}
          />
        </Switch>
        <Footer />
      </MsalProvider>
    </ThemeProvider>
  );
}

export default Main;
