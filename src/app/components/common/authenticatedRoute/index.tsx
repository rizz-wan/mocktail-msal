import React from 'react';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from 'src/utils/msal';
import { ErrorMsal, LoadingMsal } from 'src/app/components/common';

export interface IAuthenticatedRouteProps {
  component: JSX.Element;
}

export class AuthenticatedRoute extends React.Component<IAuthenticatedRouteProps> {
  render(): JSX.Element {
    return (
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
        errorComponent={ErrorMsal}
        loadingComponent={LoadingMsal}
      >
        {this.props.component}
      </MsalAuthenticationTemplate>
    );
  }
}
