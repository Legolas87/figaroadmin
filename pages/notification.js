import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, CssBaseline, withStyles, Grid, Button,
} from '@material-ui/core';
import nextCookie from 'next-cookies';
import Api from '../api';
import Sidebar from '../components/Sidebar/Sidebar';
import { logout, withAuthSync } from '../utils/auth';
import { EditorState, convertToRaw } from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';'
import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
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
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
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
    padding: '15px',
    fontSize: '16px',
    borderRadius: '3px',
    border: '1px solid #bababa',
  },

  dashboard: {
    padding: '0 30px',
    marginLeft: '8.333333%',
  },

  buttonsignout: {
    margin: '20px',
  },

  textareasize: {
    resize: 'vertical',
    minHeight: '300px',
    margin: '8px',
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '3px',
    border: '1px solid #bababa',
    fontFamily: 'sans-serif',
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

  show: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },

  error: {
    color: '#e70000',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
  },

  success: {
    color: '#40b245',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
  },

});


class Notification extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      title: '', description: EditorState.createEmpty(), error: false, success: false,
      editorState: EditorState.createEmpty(),
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static async getInitialProps(ctx) {
    const {  type } = nextCookie(ctx);
    return {
      type
    };
  }

  signoutClick = () => {
    logout();
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value, error: false });
  }


  handleChangeTitle(event) {
    this.setState({ title: event.target.value, error: false });
  }


  async handleSubmit(context) {
    event.preventDefault();
    const { token } = nextCookie(context);

    const { title, description } = this.state;
     let descHtml = draftToHtml(convertToRaw(description.getCurrentContent()));
    try {
      if (title != '' && draftToHtml(convertToRaw(description.getCurrentContent())) !== draftToHtml(convertToRaw(EditorState.createEmpty().getCurrentContent()))) {
      
        let r = confirm("Message will be sent to all users, are you sure?");
        if (r == true) {
       const response = await Api.SendNotificationToAll(title, descHtml, token);
    
        if (response.isSuccess == true) {
          this.setState({ description: EditorState.createEmpty(), title: '' });
          setTimeout(() => this.setState({ success: true }), 0);
          setTimeout(() => this.setState({ success: false }), 2000);
        }
      }
      } else {
        this.setState({ error: true });
      }
    } catch (e) { }
  }

  onEditorStateChange = (editorState) => {
    // this.setState({
    //   editorState,
    // });
    this.setState({ description: editorState, error: false });
  };


  render() {
    const { classes, type } = this.props;
    const {
      error, title, description, success,editorState
    } = this.state;

    return (

      <div>

        <Grid container>
          <Sidebar type={type} />
          <Grid className={classes.dashboard} item xs={11}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <h1 className={classes.ordertitle}>CREATE NEWS</h1>
                </Grid>
                <Grid item className={classes.buttonsignout}>
                  <Button variant="contained" component="span" className={classes.button} onClick={this.signoutClick}>Sign Out</Button>
                </Grid>
              </Grid>
              <div>

                <main className={classes.main}>
                  <CssBaseline />
                  <Paper className={classes.paper}>

    

                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title*"
                      value={title}
                      className={classes.inputfield}
                      onChange={this.handleChangeTitle}
                    />

                    {/* <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Description*"
                      value={description}
                      className={classes.textareasize}
                      onChange={this.handleChangeDescription}
                    /> */}
                   <div>
                    <Editor
                      editorState={description}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onEditorStateChange}
                    />
                   </div>

                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      onClick={this.handleSubmit}
                    >
                      <span> Send  </span>
                    </Button>

                    <p className={error === true ? `${classes.show} ${classes.error}` : classes.hidden}>
            Title or description is empty.
                    </p>
                    <p className={success === true ? `${classes.show} ${classes.success}` : classes.hidden}>
                Your News is successfully sent.
                    </p>
                  </Paper>

                </main>

              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>


    );
  }
}


export default withAuthSync(withStyles(styles)(Notification));
