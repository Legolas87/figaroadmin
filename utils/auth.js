import { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = async (response, nextPage) => {
  cookie.set('token', response.token, { expires: 10 });
  cookie.set('type', response.type, { expires: 10 });
  window.localStorage.setItem('language', 1);
  Router.push(nextPage);
};

export const logout = () => {
  cookie.remove('token');
  window.localStorage.removeItem('language');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/');
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

export const withAuthSync = WrappedComponent => class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps = WrappedComponent.getInitialProps
        && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
};

export const auth = (ctx) => {
  const { token } = nextCookie(ctx);

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return;
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/');
  }

  return token;
};
