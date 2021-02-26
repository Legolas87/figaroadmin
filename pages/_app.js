import React from 'react';
import App, { Container } from 'next/app';
import withGA from 'next-ga';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import Router from '../components/Router';
import { appWithTranslation } from '../config/i18n';
import getPageContext from '../config/getPageContext';
import { gaKey } from '../config/general';
//import 'react-image-crop/dist/ReactCrop.css';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Figaro</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="/static/styles.css" />
          <link rel="stylesheet" href="/static/react-draft-wysiwyg.css" />
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}

            <React.Fragment>
              <Component pageContext={this.pageContext} {...pageProps} />
            </React.Fragment>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withGA(gaKey, Router)(appWithTranslation(MyApp));
