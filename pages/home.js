// @flow

import React from 'react';
import { withNamespaces } from '../config/i18n';
import LanguageSwitch from '../components/LanguageSwitch';
import Link from '../components/Link';

type Props = {
  t: any,
};

class Home extends React.Component<Props> {
  static async getInitialProps() {
    return { namespacesRequired: ['common'] };
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <ul>
          <li>
            {t('hello')}
            <LanguageSwitch />
          </li>
          <li>
            <Link href="/course"> Course </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withNamespaces('common')(Home);
