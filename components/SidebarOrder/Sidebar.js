// @flow

import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import styles from './styles';

type Props = {
    classes: any,
    partName: any,
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Sidebar = ({ classes, partName } : Props) => (
  <Grid item xs={1} className={classes.sidebar}>
    <h1 className={classes.title}>Figaro</h1>
    <div className={classes.root}>
      <List component="nav" className={classes.lists}>
        <ListItemLink href="/orders">
          <ListItemText className={classes.liststext} primary="Orders" />
        </ListItemLink>
        {/* <ListItemLink href="/pays">
          <ListItemText className={classes.liststext} primary="Pays" />
        </ListItemLink> */}
      </List>
      <Divider />

    </div>
  </Grid>
);


export default (withStyles(styles)(Sidebar));
