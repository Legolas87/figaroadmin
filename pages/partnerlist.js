// @flow

import React from 'react';
import {
  withStyles, Grid, Button, Select, FormControl, MenuItem, InputLabel, Paper, Icon, ButtonBase, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, FormHelperText,
} from '@material-ui/core';
import nextCookie from 'next-cookies';
import PartnerModel from '../models/PartnerModel';
import Api from '../api';
import Link from '../components/Link';
import Sidebar from '../components/Sidebar/Sidebar';
import { logout, withAuthSync } from '../utils/auth';
import FileBase64 from '../components/FileBase64/react-file-base64';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import  IMG_BASE_URL from '../utils/img';

type Props = {
  partners: Array<PartnerModel>,
  classes: any,
};

const styles = theme => ({
  button: {
    display: 'block',
  },
  btnsize: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  partneritem: {
    padding: '10px',
  },
  paper: {
    padding: '10px',
  },
  logo: {
    maxWidth: '200px',
  },
  partnercontainer: {
    listStyle: 'none',
    padding: '0',
    margin: '5px',
  },


  partnername: {
    fontFamily: 'cursive',
  },
  icon: {
    fontSize: '15px',
    paddingRight: '20px',
  },
  dashboard: {
    padding: '30px',
    marginLeft: '8.333333%',
  },

  buttonsignout: {
    margin: '0 12px 20px 0',
    display: 'flex',
  },

   updateMenus: {
     marginRight: '50px',
   },

  img: {
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
  },

  show: {
    display: 'flex',
    padding: '0 15px 15px 15px',
  },

  hidden: {
    display: 'none',
  },

  btnwhite: {
    cursor: 'pointer',
    margin: '0px 8px 0 0',
    color: 'white',
  },

  imgcontainer: {
    position: 'relative',
  },

  logoimage: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    padding: '10px 10px 10px 15px',
    background: 'white',
    borderRadius: '15px 0px 0px 0px',
    maxWidth: '130px',
  },

  logoimagesize: {
    width: '120px',
  },

  imgopening: {
    margin: 'auto',
    width: '100%',
    height: '100%',
    maxHeight: '600px',
    objectFit: 'cover',
    padding: '15px 0 0 0',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '16px'
  },


  coverimage: {
    borderRadius: '15px',
    width: '100%',
  },

  editbtn: {
    padding: '5px 0 0 0px',
  },

  buttonlink: {
    marginRight: '5px',
    marginLeft: '5px'
  },

  loadingbtn: {
    padding: '0 35px 15px 15px',
    justifyContent: 'flex-end'
  },

  inactive: {
    visibility: 'hidden'
  },
  changecolor: {
    color: '#389c8e',
    paddingLeft: '5px',
    paddingRight: '5px',
    '&:hover': {
      color: '#41B3A3',
    },
  },
  partnerTable: {
    color: '#025076',
    '&:hover': {
     color: '#046fa2',
   },
   partnerTableIcon: {
    fontSize: '20px',
   }
 },


});


