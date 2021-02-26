// @flow

import React from 'react';
import {
  withStyles, Grid, Button, Icon, Link
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from './styles';



type Props = {
    classes: any,
    data: any,
    menuSignoutBtn: any,
}

function languageName (l) {
  let d;
  if (l.lang === '1') {
    d = 'Armenian';
  } else if (l.lang === '2') {
    d = 'English';
  } else if (l.lang === '3') {
    d = 'Russian';
  }
 
  return  d;

}

const Dashboard = ({
  data, classes, menuSignoutBtn,partnername,path
} : Props) => (
  <Grid item className={classes.dashboard} xs={11}>
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid  className={classes.title}>
      <Link className={classes.titleplacelink} href={`/menu/${partnername.id}/${partnername.lang}/${partnername.branchname}/${partnername.partnername}`}>
      <Paper  className={classes.titleplace}> 
      
        <Typography color="textPrimary" className={classes.link}>
        {partnername.branchname}
        
        </Typography>
        <span className={classes.dividertitle}>/</span>
      <Typography color="textPrimary" className={classes.link}>
          <Icon className={`${ classes.icon} ${ classes.titleicon}`}>place</Icon>
          {partnername.partnername}
        </Typography>
     
    </Paper>
    </Link>
    <Grid className={partnername.categoryname === undefined ? classes.hidden : classes.titlecat}> 
        <Typography color="textPrimary" className={classes.titlecatlink}> 
           {partnername.categoryname=== undefined ? '' : partnername.categoryname.split('*').join('/')}
       </Typography> 
    </Grid>
    <Typography color="textPrimary" className={classes.link}>
Lang: {languageName(partnername)}
</Typography>
     
        </Grid>
      <Grid item className={classes.buttonsignout}>
        <Button variant="contained" component="span" className={classes.button} onClick={() => { menuSignoutBtn(); }}>Sign Out</Button>
      </Grid>
    </Grid>
    <Grid>
      {data}
    </Grid>
  </Grid>

);


export default (withStyles(styles)(Dashboard));
