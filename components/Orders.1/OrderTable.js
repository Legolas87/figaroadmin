// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
import DateUtil from '../../utils/DateUtil';

/* let id = 0;
function createData(userId, branchId, createDate, type, status, tobeDate, address, phoneNumber, orderItem) {
  id += 1;
  return {
    id, userId, branchId, createDate, type, status, tobeDate, address, phoneNumber, orderItem,
  };
}

const rows = [
  createData('Frozen', 159, 6.0, 24, 4.0, 55, 55, 555, 33),
  createData('Ice', 237, 9.0, 37, 4.3, 55, 55, 555, 33),
  createData('Cupcake', 305, 3.7, 67, 4.3, 55, 55, 555, 33),
  createData('Ging', 356, 16.0, 49, 3.9, 55, 55, 555, 33),
]; */


type Props = {
    classes: any,
    data:any,
}

function typeName(type) {
  let text;
  switch (type) {
    case 1:
      text = (
        <div>























Take away
          <i className="material-icons">directions_walk</i>
        </div>
      );
      break;
    case 2:
      text = (
        <div>
          {' '}























Delivery
          {' '}
          <i className="material-icons">airport_shuttle</i>
        </div>
      );
      break;
    case 3:
      text = (
        <div>























Table Reserve
          <i className="material-icons"> hot_tub</i>
        </div>
      );
      break;
    case 4:
      text = 'Order In Place';
      break;
    default:
      text = 'No Type';
  }
  return text;
}

function statusName(status) {
  let text;
  switch (status) {
    case 1:
      text = (
        <div>























Waiting
          <i className="material-icons"> access_time</i>
        </div>
      );
      break;
    case 2:
      text = 'Approved ';
      break;
    case 3:
      text = 'Rejected ';
      break;
    case 4:
      text = 'Delivered';
      break;
    default:
      text = 'No Status';
  }
  return text;
}


function FormatDate(tobeDate) {
  if (tobeDate) {
    return DateUtil.formatDate(tobeDate);
  }
}

const OrderTable = ({ classes, data } : Props) => (
<div>
  <h1 className={classes.ordertitle}>Segafredo-Աբովյան</h1>
  <Paper className={classes.root}>
   
    <Table className={classes.table}>
      <TableHead>
      <TableRow>
        <TableCell>User</TableCell>
        <TableCell align="right">Create Date</TableCell>
        <TableCell align="right">Type</TableCell>
        <TableCell align="right">Status</TableCell>
        <TableCell align="right">To Be Date</TableCell>
        <TableCell align="right">Address</TableCell>
        <TableCell align="right">Phone Number</TableCell>
        <TableCell align="right">Order Items</TableCell>
        <TableCell align="right">Change Status</TableCell>
      </TableRow>
    </TableHead>
      <TableBody>
      {data.map(row => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.userId}
          </TableCell>
          <TableCell align="right">

            {DateUtil.formatDate(row.createDate)}

          </TableCell>
          <TableCell align="right">{typeName(row.type)}</TableCell>
          <TableCell align="right">{statusName(row.status)}</TableCell>
          <TableCell align="right">

            {FormatDate(row.tobeDate)}
          </TableCell>
          <TableCell align="right">{row.address}</TableCell>
          <TableCell align="right">{row.phoneNumber}</TableCell>
          <TableCell align="right">
            {row.orderItem.map(item => (
              <ul key={item.menuItemId} className={classes.menuitems}>
                <li className={classes.menuitemsli}>








            Name:
<span className={classes.menuitemspan}>{item.menuItemName}</span>
                </li>
                <li className={classes.menuitemsli}>








            quantity:
                  <span className={classes.menuitemspan}>{item.quantity}</span>
                </li>
              </ul>
            ))}
          </TableCell>
          <TableCell align="right">

            <Button variant="contained" color="secondary" className={`${classes.reject} ${classes.button}`}>



    
Reject
              <DeleteIcon className={classes.rightIcon} />
            </Button>
            <Button variant="contained" color="primary" className={`${classes.approve} ${classes.button}`}>



    
Approve

</Button>

          </TableCell>

        </TableRow>
      ))}
    </TableBody>
    </Table>

  </Paper>
  </div>
);


export default (withStyles(styles)(OrderTable));
