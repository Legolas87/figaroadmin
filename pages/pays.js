import React from 'react';
import {
  createMuiTheme, MuiThemeProvider,
  withStyles, Grid, Button,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import nextCookie from 'next-cookies';
import Api from '../api';
import DateUtil from '../utils/DateUtil';
import Router from '../components/Router';
import Sidebar from '../components/SidebarOrder/Sidebar';
import { logout, withAuthSync } from '../utils/auth';

type Props = {
    pays: any,
    classes: any,
    query: any,
    token: any,

};

const styles = theme => ({
  reject: {
    backgroundColor: '#e72222',
    margin: '5px 0px',
    color: '#fff',
    fontSize: '12px',
    padding: '4px 6px',
    '&:hover': {
      backgroundColor: '#f73535',
    },
  },
  rightIcon: {
    fontSize: '15px',
    marginTop: '-2px',
  },
  approve: {
    fontSize: '12px',
    padding: '4px 8px',
    margin: '5px 0px',
  },

  hidden: { display: 'none' },

  delivered: {
    backgroundColor: '#41B3A3',
    margin: '5px 0px',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#319942',
    },
  },

  ordertitle: {
    color: '#41B3A3',
    fontSize: '31px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    margin: '20px',
  },

  menuitemspan: {
    color: '#41B3A3',
    padding: '4px',
    fontWeight: '500',
  },
  menuitems: {
    padding: '0',
    listStyle: 'none',
  },

  muitable: {
    overflowX: 'auto',
    '&div': {
      overflowX: 'auto',
    },
  },

  greenpaid: {
    color: '#41B3A3',
    fontWeight: '500',
    fontSize: '15px',
    fontStyle: 'italic',
  },

  redrejected: {
    color: '#e72222',
    fontWeight: '500',
    fontSize: '15px',
    fontStyle: 'italic',
  },

  blueappr: {
    color: '#3f51b5',
    fontWeight: '500',
    fontSize: '15px',
    fontStyle: 'italic',
  },

  greywaiting: {
    display: 'flex',
    alignItems: 'center',
    color: '#000000',
    fontWeight: '400',
    fontSize: '15px',
    fontStyle: 'italic',
  },

  buttonsignout: {
    margin: '20px',
  },

  typecolor: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: '400',
    alignItems: 'center',
  },
  typepadding: {
    padding: '0 5px',
  },
  dashboard: {
    padding: '0 30px',
    marginLeft: '8.333333%',
  },

});


class Tables extends React.Component<Props> {
  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx);

    const pays = await Api.getPays(token);
    if (!pays) {
      ctx.res.redirect('/');
    }
    return {
      pays, token, query: ctx.query,
    };
  }


   getMuiTheme = () => createMuiTheme({
     typography: {
       useNextVariants: true,
     },
     overrides: {
       MUIDataTableBodyCell: {
         root: {
           padding: '4px 24px',
           fontSize: '0.8525rem',
         },


       },
     },

   });

  signoutClick = () => {
    logout();
  }


  render() {
    const columns = [
      'UserId',
      {
        name: 'Create Date',
        field: 'Create Date',
        options: {
          filter: true,
          sort: true,
          sortDirection: 'desc',
        },
      },
      'Phone Number',
      'Sum',
      'isPaid',
    ];


    const options = {
      filter: true,
      filterType: 'dropdown',
      download: false,
      print: false,
      responsive: 'scroll',
      selectableRows: false,
    };


    function isPayed(isPayedValue) {
      let text;
      switch (isPayedValue) {
        case false:
          text = 'Not Paid';
          break;
        case true:
          text = <span className={classes.greenpaid}>Paid</span>;
          break;
        default:
          text = 'No Value';
      }
      return text;
    }

    function FormatDate(tobeDate) {
      if (tobeDate) {
        return DateUtil.formatDate(tobeDate);
      }

      const timed = 'Time is not specified';
      return timed;
    }

    function convertUTCDateToLocalDate(crdate) {
      const news = DateUtil.formatDate(crdate);
      const date = new Date(news);
      const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
      const offset = date.getTimezoneOffset() / 60;
      const hours = date.getHours();
      newDate.setHours(hours - offset);
      const newDateString = newDate.toString();
      const current_datetime = newDate;
      const formatted_date = `${current_datetime.getFullYear()}-${current_datetime.getMonth() + 1}-${current_datetime.getDate()} ${current_datetime.getHours()}:${current_datetime.getMinutes()}:${current_datetime.getSeconds()}`;
      const newformat = DateUtil.formatDate(formatted_date);
      return newformat;
    }


    const {
      classes, pays, query,
    } = this.props;

    return (

      <div>
        <Grid container>
          <Sidebar partName={query} />
          <Grid className={classes.dashboard} item xs={11}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item />
                <Grid item className={classes.buttonsignout}>
                  <Button variant="contained" component="span" className={classes.button} onClick={this.signoutClick}>Sign Out</Button>
                </Grid>
              </Grid>
              <div className={classes.muitable}>

                <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MUIDataTable
                    title="Pays"
                    data={pays.map(item => [
                      item.userId,
                      convertUTCDateToLocalDate(item.createDate),
                      item.phoneNumber,
                      item.sum,
                      isPayed(item.isPayed),
                    ])}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>

              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withAuthSync(withStyles(styles)(Tables));
