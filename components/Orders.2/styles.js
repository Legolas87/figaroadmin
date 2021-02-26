const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',

  },
  table: {
    minWidth: '100%',
  },

  reject: {
    backgroundColor: '#e72222',
    margin: '10px 0px',
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
  },

  ordertitle: {
    color: 'green',
    fontSize: '31px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em',
    margin: '20px',
  },

  menuitemspan: {
    color: 'green',
    padding: '4px',
    fontWeight: '500',
  },
  menuitems: {
    padding: '0',
    listStyle: 'none',
  },

});

export default styles;
