// @flow

import React from 'react';
import {
  withStyles, Grid,
} from '@material-ui/core';
import nextCookie from 'next-cookies';
import OrderModel from '../models/OrderModel';
import OrderTable from '../components/Orders/OrderTable';
import Api from '../api';

type Props = {
    orders: Array<OrderModel>,
    classes: any
};


class Orders extends React.Component<Props> {
  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx);
    const orders = await Api.getOrders(token);

    return { orders };
  }


  render() {
    const { classes, orders } = this.props;


    return (
      <div>
        <Grid container>
          <Grid item xs={12}>

            <OrderTable data={orders} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Orders;
