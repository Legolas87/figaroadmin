const styles = theme => ({
  dashboard: {
    padding: '30px',
    marginLeft: '8.333333%',
  },
  buttonsignout: {
    margin: '0 12px 20px 0',
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
  link: {
    display: 'flex',
    padding: '8px',
    fontSize: '27px',
    fontFamily: 'sans-serif',
    color: '#535252',
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

  titlecat: {
    display: 'flex',
    marginLeft: '10px',
    padding: '0 5px',
  },

  titlecatlink: {
    display: 'flex',
    padding: '8px',
    fontSize: '27px',
    fontFamily: 'sans-serif',
   color: '#2196f3',
  },

  hidden: {
    display: 'none',
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
  }

});



export default styles;