class Partnerlist extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      lang: 1,
      open: false,
      openpartnerimage: -1,
      opencoverimage: -1,
      files: [],
      format: -1,
      imgsize:-1,
      imgSizeMessage: '',
      partners: props.partners,
      loading: false,
      updateMenuActive: false,
      newpartnerlist: props.partners,
    };
  }




  async componentDidUpdate(prevProps,prevState) {
    localStorage.setItem('language', this.state.lang);
    const { lang} = this.state;
    const { token} = this.props; 
    if (prevState.lang !== this.state.lang) {
  
      let langId;
      if (lang == '1') {
    
        langId = 'hy';
      } else if (lang == '2') {
      
        langId = 'en';
      } else if (lang == '3') {
      
        langId = 'ru';
      }
      
      const newpartnerlistlang = await Api.getPartners(langId, token);
      this.setState({ newpartnerlist: newpartnerlistlang })
    }
  }

  componentDidMount() {
    const savedlang =  localStorage.getItem('language');
    if(savedlang) {
      this.setState({lang: savedlang})
    }
  }




  // Callback~
  getFiles(files) {
    this.setState({ files, imgsize: -1, format: -1 });
  }

  handlePartnerOpen = (partnerId) => {
    this.setState({ openpartnerimage: partnerId, files: [], format: -1, imgsize: -1 });
  };

  handlePartnerClose = () => {
    this.setState({ openpartnerimage: -1, format: -1, imgsize: -1 });
  };

  handlePartnerCoverOpen = (partnerId) => {
    this.setState({ opencoverimage: partnerId, files: [], format: -1, imgsize: -1 });
  };

  handlePartnerCoverClose = () => {
    this.setState({ opencoverimage: -1, format: -1, imgsize: -1 });
  };


  static async getInitialProps(ctx) {
    const { token, type } = nextCookie(ctx);
    const partnerlist = await Api.getPartners('hy', token);
    return { partners: partnerlist, token, type };
  }


  async uploadPartnerImage(type, partnerId) {
    const { token } = this.props;
    const {
      partners, files, imgId, format,
    } = this.state;

    if (files[0] !== undefined) {
      const hdnImage = files[0].base64;
      const imagearr = hdnImage.split(',');
      const picture = imagearr[1];
      const pictureFormat1 = files[0].type;
      const pictureFormat2 = pictureFormat1.split('/');
      let pictureFormat = pictureFormat2[1];
      if (pictureFormat == 'svg+xml') {
        pictureFormat = 'svg';
      }


      try {
        if (pictureFormat === 'jpeg' || pictureFormat === 'png' || pictureFormat === 'svg') {
          this.setState({ loading: true });
          const res = await Api.UploadPartnerImage(partnerId, type, picture, pictureFormat, token);
         
          if (res.isSuccess) {
            if (type === 1) {
              partners.filter(partner => partner.id === partnerId)[0].logo = res.generatedFileName;
            } else if (type === 2) {
              partners.filter(partner => partner.id === partnerId)[0].coverImage = res.generatedFileName;
            }
  
            this.setState({
              partners, openpartnerimage: -1, opencoverimage: -1, files: [],  loading: false
            });
          } else {
            this.setState({ files: [], imgsize: 0, imgSizeMessage: res.message,  loading: false });
          }
        } 
          else {
            this.setState({ files: [], format: 0,  loading: false});
          }
         
      } catch (e) {

      }
    }
  }


  signoutClick = () => {
    logout();
  }

  updateMenusClick = async() =>{
    const { token } = this.props;
 
    let txt;
    let r = confirm("Are you sure you want to update all menus from GregSys?");
    if (r == true) {
       this.setState({ updateMenuActive: true });
       const updateMenus = await Api.updateMenus(token);
    
    
       if(updateMenus.isSuccess) {
        
         this.setState({ updateMenuActive: false });
       }
    } else {
      txt = "You pressed Cancel!";
    }
   
  }

 

  handleClose = () => {
  
    this.setState({ open: false });
  };

  handleOpen = () => {

    this.setState({ open: true });
  };

  
  handleChange = async (event) => {
    this.setState({ lang: event.target.value }); 
  };

 



  render() {
    function defaultImage(type, itemImageUrl, partnerId) {
      
      const imagUrlConstant = `${IMG_BASE_URL}menu/GetPartnerImage`;

      let text;
      if (itemImageUrl != '') {
        text = `${imagUrlConstant}/${partnerId}/${type}/${itemImageUrl}`;
      } else {
        text = 'https://d9np3dj86nsu2.cloudfront.net/image/be7672cb02ca220ce6cdce2a382da9f8';
      }


      return `${text}`;
    }


    const { partners, classes, type } = this.props;
    const {
      lang, open, openpartnerimage, loading, format, files, opencoverimage, imgsize,imgSizeMessage,updateMenuActive, newpartnerlist
    } = this.state;

    const content = newpartnerlist.map(partner => (
      <Grid item md={4} className={classes.partneritem} key={partner.name}>
        <Paper className={classes.paper}>
          <ul className={classes.partnercontainer}>
            <Grid item sm={12} md={12} xs={12}>
              <div className={` ${classes.imgcontainer}`}>
                <ButtonBase className={` ${classes.coverimage}`} onClick={() => { { this.handlePartnerCoverOpen(partner.id); } }}>
                  <img className={`${classes.img} ${classes.coverimage}`} alt="img" src={defaultImage(2, partner.coverImage, partner.id)} />
                </ButtonBase>

                <ButtonBase className={` ${classes.logoimage}`} onClick={() => { { this.handlePartnerOpen(partner.id); } }}>
                  <img className={`${classes.img} ${classes.logoimagesize}`} alt="img" src={defaultImage(1, partner.logo, partner.id)} />
                </ButtonBase>
              </div>

              <div className={classes.editbtn}>
                <Button variant="outlined" color="secondary" className={classes.changeimagebtn} onClick={() => { { this.handlePartnerCoverOpen(partner.id); } }}>Change Cover Image</Button>
                <Dialog
                  open={partner.id === opencoverimage}
                  onClose={() => { this.handlePartnerCoverClose(); }}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogTitle id="draggable-dialog-title">Change image (jpeg,png,svg)</DialogTitle>
                  <DialogContent>
                    <DialogContentText className={format === -1 ? classes.hidden : classes.show}>You can choose jpeg,png or svg </DialogContentText>
                    <DialogContentText className={imgsize === -1 ? classes.hidden : classes.show}> {imgSizeMessage}</DialogContentText>
                    <FileBase64
                      multiple
                      onDone={this.getFiles.bind(this)}
                    />
                    <img className={files[0] === undefined ? `${classes.imgopening} ${classes.hidden}` : `${classes.imgopening} ${classes.show}`} alt="example" src={files[0] === undefined ? 'https://d9np3dj86nsu2.cloudfront.net/image/be7672cb02ca220ce6cdce2a382da9f8' : files[0].base64} />
                  </DialogContent>
                  
                  <DialogActions  className={loading === true ? classes.hidden : `${classes.show} ${classes.buttoncontainer}`} >
                    <Button variant="contained" className={`${classes.button} ${classes.btnwhite}`} color="primary" onClick={() => { { this.handlePartnerCoverClose(); } }}>Cancel</Button>
                    <Button variant="contained" className={`${classes.button} ${classes.btnwhite}`} color="primary" onClick={() => { { this.uploadPartnerImage(2, partner.id); } }}>Save Cover image</Button>
                  </DialogActions>
                 
                    <div className={loading === false ? classes.hidden : `${classes.show} ${classes.loadingbtn}`}> 
                         <CircularProgress disableShrink color="primary" />
                         </div>
                </Dialog>
              </div>


              <div className={classes.editbtn}>
                <Button variant="outlined" color="secondary" className={classes.changeimagebtn} onClick={() => { { this.handlePartnerOpen(partner.id); } }}>Change Logo</Button>
                <Dialog
                  open={partner.id === openpartnerimage}
                  onClose={() => { this.handlePartnerClose(); }}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogTitle id="draggable-dialog-title">Change Logo (jpeg,png,svg)</DialogTitle>
                  <DialogContent>
                    <DialogContentText className={format === -1 ? classes.hidden : classes.show}>You can choose jpeg,png or svg </DialogContentText>
                    <DialogContentText className={imgsize === -1 ? classes.hidden : classes.show}>Image is too large, max size is 5mb</DialogContentText>
                    <FileBase64
                      multiple
                      onDone={this.getFiles.bind(this)}
                    />
                    <img className={files[0] === undefined ? `${classes.imgopening} ${classes.hidden}` : `${classes.imgopening} ${classes.show}`} alt="example" src={files[0] === undefined ? 'https://d9np3dj86nsu2.cloudfront.net/image/be7672cb02ca220ce6cdce2a382da9f8' : files[0].base64} />
                  </DialogContent>
                  <DialogActions  className={loading === true ? classes.hidden : `${classes.show} ${classes.buttoncontainer}`}>
                    <Button variant="contained" className={`${classes.button} ${classes.btnwhite}`} color="primary" onClick={() => { { this.handlePartnerClose(); } }}>Cancel</Button>
                    <Button variant="contained" className={`${classes.button} ${classes.btnwhite}`} color="primary" onClick={() => { { this.uploadPartnerImage(1, partner.id); } }}>Save Logo</Button>
                  </DialogActions>
                  <div className={loading === false ? classes.hidden : `${classes.show} ${classes.loadingbtn}`}> 
                         <CircularProgress disableShrink color="primary" />
                         </div>
                </Dialog>
              </div>


            </Grid>

            
            {partner.branch.map(branches => (
              <li key={branches.name} className={`${classes.buttons}`}>
                  <div  className={(branches.isActive===null || branches.isActive===true)? '' : classes.inactive}>
                  <CheckCircleOutlineIcon color='primary'/> 
                  </div>
                
                  
                <Link  as={`/menu/${branches.menuId}/${lang}/${partner.name}/${branches.name}`} href={`/menu?id=${branches.menuId}&lang=${lang}&branchname=${partner.name}&partnername=${branches.name}`}>
            
              
                    <Button variant="contained" className={`${classes.button} ${classes.buttonlink}`}>
                  
                    <Icon className={classes.icon}>place</Icon>
                    {branches.address}
                  </Button>
               
                </Link>
                <Link  as={`https://yandex.com/maps/?text=${branches.addressOnMap}&z=19`} href={`https://yandex.com/maps/?text=${branches.addressOnMap}&z=19`}>
                  <a className={classes.changecolor} target="_blank" rel="noopener noreferrer" title='map'>
                    <Icon className={classes.iconmap}>map</Icon>
                  </a>
                </Link>    
                <Link   href={`/menu/tables/${branches.id}/${lang}`}>
                  <a className={classes.partnerTable}  rel="noopener noreferrer" title='table'>
                    <Icon className={classes.iconmap}>table_chart</Icon>
                  </a>
               </Link>
              </li>
            )) }
          </ul>
        </Paper>
      </Grid>
    ));

    return (
      <div>

        <Grid container>
          <Sidebar  type={type}/>
          <Grid item className={classes.dashboard} xs={11}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item className={classes.buttonsignout}>
                <form autoComplete="off">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="demo-controlled-open-select">Lang</InputLabel>
                    <Select
                      open={open}
                      onClose={this.handleClose}
                      onOpen={this.handleOpen}
                      value={lang}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'lang',
                        id: 'demo-controlled-open-select',
                      }}
                    >
                      <MenuItem value={1}>Am</MenuItem>
                      <MenuItem value={2}>En</MenuItem>
                      <MenuItem value={3}>Ru</MenuItem>
                    </Select>
                  </FormControl>
                </form>
               
              </Grid>
            
              <Grid item className={classes.buttonsignout}>
              <Grid item className={classes.updateMenus}>
      
      {updateMenuActive===false ? (<Button variant="contained" component="span"   onClick={this.updateMenusClick} className={classes.button}>Update Menus</Button>): (<Button  variant="contained" component="span" color="primary" className={classes.button} disabled> updating menus...</Button> )}
   
    </Grid>
                <Button variant="contained" component="span" className={classes.button} onClick={this.signoutClick}>Sign Out</Button>
              </Grid>
            </Grid>


            <Grid container>
              {content}
            </Grid>

          </Grid>
        </Grid>

      </div>


    );
  }
}

export default withAuthSync(withStyles(styles)(Partnerlist));
