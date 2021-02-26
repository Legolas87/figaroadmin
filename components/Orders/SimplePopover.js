import React from 'react';
import {
  Button, withStyles
} from '@material-ui/core';
import styles from './styles';



const SimplePopover = ({classes, orderItem, id, isOpen, handleClick}) => {
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPopover, setOpenPopover] = React.useState(null);

  // const handleClick = (event, clickableId) => {
  //   setAnchorEl(event.currentTarget);
  //   console.log(clickableId);
  //   setOpenPopover(clickableId);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
 // const id = open ? 'simple-popover' : undefined;
 const notEmptyOption = orderItem.filter(order => order.optionValues.length!==0);

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" className={classes.orderbtn}  onClick={(event) => handleClick(event, id)}>
          Items
      </Button>
    
       {isOpen===id &&  
         <table className={classes.order}>
           <tbody>
           <tr  className={classes.tabletr}>
          <th className={classes.tableth}>Name</th>
          <th className={classes.tableth}>Qty</th>
          <th className={classes.tableth}>Price</th>
          {notEmptyOption.length!==0 && <th className={classes.tablethOptionPrice}>Options</th>}
        </tr>
     { orderItem.map((menu) => (
          <tr key={menu.menuItemId}  className={classes.tabletr}>
          <td className={classes.menuitemspan}>{menu.menuItemName}</td>
          <td className={classes.menuitemspanquantity}>{menu.quantity}</td>
          <td className={classes.menuitemspanprice} >{menu.amount}</td>
          {notEmptyOption.length!==0  && <td  className={classes.tableth}>
          {menu.optionValues && menu.optionValues.length!==0 &&
          ( 
            <table className={classes.orderoption}>
            <tbody>
              <tr>
              {/* <th className={classes.tableth}>Option</th>
              <th className={classes.tableth}>Price</th> */}
            </tr>
               {menu.optionValues.map((option => (
                  <tr key={option.id}>
                  <td className={classes.orderoptionname}>{option.name}</td>
                 {option.price!==0 && <td className={classes.taableprice}>{option.price}</td>} 
                  </tr>
               )))
               }
               </tbody>
            </table>
              
            
           )
          }
           </td>}
         
        </tr>
      // <div  key={index}>

      // <Typography className={classes.typography}>
      //   {menu.menuItemName}
      
  
  
 

      //   <ul className={classes.menuitems}>
      //                     <li className={classes.menuitemsli}>
      //                       <span>Name:</span>
      //                       <span className={classes.menuitemspan}>{menu.menuItemName}</span>
      //                     </li>
      //                     <li className={classes.menuitemsli}>
      //                       <span>Quantity:</span>
      //                       <span className={classes.menuitemspanquantity}>{menu.quantity}</span>
      //                     </li>
      //                     <li className={classes.menuitemsli}>
      //                       <span>Price:</span>
      //                       <span className={classes.menuitemspanprice}>
      //                         {menu.amount}
            
      //                       </span>
      //                     </li>
      //                   </ul>
      //   </Typography>
  
      //                   </div>
                       
          ))}
          </tbody>
          </table>
       } 

    </div>
  );
}


export default (withStyles(styles)(SimplePopover));