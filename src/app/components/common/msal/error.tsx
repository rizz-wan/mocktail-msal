// Tip: Customize the error template for msal
import { Link, MessageBar, MessageBarType } from '@fluentui/react';
import '../style.scss';

export const ErrorMsal = () => {
  return (
    <MessageBar messageBarType={MessageBarType.error} isMultiline>
      {'Aaah! Something went wrong. you may '}
      <Link
        onClick={() => {
          window.location.reload();
        }}
        underline
      >
        <strong>{'refresh'}</strong>
      </Link>
      {' the page or try again later.'}
    </MessageBar>
  );
};
