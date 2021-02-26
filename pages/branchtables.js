import React from 'react';
import {
  createMuiTheme, MuiThemeProvider,
  withStyles, Grid, Button, Icon,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import nextCookie from 'next-cookies';
import Api from '../api';
import DateUtil from '../utils/DateUtil';
import Router from '../components/Router';
import Sidebar from '../components/Sidebar/Sidebar';
import { logout, withAuthSync } from '../utils/auth';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

type Props = {
    tables: any,
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
    margin: '0 20px 20px 0',
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
    padding: '30px',
    marginLeft: '8.333333%',
    marginBottom: '20px',
  },
  showimg: {
    textDecoration: 'none',
  },
  downloadbtn: {
    color: '#fff',
    marginRight: '15px',
  },
  title: {
    display: 'flex',
    margin: '0px 0px 20px 10px',
   
  },

  titleicon: {
    padding: '7px 26px 0px 0px',
    overflow: 'inherit',
  },

  dividertitle: {
    padding: '12px 0',
    fontSize: '27px',
    fontFamily: 'sans-serif',
  },

  titleplace: {
    display: 'flex',
    padding: '0 5px',
    '&:hover': {
      textDecoration: 'none',
      color: '#4caf50',
      boxShadow: '0px 5px 10px #8a8989',
    },
  },
  titleplacelink: {
    display: 'flex',
  
    '&:hover': {
      textDecoration: 'none',
     
    },
  },
  link: {
    display: 'flex',
    padding: '8px',
    fontSize: '27px',
    fontFamily: 'sans-serif',
    color: '#535252',
  },

});


class BranchTables extends React.Component<Props> {
    static async getInitialProps(ctx) {
        const { token } = nextCookie(ctx);
        const { id, lang } = ctx.query;
        const tables = await Api.getTables(`${id}`,`${token}`);
        let langId;
        if (lang == '1') {
      
          langId = 'hy';
        } else if (lang == '2') {
        
          langId = 'en';
        } else if (lang == '3') {
        
          langId = 'ru';
        }
        
        const newpartnerlistlang = await Api.getPartners(langId, token);
        let branchname;
        let partnername;
        for(let i =0; i < newpartnerlistlang.length; i++) {
          for(let j =0; j< newpartnerlistlang[i].branch.length; j++) {
            //console.log(newpartnerlistlang[i].branch[j]);
            if(newpartnerlistlang[i].branch[j].id == id) {
              branchname = newpartnerlistlang[i].branch[j].name;
              partnername = newpartnerlistlang[i].name;
              break;
            }
          }
        }
        return { tables: tables.tables, token, id: id, branchname: branchname, partnername: partnername , lang: lang };
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

  showFile = (blob, fileName) => {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const newBlob = new Blob([blob], { type: 'application/zip' });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const url = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.zip`;
    link.click();
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  handleDownload = async () => {
    const {id, token, branchname, partnername} =this.props;
    const tablesImages = await Api.GetQrCodeImages(`${id}`,`${token}`);
    this.showFile(tablesImages, `${partnername}-${branchname}`);
  }


   languageName = (l) => {
    let d;
    if (l === '1') {
      d = 'Armenian';
    } else if (l === '2') {
      d = 'English';
    } else if (l === '3') {
      d = 'Russian';
    }
   
    return  d;
  
  }
  


  render() {
    const columns = [

      {
        name: 'Name',
        field: 'Name',
        options: {
          filter: true,
          sort: false,
        },
      },
      'qrCode',
      '',
    ];


    const options = {
      filter: true,
      filterType: 'dropdown',
      download: false,
      print: false,
      responsive: 'scroll',
      selectableRows: false,
    };

    const {
      classes, tables, branchname, partnername, lang,
    } = this.props;

    return (
 
      <div>
        <Grid container>
          <Sidebar />
        
          <Grid className={classes.dashboard} item lg={11} md={11} sm={11} xs={11}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid  className={classes.title}>
       
                  <Paper  className={classes.titleplace}> 
                  
                    <Typography color="textPrimary" className={classes.link}>
                    {partnername}
                    
                    </Typography>
                    <span className={classes.dividertitle}>/</span>
                  <Typography color="textPrimary" className={classes.link}>
                      <Icon className={`${ classes.icon} ${ classes.titleicon}`}>place</Icon>
                      {branchname}
                    </Typography>
                
                </Paper>
             
                <Grid className={partnername.categoryname === undefined ? classes.hidden : classes.titlecat}> 
                    <Typography color="textPrimary" className={classes.titlecatlink}> 
                      {partnername.categoryname=== undefined ? '' : partnername.categoryname.split('*').join('/')}
                  </Typography> 
                </Grid>
                {/* <Typography color="textPrimary" className={classes.link}>
                  Lang: {this.languageName(lang)} 
               </Typography> */}
     
                </Grid>
                <Grid item className={classes.buttonsignout}>
               {tables && <Button variant="contained" component="span" color='primary' className={`${classes.button} ${classes.downloadbtn}`} onClick={this.handleDownload}>Download all qr images</Button>}
                  <Button variant="contained" component="span" className={classes.button} onClick={this.signoutClick}>Sign Out</Button>
                </Grid>
              </Grid>
            {tables!=null? ( <div className={classes.muitable}>
              <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MUIDataTable
                    title="Tables"
                    data={tables.map(table => [
                        table.name,
                        table.qrCode,
                        (<a className={classes.showimg} href={`https://chart.apis.google.com/chart?cht=qr&chs=350x350&chl=${ table.qrCode}`} target='_blank'><Button variant="contained" color='primary' component="span" className={classes.button} >Show qr image</Button></a>),
                    ])}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              

              </div>) : (<div className={classes.ordertitle}>NO CONTENT</div>)} 
             
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withAuthSync(withStyles(styles)(BranchTables));

