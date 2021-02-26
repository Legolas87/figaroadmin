// @flow

import React, { Fragment } from 'react';
import {
  withStyles, Grid, Paper, ButtonBase, Typography, Button, Switch, TextField, Fab, Icon,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileBase64 from '../FileBase64/react-file-base64';
import styles from './styles';
import ItemModel from '../../models/ItemModel';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageCrop from '../ImageCrop'
import { func } from 'prop-types';
import IMG_BASE_URL from '../../utils/img';

type Props = {
  classes: any,
  data: Array<ItemModel>,
  contained: boolean;
  editableMenuItemId: number;
  imgId: number;

}


function visibleOnOff(status) {
  let text;
  switch (status) {
    case true:
      text = 'checkedB';
      break;
    case null:
      text = '';
      break;
    case false:
      text = '';
      break;
    default:
      text = '';
  }
  return text;
}

function optionsvisibleOnOff(status) {
  let text;
  switch (status) {
    case true:
      text = 'checkedOptions';
      break;
    case null:
      text = 'checkedOptions';
      break;
    case false:
      text = '';
      break;
    default:
      text = '';
  }
  return text;
}

function itemDescrition(desc) {
  let text;
  switch (desc) {
    case null:
      text = 'Write Description';
      break;
    case '':
      text = 'Write Description';
      break;
    default:
      text = desc;
  }
  return text;
}

function defaultImage(itemImageUrl) {
  const imagUrlConstant = `${IMG_BASE_URL}menu/getimage`;


  let text;

  if (itemImageUrl != null) {
    text = `${imagUrlConstant}/${itemImageUrl}`;
  } else {

    text = '/static/default.png';
  }


  return `${text}`;
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

function Preparation(PreparationTimeInMinutes) {
  let text;
  switch (PreparationTimeInMinutes) {
    case null:
      text = 0;
      break
    default:
      text = PreparationTimeInMinutes;
  }
  return text;
}




const MenuItem = ({
  data, classes, loading,
  imgsize, imgSizeMessage, format, nameError, closeMenuItemEdit,
  changeMenuItemName, handleClickOpen, handleClose, open, changeMenuItemDescription,
  saveMenuItemName, editableMenuItemId, saveMenuItemVisibility, getDilesFunction, fileimg,
  uploadImage, deleteImage, changeMenuItemVisibility,
  editableItemId, editMenuItemName, itemName, description, getImage,
  handleCrop, existingImgBase64, editableMenuId, handleEditMenuPositiօn, handleChangeMenuPositionId, menuPositionId, checkedA,
  openGroupDialod, handleGroupItemsOpen, handleGroupItemsClose, handleEdiOptionGroupName, editableGroupItemId,
  changeGroupName, changeGroupItemName, groupName, groupItemName, editableGroupNameId, handleEdiOptionGroupItem,
  saveGroupName, saveGroupItemName, disableCroping, handleChangePreparationTime, menuPreparationTime, checkedOptions, changeOptionItemVisibility
}: Props) => (
    data.map(item => (

      <Grid className={classes.forclear} key={item.MenuItemId}>

        <Paper className={classes.paper}>
          <Grid container>
            <Grid item sm={12} md={3} xs={12} className={classes.imgsquare}>
              <ButtonBase className={classes.image} onClick={() => { handleClickOpen(item.MenuItemId); }}>
                <img className={classes.img} alt="img" src={defaultImage(item.imageUrl)} />

              </ButtonBase>
              <div>
                <div className={classes.actions}>

                  <Button variant="outlined" color="secondary" className={classes.changeimagebtn} onClick={() => { handleClickOpen(item.MenuItemId); }}>Change Image</Button>

                </div>
                <Dialog
                  open={item.MenuItemId === open}
                  onClose={() => { handleClose(); }}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogTitle id="draggable-dialog-title">Change image (jpeg or png)</DialogTitle>
                  <DialogContent>
                    <DialogContentText className={format === -1 ? classes.hidden : classes.show}>You can choose jpeg or png</DialogContentText>
                    <DialogContentText className={imgsize === -1 ? classes.hidden : classes.show}> {imgSizeMessage}</DialogContentText>
                    <FileBase64
                      multiple
                      onDone={getDilesFunction}
                    />

                    {/* <img className={fileimg === null ? `${classes.imgopening} ${classes.hidden}` : `${classes.imgopening} ${classes.show} ${classes.showvisibility}`} alt="example" src={fileimg === null ? 'https://d9np3dj86nsu2.cloudfront.net/image/be7672cb02ca220ce6cdce2a382da9f8' : fileimg} /> */}
                    {/* {item.imageUrl && fileimg === null && <img className={classes.imgopening} alt="img" src={defaultImage(item.imageUrl)} /> } */}
                    {item.imageUrl && existingImgBase64 == null && fileimg == null && <img className={classes.imgopening} alt="example" src={defaultImage(item.imageUrl)} />}
                    <div className={classes.imgopening}>
                      {(item.imageUrl !== null || fileimg !== null) &&
                        <ImageCrop cropedImg={fileimg === null ? `data:image/jpeg;base64,${existingImgBase64}` : fileimg} handleCrop={(cropImgUrl) => handleCrop(cropImgUrl)} fileimg={fileimg} />
                      }
                    </div>


                  </DialogContent>
                  <DialogActions className={loading === true ? classes.hidden : `${classes.show} ${classes.buttoncontainer}`}>

                    <Button variant="contained" className={classes.button} color="primary" onClick={() => { handleClose(); }}>Cancel</Button>
                    {item.imageUrl && fileimg == null && <Button variant="contained" className={classes.button} disabled={disableCroping} color="primary" onClick={() => getImage(item.imageUrl)}>Crop image</Button>}
                    <Button variant="contained" className={classes.button} color="primary" onClick={() => { uploadImage(item.MenuItemId); }}>Save image</Button>
                    {item.imageUrl && fileimg === null && <Button variant="contained" className={`${classes.reject} ${classes.button}`} color="secondary" onClick={() => { deleteImage(item.MenuItemId); }}>  <DeleteIcon className={classes.rightIcon} /> Delete Image</Button>}
                  </DialogActions>
                  <div className={loading === false ? classes.hidden : `${classes.show} ${classes.loadingbtn}`}>
                    <CircularProgress disableShrink color="primary" />
                  </div>
                </Dialog>
              </div>
            </Grid>


            <Grid item xs={12} md={9} sm={12} container className={classes.description}>

              <Grid item xs={12} md={8} lg={9} sm={12} container>

                <Grid item xs container direction="column" className={item.MenuItemId === editableMenuItemId ? classes.hidden : classes.show}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {' '}
                      {item.name}
                      {' '}
                    </Typography>
                    <Typography gutterBottom>
                      {' '}
                      {item.description}
                    </Typography>

                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => { editMenuItemName(item.MenuItemId); }}>Edit</Button>
                  </Grid>


                </Grid>


                <Grid item xs container direction="column" className={item.MenuItemId === editableMenuItemId ? classes.show : classes.hidden}>
                  <TextField
                    id="outlined-name"
                    label=""
                    className={classes.textField}
                    value={itemName === -1 ? item.name : itemName}
                    variant="outlined"
                    onChange={(event) => { changeMenuItemName(event); }}
                  />
                  <div className={nameError === true ? classes.show2 : classes.hidden}>
                    Name can't be empty
              </div>
                  <TextField
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows="4"
                    value={description === -1 ? itemDescrition(item.description) : description}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => { changeMenuItemDescription(event); }}

                  />
                  <Grid item>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => { saveMenuItemName(item.MenuItemId); }}>Save</Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => { closeMenuItemEdit(); }}>Cancel</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={3} sm={12} container>

                <Grid container className={item.MenuItemId === editableMenuId ? `${classes.hidden}` : `${classes.show} ${classes.nopadding}`}>
                  <Typography variant="subtitle2" className={`${classes.visible} ${classes.changecatback}  ${classes.positioncontainer}`}>
                    <Grid item xs={12} className={`${classes.catinput} ${classes.show}`}>
                      <div className={classes.positions}>
                        <Grid item className={classes.catinput}>
                          <span>position: <span className={classes.catp}>{catPosition(item.positionId)}</span> </span>
                        </Grid>
                        <Grid item className={(item.isVisible === true) ? `${classes.catinput} ${classes.visiblecolor}` : `${classes.catinput} ${classes.hiddencolor}`}>
                          {(item.isVisible === true) ? 'visible' : 'hidden'}
                        </Grid>
                      </div>

                      <div className={classes.preparation}>
                        <span>preparation time: <span className={classes.catp}>{Preparation(item.preparationTimeInMinutes)}</span>
                        </span>

                      </div>
                      {item.groups && item.groups.length !== 0 && (
                        <div className={classes.preparation}>
                          <Grid item className={(item.optionsVisible === true || item.optionsVisible === null) ? `${classes.catinput} ${classes.visiblecolor}` : `${classes.catinput} ${classes.hiddencolor}`}>
                            {(item.optionsVisible === true || item.optionsVisible === null) ? 'options are visible' : 'options are hidden'}
                          </Grid>
                        </div>
                      )}
                    </Grid>
                    <Grid item className={`${classes.changepositionbtn}`} onClick={() => { handleEditMenuPositiօn(item.MenuItemId, item.positionId); }}>

                      <Fab color="secondary" aria-label="Edit" title="edit" className={classes.fab}>
                        <Icon>edit_icon</Icon>
                      </Fab>

                    </Grid>
                  </Typography>





                </Grid>




                <Grid container className={item.MenuItemId === editableMenuId ? `${classes.show} ${classes.nopadding}` : classes.hidden}>
                  <Typography variant="subtitle2" className={`${classes.visible} ${classes.changecatback} ${classes.positioncontaineredit}`}>
                    <div className={classes.menuSwitch}>
                      {(item.isVisible === true) ? 'visible' : 'hidden'}

                      <Switch
                        checked={(item.MenuItemId === editableItemId && checkedA != -1) ? checkedA : visibleOnOff(item.isVisible)}
                        onChange={changeMenuItemVisibility(checkedA, item.MenuItemId)}
                        value="checkedA"
                      />
                    </div>

                    <Grid item xs={12} className={classes.catinput}>
                      <label className={classes.catinputabs}>position
                      <input
                          type="number"
                          min="0"
                          name={item.MenuItemId}
                          value={((item.MenuItemId == editableMenuId) && menuPositionId != -1) ? menuPositionId : catPosition(item.positionId)}
                          className={classes.inputfield}
                          onChange={(event) => { handleChangeMenuPositionId(event); }}
                        />
                      </label>
                    </Grid>
                    <Grid item xs={12} className={classes.catinput}>
                      <label className={classes.catinputabs}>preparation time
                      <input
                          type="number"
                          min="0"
                          name={item.preparationTimeInMinutes}
                          value={((item.MenuItemId == editableMenuId) && menuPreparationTime != -1) ? menuPreparationTime : Preparation(item.preparationTimeInMinutes)}
                          className={classes.inputfield}
                          onChange={(event) => { handleChangePreparationTime(event); }}
                        />
                      </label>

                    </Grid>
                    {item.groups && item.groups.length !== 0 && (
                      <div>
                        <div className={classes.menuSwitch}>
                          {(item.optionsVisible === true || item.optionsVisible === null) ? 'Options are visible' : 'Options are hidden'}

                          <Switch
                            checked={(item.MenuItemId === editableItemId && checkedOptions != -1) ? checkedOptions : optionsvisibleOnOff(item.optionsVisible)}
                            onChange={changeOptionItemVisibility(checkedOptions, item.MenuItemId)}
                            value="checkedA"
                          />
                        </div>
                      </div>
                    )}
                    <Grid item className={`${classes.changepositionbtn}`}>
                      <Button variant="contained" color="primary" className={`${classes.button}`} onClick={() => { saveMenuItemVisibility(item.MenuItemId); }}>Save</Button>
                    </Grid>

                  </Typography>



                </Grid>


                {item.groups && item.groups.length !== 0 &&
                  (
                    <>
                      <div className={`${classes.optionbtn}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={`${classes.buttonopt}`}
                          onClick={() => { handleGroupItemsOpen(item.MenuItemId); }}>
                          Options
             </Button>
                      </div>
                      <Dialog
                        open={item.MenuItemId === openGroupDialod}
                        onClose={() => { handleGroupItemsClose(); }}
                        aria-labelledby="draggable-dialog-title"
                      >
                        <DialogTitle id="draggable-dialog-title">Options</DialogTitle>
                        <DialogContent>

                          {item.groups.map(group => {
                            return (
                              <div key={group.id} className={classes.group}>
                                <div>
                                  <DialogContentText>Option Name</DialogContentText>
                                  <div className={group.id === editableGroupNameId ? classes.hidden : `${classes.show} ${classes.showgroup}`}>
                                    <h3>{group.name}</h3>
                                    <div onClick={() => { handleEdiOptionGroupName(group.id); }}>
                                      <Fab color="secondary" aria-label="Edit" title="edit" className={classes.fab}>
                                        <Icon>edit_icon</Icon>
                                      </Fab>
                                    </div>
                                  </div>
                                  <div className={group.id === editableGroupNameId ? `${classes.show} ${classes.showgroupinput}` : classes.hidden}>
                                    <input
                                      id="group-name"
                                      label=""
                                      className={`${classes.textField} ${classes.textFieldgroup}`}
                                      value={groupName === -1 ? group.name : groupName}
                                      variant="outlined"
                                      onChange={(event) => { changeGroupName(event); }}
                                    />
                                    <div>
                                      <Button
                                        variant="contained"
                                        className={`${classes.button} ${classes.buttonsave}`}
                                        color="primary"
                                        onClick={() => { saveGroupName(group.id, groupName, group.name); }}
                                      >
                                        Save
                              </Button>
                                    </div>
                                  </div>



                                </div>
                                <DialogContentText>Option Items</DialogContentText>
                                {
                                  group.groupItems.map((groupItems) => {
                                    return (
                                      <div key={groupItems.id}>

                                        <div className={groupItems.id === editableGroupItemId ? classes.hidden : `${classes.show} ${classes.showgroupitem}`}>
                                          <div className={classes.groupitemsname}>{groupItems.name}</div>
                                          <div onClick={() => { handleEdiOptionGroupItem(groupItems.id); }}>
                                            <Fab color="secondary" aria-label="Edit" title="edit" className={classes.fab}>
                                              <Icon>edit_icon</Icon>
                                            </Fab>
                                          </div>
                                        </div>

                                        <div className={groupItems.id === editableGroupItemId ? `${classes.show} ${classes.showgroupiteminput}` : classes.hidden}>
                                          <input
                                            id="group-item"
                                            label=""
                                            className={`${classes.textField} ${classes.textFieldgroup}`}
                                            value={groupItemName === -1 ? groupItems.name : groupItemName}
                                            variant="outlined"
                                            onChange={(event) => { changeGroupItemName(event); }}
                                          />
                                          <div>
                                            <Button
                                              variant="contained"
                                              className={`${classes.button} ${classes.buttonsave}`}
                                              color="primary"
                                              onClick={() => { saveGroupItemName(groupItems.id, groupItemName, groupItems.name,); }}
                                            >
                                              Save
                                    </Button>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            )
                          })

                          }

                        </DialogContent>

                        <DialogActions className={loading === true ? classes.hidden : `${classes.show} ${classes.buttoncontainer}`}>
                          <Button variant="contained" className={classes.button} color="primary" onClick={() => { handleGroupItemsClose(); }}>Ok</Button>
                        </DialogActions>
                      </Dialog>

                    </>
                  )

                }
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>


    ))
  );


export default (withStyles(styles)(MenuItem));
