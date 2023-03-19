import { Configuration, PopupRequest } from '@azure/msal-browser';

// Tip: Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    // Tip: Add your app registration client ID below
    clientId: 'Client ID',
    authority:
      // Tip: Add your app registration tenant ID below
      'https://login.microsoftonline.com/tenant ID',
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
};

// Tip: Add here scopes for id token to be used at MS Identity Platform endpoints
export const loginRequest: PopupRequest = {
  scopes: ['User.Read'],
};

// Tip: Add here the endpoints for MS Graph API services you would like to use to pull user data such as profile image, name, etc.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft-ppe.com/v1.0/me',
};
