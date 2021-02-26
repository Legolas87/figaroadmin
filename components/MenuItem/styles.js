const styles = theme => ({
  body: {
    fontFamily: 'sans-serif',
  },
  cat: {
    padding: '0 10px 0 10px',
    boxShadow: '0px 5px 10px #c4bdbd',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 5px 10px #8a8989',
    },
    fontFamily: 'sans-serif',
    justifyContent: 'space-between',
  },

  fab: {
    margin: theme.spacing.unit,
    width: '38px',
    height: '38px',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  categorylist: {
    float: 'left',
    flexDirection: 'column',
    padding: '10px',
  },
  image: {
    width: '100%',
    padding: '0',
    margin: '0',
    border: '0',
    minHeight: '180px',
    background: 'rgb(243,243,243)',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '180px',
    objectFit: 'contain',
  },
  imgsquare: {
    maxWidth: '180px',
  },
  button: {
    cursor: 'pointer',
    margin: '0px 8px 0 0',
    color: 'white',
  },
  forclear: {
    clear: 'both',
    padding: '10px',
  },
  description: {
    padding: '10px',
  },
  visible: {
    color: 'grey',
  },
  dashboard: {
    padding: '30px',
  },
  show: {
    display: 'flex',
    padding: '0 15px 15px 15px',
  },
  show2: {
    display: 'flex',
    color: 'red',
    padding: '10px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },

  hidden: {
    display: 'none',
  },
  buttoncontainer: {
    padding: '0px 24px 12px',
  },
  imgopening: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '600px',
    objectFit: 'cover',
    padding: '15px 0 0 0',
    display: 'block',
  },
  changeimagebtn: {
    width: '100%',
  },
  errmess: {
    outline: '1px solid red',
  },
  loadingbtn: {
    padding: '0 35px 15px 15px',
    justifyContent: 'flex-end'
  },
  actions: {
    display: 'flex',
  },
  reject: {
    backgroundColor: '#e72222',
    margin: '0px 0px',
    color: '#fff',
    padding: '5px 7px',
    '&:hover': {
      backgroundColor: '#f73535',
    },
  },
  rightIcon: {

    marginTop: '-2px',
  },
  showvisibility: {
    display: 'none',
  },

  changecat: {
    padding: '0px 10px 0 0',
  },

  changecatback: {
    // background: '#eaf0f8',

  },

  positioncontainer: {
    width: '100%',
    alignItems: 'center',
    padding: '6px',
    lineHeight: '1',
    textAlign: 'end',
  },


  visiblecolor: {
    color: '#4caf50',
    fontStyle: 'italic',
    margin: '0 0px 0 2px',
  },

  inputfield: {
    width: '95px',
    height: '30px',
    border: '1px solid #d8d8d8',
    padding: '8px',
    margin: '2%',
    borderRadius: '8px',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      border: '1px solid #4caf50',
    },
  },

  hiddencolor: {
    fontStyle: 'italic',
  },

  catp: {
    lineHeight: '1',
    color: '#2196f3',
  },

  positioncontaineredit: {
    width: '100%',
    alignItems: 'center',
    padding: '0 6px',
    lineHeight: '1',
  },

  changepositionbtn: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menuSwitch: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  catinput: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '0 5px 0 0',
    marginBottom: '4px',
    flexDirection: 'column',
  },
  catinputabs: {
    width: '110px',
  },
  nopadding: {
    padding: '0',
  },
  optionbtn: {
    width: '100%',
    alignItems: 'flex-end',
    padding: '0 6px',
    lineHeight: '1',
    justifyContent: 'flex-end',
    display: 'flex',
    padding: '15px 4px 15px 15px',
  },
  buttonopt: {
    backgroundColor: '#546e7a',
    cursor: 'pointer',
    margin: '0px 8px 0 0',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2f393f',
    },
  },
  showgroupitem: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px 0px 0px',
  },
  showgroupiteminput: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px 0px 0px',
  },
  showgroup: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px 0px 0px',
    width: '100%',
  },
  showgroupinput: {
    fontFamily: 'sans-serif',
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px 0px 0px',
  },
  groupitemsname: {
    margin: '15px 0',
    width: '100%',
  },
  buttonsave: {
    margin: '15px 15px'
  },
  group: {
    borderBottom: '1px solid grey',
    marginBottom: '20px',
    paddingBottom: '20px',
    minWidth: '400px',
  },
  textFieldgroup: {
    width: '100%',
    padding: '9.5px 14px',
    borderRadius: '4px',
    outline: 'none',
    border: '1px solid grey',
  },
  positions: {
    display: 'flex',
  },
  preparation: {
    marginTop: '10px',
    display: 'flex',
  }
});

export default styles;
