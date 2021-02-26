// @flow

import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import styles from './styles';

type Props = {
    classes: any,
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Sidebar = ({ classes,type } : Props) => (
  <Grid item xs={1} className={`${classes.sidebar} ${classes.newsidebar} newsidebar`}>
    <h1 className={classes.title}>Figaro</h1>
    <div className={classes.root}>
      <List component="nav" className={classes.lists}>
        <ListItemLink href="/partnerlist">
          <ListItemText className={classes.liststext} primary="Partners" />
        </ListItemLink>
        {type == 1  && 
        <>
        <Divider />
        <ListItemLink href="/feedback">
          <ListItemText className={classes.liststext} primary="Feedback" />
        </ListItemLink>
        <Divider />
        <ListItemLink href="/notification">
          <ListItemText className={classes.liststext} primary="Create News" />
        </ListItemLink>
        </>}
        
        <Divider />
        <ListItemLink href="/allorders">
          <ListItemText className={classes.liststext} primary="All orders" />
        </ListItemLink>
        <Divider />
      </List>


    </div>
    <style jsx>
      {`
      @media (max-width: 960px) {
        .newsidebar 
        {
          background-color: lightblue;
        }
      }
      `}
    </style>
  </Grid>
);


export default (withStyles(styles)(Sidebar));
