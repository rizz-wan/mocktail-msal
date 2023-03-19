// Tip: Customize the loading template for msal
import { MessageBar, MessageBarType } from '@fluentui/react';
import '../style.scss';

export const LoadingMsal = () => {
  return (
    <MessageBar messageBarType={MessageBarType.info} isMultiline>
      {'Working on logging you in! be patient.'}
    </MessageBar>
  );
};
