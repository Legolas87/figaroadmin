import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Api from '../api';
import { login } from '../utils/auth';

type Props = {
  classes: any,
};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  show: {
    color: '#e70000',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },

  inputfield: {
    margin: '8px',
    width: '100%',
    padding: '6px',
    fontSize: '14px',
    borderRadius: '3px',
    border: '1px solid #bababa',
  },

  hidden: { display: 'none' },

  btnsize: {
    width: '100%',
  },

});


class SignIn extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '', password: '', error: '', loading: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value, error: '' });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value, error: '' });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    const { password } = this.state;


    const response = await Api.login(name, password);


    if (response.type === 0) {
      this.setState({ loading: false });
    } else {
      
      
    }

    if (response.type === 3) {
      login(response, '/orders');
    } else if (response.type === 2) {
      login(response, '/partnerlist');
    } else if (response.type === 1) { // super admin
      login(response, '/partnerlist');
    }else {
      const error = response.message;
      this.setState({ error });
    }
  }


  render() {
    const { classes } = this.props;
    const {
      error, name, password, loading,
    } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"> Sign in</Typography>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username*"
            value={name}
            className={classes.inputfield}
            onChange={this.handleChangeName}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password*"
            value={password}
            className={classes.inputfield}
            onChange={this.handleChangePassword}
          />
          <div className={loading === true ? classes.hidden : `${classes.show} ${classes.btnsize}`}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              {' '}


Sign in

            </Button>
          </div>
          <div className={loading === false ? classes.hidden : classes.show}>
            <CircularProgress disableShrink color="secondary" />
          </div>

          <p className={`${classes.error} ${error && classes.show}`}>
            {error && `Error: ${error}`}
          </p>
        </Paper>

      </main>

    );
  }
}


export default withStyles(styles)(SignIn);
