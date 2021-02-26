// @flow

import React from 'react';
import {
  withStyles, Grid, Fab, Icon, Paper, Switch, Typography, Button, Checkbox,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CategoryModel from '../../models/CategoryModel';
import styles from './styles';

type Props = {
    classes: any,
    data: Array<CategoryModel>,
    onItemClick: any,
    editableCategoryId:number,

}

function visibleCatOnOff(status) {
  let text;
  switch (status) {
    case true:
      text = true;
      break;
    case null:
      text = false;
      break;
    case false:
      text = false;
      break;
    default:
      text = '';
  }
  return text;
}

function catPosition(status) {
  let text;
  switch (status) {
    case null:
      text = 0;
      break
    default:
      text = status;
  }
  return text;
}


const CategoryList = ({
  data, data2, positionId, handleChangePositionId, catNumberError, editableCategoryIdV, classes, handleEditV, onItemClick, catNameError, onEditClick, changeCatItemVisibility, handleChangeName, handleSave, editableCategoryId, checkedB, editableCatId, saveCategoryItemVisibility,
} : Props) => (data.map(category => (
  <Grid item md={6} lg={4} className={classes.categorylist} container key={category.id}>
    <Paper className={classes.paper}>
      <Grid container item className={category.id === editableCategoryId ? `${classes.hidden} ${classes.cat}` : `${classes.show} ${classes.cat}`}>
        <Grid item xs={10} className={classes.catname} onClick={() => { onItemClick(category); }}>
          <div>
            {category.name}
          </div>
        </Grid>
        <Grid item xs={2} onClick={() => { onEditClick(category.id); }}>
          <Fab color="secondary" aria-label="Edit" title="edit" className={classes.fab}>
            <Icon>edit_icon</Icon>
          </Fab>
        </Grid>

      </Grid>

      <Grid container className={category.id === editableCategoryId ? classes.show : classes.hidden}>
        <Grid item container xs={10} className={classes.catinput}>
          <input
            type="text"
            id="name"
            name="name"
            value={data2 === -1 ? category.name : data2}
            className={classes.inputfield}
            onChange={(event) => { handleChangeName(event); }}
          />
          <div className={catNameError === true ? classes.show2 : classes.hidden}>
                Category name can't be empty
          </div>

        </Grid>

        <Grid item xs={2} onClick={(event) => { handleSave(category.id); }}>
          <Fab color="primary" aria-label="Edit" title="save" className={classes.fab}>
            <SaveIcon className={`${classes.leftIcon} ${classes.iconSmall}`} />
          </Fab>
        </Grid>
      </Grid>
  <Grid container  className={category.id === editableCategoryIdV ? `${classes.hidden}` : `${classes.show}`}>
  <Typography  variant="subtitle2" className={`${classes.visible} ${classes.changecatback}  ${classes.positioncontainer}`}>  
        <Grid item xs={10} className= {`${classes.catinput} ${classes.show}`}>
             <Grid item xs={4} className={classes.catinput}>
              <span>position: <span  className={classes.catp}>{catPosition(category.positionId)}</span> </span>
              </Grid>
              <Grid item xs={4} className={ (category.isVisible === true) ? `${classes.catinput} ${classes.visiblecolor}` :  `${classes.catinput} ${classes.hiddencolor}` }>
             {(category.isVisible === true) ? 'visible' : 'hidden' }
             </Grid>
        </Grid>
        <Button variant="contained" color="secondary" className={`${classes.button} ${classes.changeimagebtn}`}  onClick={() => { handleEditV(category.id); }}>Edit</Button>
        </Typography>
      </Grid>

      <Grid container className={category.id === editableCategoryIdV ? classes.show : classes.hidden}>
        <Typography variant="subtitle2" className={`${classes.visible} ${classes.changecatback} ${classes.positioncontaineredit}`}>
            <Grid item xs={10} className= {`${classes.catinput} ${classes.show}`}>
                <Grid item xs={4} className={classes.catinput}>
                      <input
                      type="number"
                      min="0"
                      name={category.id}
                      value={( (category.id == editableCategoryIdV) && positionId!=-1 )? positionId : catPosition(category.positionId)}
                      className={classes.inputfield}
                      onChange={(event) => { handleChangePositionId(event); }}
                    />
                    
                  </Grid>
                  <Grid item xs={8} className={ (category.isVisible === true) ? `${classes.catinput} ${classes.visiblecolor}` :  `${classes.catinput} ${classes.hiddencolor}` }>
                  {(category.isVisible === true) ? 'visible' : 'hidden' }
            <Switch
              checked={(category.id == editableCatId) && checkedB!=-1 ? checkedB : visibleCatOnOff(category.isVisible)}
              onChange={changeCatItemVisibility(checkedB, category.id)}
              value="checkedB"
            />
                </Grid>
                <div className={catNumberError === true ? classes.show2 : classes.hidden}>
                      Position can't hold a negative Value 
                  </div>
            </Grid>
            
        
   

            <Button variant="contained" color="primary" className={`${classes.button} ${classes.changeimagebtn}`} onClick={() => { saveCategoryItemVisibility(category.id); }}>Save</Button>



        </Typography>

      </Grid>





    </Paper>

  </Grid>

)));


export default (withStyles(styles)(CategoryList));
