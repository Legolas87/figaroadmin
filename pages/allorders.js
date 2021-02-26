import React from 'react';
import {
  createMuiTheme, MuiThemeProvider,
  withStyles, Grid, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Typography, Switch, Icon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import nextCookie from 'next-cookies';
import Api from '../api';
import OrderTable from '../components/Orders/OrderTable';
import DateUtil from '../utils/DateUtil';
import Router from '../components/Router';
import Sidebar from '../components/Sidebar/Sidebar';
import Link from '../components/Link';
import SimplePopover from '../components/Orders/SimplePopover';
import { logout, withAuthSync } from '../utils/auth';
import  IMG_BASE_URL from '../utils/img';


type Props = {
    orders: Array<OrderTable>,
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
    backgroundColor: '#38a149',
    margin: '5px 0px',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#319942',
    },
  },

  ordertitle: {
    color: '#2196f3',
    fontSize: '31px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    margin: '20px',
  },

  menuitemspan: {
    color: '#E27D60',
    padding: '4px',
    fontWeight: '500',
  },

  menuitemspanquantity: {
    color: '#E8A87C',
    padding: '4px',
    fontWeight: '500',
  },

  menuitemspanprice: {
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

  logoimagesize: {
    width: '50px',
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

  notifsound: {
    fontSize: '20px',
    paddingRight: '10px',
  },

  iconmap: {
    color: '#41B3A3',
    margin: '0 6px -6px 0',
  },

  changecolor: {
    color: '#000',
  },

  iconaddress: {
    fontSize: '21px',
    margin: '0px 0px -3px 0px',
  },

  closenotif: {
    color: '#fff',
  },

  orderbranchname: {
     fontSize: '16px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: '#025076',
    fontStyle: 'oblique',
  }

});


class AllOrders extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      timealert: false,
      notificationOn: false,
      ordersnew: props.orders,
      soundOn: true,
      isOpen: null,
    };
  }

  static async getInitialProps(ctx) {
    const { token, type } = nextCookie(ctx);
    try {
      const orders = await Api.getAllOrders(token);
      if (!orders) {
        ctx.res.redirect('/');
      }
      return {
        orders: orders.orders, token, query: ctx.query, dd: orders, type,
      };
    } catch (e) {

    }
  }


  componentDidMount() {
    // this.interval = setInterval(() => {
    //   // Router.push('/orders');
    //   this.newfunction(this.state.ordersnew);
    //   this.newOrders();
    // }, 10000);

   // this.ifisChrome();
  //  this.orderNotification = setInterval(() => this.newfunction(this.state.ordersnew), 10000);
  }

  componentWillUnmount() {
   // clearInterval(this.interval);
    // clearInterval(this.orderNotification);
  }


 convert =d => (
   d.constructor === Date ? d
     : d.constructor === Array ? new Date(d[0], d[1], d[2])
       : d.constructor === Number ? new Date(d)
         : d.constructor === String ? new Date(d)
           : typeof d === 'object' ? new Date(d.year, d.month, d.date)
             : NaN
 )

