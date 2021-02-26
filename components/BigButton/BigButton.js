// @flow

import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { withNamespaces } from '../../config/i18n';
import styles from './styles';

type Props = {
    t:any,
    classes: any,
    courseName: string,
}

const BigButton = ({ courseName, t, classes } : Props) => (
  <div>
    <Button color="primary" className={classes.xxl}>HAHshahsahsa</Button>
    <div>{courseName}</div>
    <div>{t('hello')}</div>
  </div>
);


export default withNamespaces('common')(withStyles(styles)(BigButton));
