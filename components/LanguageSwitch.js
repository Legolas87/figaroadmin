
import React from 'react';
import { Button } from '@material-ui/core';

import { i18n } from '../config/i18n';

const LanguageSwitch = () => (
  <div>
    <Button
      onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'hy' : 'en')}
    >
      <span>
        {i18n.language}
        {' '}
      </span>
    </Button>
  </div>
);

export default LanguageSwitch;
