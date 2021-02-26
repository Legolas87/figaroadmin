const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
  sidebar: {
    backgroundColor: '#546e7a',
    color: '#fff',
    boxShadow: '0 8px 17px 0 rgba(35,50,55,.22), 0 6px 20px 0 rgba(35,50,55,.21)',
    minHeight: '100%',
    position: 'fixed',
    minWidth: '8.333333%',
  },
  lists: {
    color: '#fff',
  },

  liststext: {
    color: '#fff',
    '& span': {
      color: '#fff',
    },
  },

  listsicon: {
    color: '#fff',
  },
  title: {
    backgroundColor: theme.palette.secondary.main,
    margin: '0 0 10px',
    fontWeight: '400',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    padding: '10px',
    textAlign: 'center',
  },
  dashboard: {
    padding: '30px',
  },
});

export default styles;
