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
    backgroundColor: '#3fb553',
    margin: '5px 0px',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#319942',
    },
  },

  ordertitle: {
    color: '#3fb553',
    fontSize: '31px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    margin: '20px',
  },

  menuitemspan: {
    color: '#3fb553',
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
    color: '#3fb553',
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

});
