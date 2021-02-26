const styles = theme => ({
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

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  forclear: {
    clear: 'both',
    padding: '10px',
  },
  description: {
    margin: '10px',
  },
  visible: {
    color: 'grey',
  },
  show: {
    display: 'flex',
  },
  show2: {
    display: 'flex',
    color: 'red',
    padding: '10px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    position: 'absolute',
    bottom: '-27px',
    fontSize: '13px',
  },

  catinput: {
    position: 'relative',
  },

  changeimagebtn: {
    color: 'white',
  },

  hidden: {
    display: 'none',
  },
  catname: {
    padding: '18px',
  },
  inputfield: {
    width: '99%',
    height: '79%',
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

  changecat: {
    padding: '0px 10px 0 0',
  },

  changecatback: {
    background: '#eaf0f8',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  positioncontainer: {
    width: '100%',
    alignItems: 'center',
    padding: '6px',
    lineHeight: '1',
   
  },

  
  visiblecolor: {
    color: '#4caf50',
    fontStyle: 'italic',
    margin: '0 0px 0 2px',
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
  }

});

export default styles;