compare =(a, b) => (
  isFinite(a = this.convert(a).valueOf())
     && isFinite(b = this.convert(b).valueOf())
    ? (a > b) - (a < b)
    : NaN
)

  newfunction = (ordersn) => {
    const { notificationOn } = this.state;
    const lastOrderNumber = ordersn.length - 1;
    if (lastOrderNumber != -1) {
      const lastOrder = ordersn[lastOrderNumber].createDate;

      const news = DateUtil.formatDate(lastOrder);
      const date = new Date(news);
      const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
      const offset = date.getTimezoneOffset() / 60;
      const hours = date.getHours();
      newDate.setHours(hours - offset);
      const newDateString = newDate.toString();
      const current_datetime = newDate;
      const lastDate = `${current_datetime.getFullYear()}-${current_datetime.getMonth() + 1}-${current_datetime.getDate()} ${current_datetime.getHours()}:${current_datetime.getMinutes()}:${current_datetime.getSeconds()}`;

      const tempDate = new Date();
      tempDate.setSeconds(tempDate.getSeconds() - 20);
      const currDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;

      const compareValue = this.compare(lastDate, currDate);


      const x = document.getElementById('myAudio');

      if (compareValue == 1 || compareValue == 0) {
        setTimeout(() => this.setState({ notificationOn: true }), 0);
        x.autoplay = true;
        x.load();
        setTimeout(() => this.setState({ notificationOn: false }), 2000);
      } else {
        this.setState({ notificationOn: false });
      }
    }
  }


  getMuiTheme = () => createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MUIDataTableBodyCell: {
        /* root: {
          padding: '4px 6px',
          fontSize: '0.8525rem',
        }, */

        root: {
          '&:nth-child(12)': {
            width: '30%',

          },
        },


      },
    },

  });

  signoutClick = () => {
    logout();
  }


  openNotification = () => {
    const x = document.getElementById('myAudio');
    setTimeout(() => this.setState({ notificationOn: true }), 0);

    x.load();
    x.autoplay = true;

    setTimeout(() => this.setState({ notificationOn: false }), 2000);
  }

  // Mute = () => {
  //   if (document.getElementById('myAudio').muted) {
  //     document.getElementById('myAudio').muted = false;
  //     this.setState({ timealert: false });
  //   } else {
  //     this.setState({ timealert: true });
  //     document.getElementById('myAudio').muted = true;
  //   }
  // }

  // ifisChrome = () => {
  //   // Chrome 1 - 71
  //   const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  //   if (isChrome) {
  //     document.getElementById('myAudio').muted = true;
  //     this.setState({ timealert: true });
  //   } else {
  //     document.getElementById('myAudio').muted = false;
  //     this.setState({ timealert: false });
  //   }
  // }

  closeNotification = () => {
    this.setState({ notificationOn: false });
  }


  async newOrders() {
    const { ordersnew } = this.state;
    const { token } = this.props;

    try {
      const orders = await Api.getOrders(token);

      if (orders) {
        this.setState({ ordersnew: orders.orders });
      }
    } catch (e) {
    }
  }


  async handleClick(orderId) {
    const { token } = this.props;
    let txt;
    let r = confirm("Are you sure you want to cancel?");
    if (r == true) {
      const response = await Api.reject(orderId, token);
      if (response.isSuccess) {
        Router.push('/orders');
      }
    } else {
      txt = "You pressed Cancel!";
    }
    
  }


  async approveBtn(orderId) {
    const { token } = this.props;
    const response = await Api.approve(orderId, token);
    if (response.isSuccess) {
      Router.push('/orders');
    }
  }

  async delivereBtn(orderId) {
    const { token } = this.props;
    const response = await Api.delivered(orderId, token);
    if (response.isSuccess) {
      Router.push('/orders');
    }
  }

  handleOpenItem = (event,id) => {
    this.setState({isOpen: id });
  }

  defaultImage = (type, itemImageUrl, partnerId) => {
    const imagUrlConstant = `${IMG_BASE_URL}menu/GetPartnerImage`;

    let text;
    if (itemImageUrl != '') {
      text = `${imagUrlConstant}/${partnerId}/${type}/${itemImageUrl}`;
    } else {
      text = 'https://d9np3dj86nsu2.cloudfront.net/image/be7672cb02ca220ce6cdce2a382da9f8';
    }


    return `${text}`;
  }



  render() {
    const columns = [
      {
        name: 'Branch',
        field: 'Branch',
        options: {
          filter: false,
          sort: false,
        },
      },
      {
      name: 'Create Date',
      field: 'Create Date',
      options: {
        filter: true,
        sort: true,
        sortDirection: 'desc',
      },
    },
    {
      name: 'Type',
      field: 'Type',
      options: {
        filter: false,
        sort: false,
      },
    },

    'To be Date', 'Address', 'Phone Number',
    {
      name: 'Order Item',
      field: 'Order Item',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'Order Total',
      field: 'Order Total',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'Status',
      field: 'Status',
      options: {
        filter: false,
        sort: false,
      },
    },
    // {
    //   name: 'Change Status',
    //   field: 'Change Status',
    //   options: {
    //     filter: false,
    //     sort: false,
    //   },
    // },
    'isPaid',
    'Payment Method',
    'Info',
    ];


    const options = {
      filter: true,
      filterType: 'dropdown',
      download: false,
      print: false,
      responsive: 'scroll',
      selectableRows: false,
    };

    function typeName(type) {
      let text;
      switch (type) {
        case 1:
          text = (
            <span className={classes.typecolor}>
              <i className="material-icons">directions_walk</i>
              <span className={classes.typepadding}>Take away</span>
            </span>
          );
          break;
        case 2:
          text = (
            <span className={classes.typecolor}>
              <i className="material-icons">directions_car </i>
              <span className={classes.typepadding}>Delivery</span>
            </span>
          );
          break;
        case 3:
          text = (
            <span className={classes.typecolor}>
              <i className="material-icons">contact_phone</i>
              <span className={classes.typepadding}>Table Reserve</span>
            </span>
          );
          break;
        case 4:
          text = (
            <span className={classes.typecolor}>
              <i className="material-icons"> restaurant_menu</i>
              <span className={classes.typepadding}>Order In Place</span>
            </span>
          );
          break;
        default:
          text = (
            <span className={classes.typecolor}>
              <span className={classes.typepadding}>No Type</span>
            </span>
          );
      }
      return text;
    }


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

    function statusName(status) {
      let text;
      switch (status) {
        case 1:
          text = (<span className={classes.greywaiting}><span className={classes.typepadding}>Ordered </span></span>);
          break;
        case 2:
          text = (
            <span className={classes.blueappr}>Processing </span>
          );
          break;
        case 4:
          text = <span className={classes.redrejected}>Cancelled </span>;
          break;
        case 3:
          text = <span className={classes.greenpaid}>Delivered</span>;
          break;
        case 5:
          text = <span className={classes.greywaiting}>Open</span>;
          break;
        default:
          text = 'No Status';
      }
      return text;
    }


    function payMethod(paymethod) {
      let text;
      switch (paymethod) {
        case 1:
          text = 'Cash';
          break;
        case 2:
          text = 'CreditCard';
          break;
        case 3:
          text = 'Bonus';
          break;
        default:
          text = 'No Payment Method';
      }
      return text;
    }


    function FormatDate(tobeDate) {
      if (tobeDate) {
        const news = DateUtil.formatDate(tobeDate);
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


    function orderPlace(placecoordinates) {
      let text = '';

      if (placecoordinates) {
        const placecoordinate = placecoordinates.split('*');
        if (placecoordinate[1]) {
          text = (
            <Link prefetch as={`https://yandex.com/maps/?text=${placecoordinate[1]}&z=19`} href={`https://yandex.com/maps/?text=${placecoordinate[1]}&z=19`}>
              <a className={classes.changecolor} target="_blank" rel="noopener noreferrer">
                <Icon className={classes.iconmap}>map</Icon>
                {placecoordinate[0]}
              </a>
            </Link>
          );
        } else {
          text = (
            <div>
              <Icon className={classes.iconaddress}>room</Icon>
              {placecoordinates}
            </div>
          );
        }
      }

      return text;
    }


    const {
      classes, query, type

    } = this.props;
    const {
      notificationOn, timealert, ordersnew, isOpen,
    } = this.state;

    return (

      <div>


        <Grid container>
          <Sidebar partName={query} type={type} />
          <Grid className={classes.dashboard} item xs={11}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <h1 className={classes.ordertitle}>
                    <span>
                      All Orders
                    </span>
                   
                  </h1>
                </Grid>

                <Grid item className={classes.buttonsignout}>
                  <Button variant="contained" component="span" className={classes.button} onClick={this.signoutClick}>Sign Out</Button>
                </Grid>
              </Grid>


              <div />

              <Grid justify="center" alignItems="center" container>
                <Grid item />
              </Grid>

              <div className={classes.muitable}>

                <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MUIDataTable
                    title="All Orders "
                    data={ordersnew.map(item => [
                      <div className={classes.orderImg}>
                        <img className={`${classes.img} ${classes.logoimagesize}`} alt="img" src={this.defaultImage(1, item.logo, item.partnerId)} />
                        <div className={classes.orderbranchname}>{item.branch.name}</div>
                     </div>, 
                      convertUTCDateToLocalDate(item.createDate),

                      typeName(item.type),

                      FormatDate(item.tobeDate),
                      orderPlace(item.address),
                      item.phoneNumber,
                      <SimplePopover orderItem={item.orderItem} id={item.id} isOpen={isOpen} handleClick={this.handleOpenItem} />,
                   
                      <span className={classes.menuitemspanprice}>
                       {item.sum}
    
                    </span>
                    ,
                      statusName(item.status),
                      // <div>

                      //   <div className={item.status === 5 ? classes.hidden : classes.show}>
                      //     <div className={item.status === 4 ? classes.hidden : classes.show}>
                      //       <div className={(item.status === 2 || item.status === 3) ? classes.hidden : classes.show}>
                      //         <Button variant="contained" color="secondary" className={`${classes.reject} ${classes.button}`} onClick={this.handleClick.bind(this, item.id)}>
                      //           <span>Cancel</span>
                      //           <DeleteIcon className={classes.rightIcon} />
                      //         </Button>
                      //       </div>
                      //       <div className={item.status === 3 ? classes.hidden : classes.show}>

                      //         <div className={item.status === 2 ? classes.hidden : classes.show}>
                      //           <Button variant="contained" color="primary" className={`${classes.approve} ${classes.button}`} onClick={this.approveBtn.bind(this, item.id)}>Processing </Button>
                      //         </div>
                      //       </div>

                      //       <div className={item.status === 3 ? classes.hidden : classes.show}>
                      //         <div className={item.status === 1 ? classes.hidden : classes.show}>
                      //           <Button variant="contained" color="primary" className={`${classes.delivered} ${classes.button}`} onClick={this.delivereBtn.bind(this, item.id)}>Delivered </Button>
                      //         </div>
                      //       </div>
                      //     </div>

                      //   </div>
                      //   <div className={item.status === 5 ? classes.show : classes.hidden}>
                      //     <Button variant="contained" color="secondary" className={`${classes.reject} ${classes.button}`}>
                      //       <span>Close</span>
                      //     </Button>
                      //   </div>
                      // </div>,
                      isPayed(item.isPayed),
                      payMethod(item.payMethod),
                      item.info,

                    ])}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>


                <Dialog
                  open={notificationOn === true}
                  onClose={() => { this.closeNotification(); }}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogTitle id="draggable-dialog-title">Notification</DialogTitle>
                  <DialogContent>
                    <DialogContentText> There are New Orders </DialogContentText>

                  </DialogContent>
                  <DialogActions className={classes.buttoncontainer}>
                    <Button type="button" variant="contained" className={`${classes.closenotif} ${classes.button}`} color="primary" onClick={() => { this.closeNotification(); }}>Close</Button>

                  </DialogActions>
                </Dialog>

              </div>
            </Grid>
            {/* <figure>

              <audio id="myAudio" muted={timealert != false}>
                <source src="static/slow-spring-board.mp3" />
              </audio>
              <div>
                <span className={classes.notifsound}>Notification's Sound</span>
                <button type="button" variant="outlined" color="secondary" id="audiomute" onClick={() => { this.Mute(); }}>
                  {timealert === false ? <i className="material-icons">volume_down</i> : <i className="material-icons">volume_off</i> }
                </button>
              </div>
            </figure> */}

          </Grid>

        </Grid>


      </div>
    );
  }
}

export default withAuthSync(withStyles(styles)(AllOrders));
