// @flow

import React from 'react';
import { Grid } from '@material-ui/core';
import nextCookie from 'next-cookies';
import ItemModel from '../models/ItemModel';
import CategoryModel from '../models/CategoryModel';
import Api from '../api';
import Router from '../components/Router';
import CategoryList from '../components/CategoryList/CategoryList';
import MenuItem from '../components/MenuItem/MenuItem';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard';
import { logout, withAuthSync } from '../utils/auth';


type Props = {
  items: Array<ItemModel>,
  categories: Array<CategoryModel>,
  query: any,
  path: string,
  token: any,
};


class Menu extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: -1,
      files: null,
      editableCategoryId: -1,
      editableCatId: -1,
      editableItemId: -1,
      editableMenuItemId: -1,
      categories: props.categories,
      items: props.items,
      checkedA: false,
      checkedB: false,
      checkedOptions: false,
      positionId: -1,
      menuPositionId: -1,
      menuPreparationTime: -1,
      itemName: -1,
      nameError: false,
      catNameError: false,
      catNumberError: false,
      description: -1,
      open: -1,
      imgId: -1,
      format: -1,
      loading: false,
      imgsize: -1,
      imgSizeMessage: '',
      editableCategoryIdV: -1,
      editableMenuIdV: -1,
      crop: { x: 0, y: 0 },
      aspect: 4 / 3,
      croppedAreaPixels: null,
      croppedImage: null,
      isCropping: false,
      existingImgBase64: null,
      openGroupDialod: -1,
      editableGroupItemId: -1,
      groupName: -1,
      groupItemName: -1,
      editableGroupNameId: -1,
      groupNameError: false,
      groupItemNameError: false,
      disableCroping: false,
    };
    this.handleSave = this.handleSave.bind(this);
  }


  static async getInitialProps(context) {
    const { token } = nextCookie(context);
    const { id, cat } = context.query;
    let { lang } = context.query;


    if (lang === '1') {
      lang = 'hy';
    } else if (lang === '2') {
      lang = 'en';
    } else if (lang === '3') {
      lang = 'ru';
    }

    const categoriesFromServer = await Api.getCategories(`${id}`, `${lang}`);

    let { categories } = categoriesFromServer;
    let items = [];
    if (cat) {
      const cats = cat.split(',');

      cats.forEach((e) => {

        const temp = categories.find(x => (x.id == e));
        if (temp.subCategories && temp.subCategories.length > 0) {
          categories = temp.subCategories;
        } else {
          categories = [];
          items = temp.screenMenuItems;
        }
      });
    }
    return {
      categories, items, query: context.query, path: context.pathname, token,
    };
  }


  // Callback~
  getFiles(files) {
    this.setState({ files: files[0].base64, imgsize: -1, format: -1 });
  }


  menuSignoutBtn = () => {
    logout();
  }


  /* visibility */

  changeMenuItemVisibility = (checkedA, itemId) => (event) => {

    this.setState({ editableItemId: itemId, checkedA: event.target.checked });
  };

  changeOptionItemVisibility = (checkedOptions, itemId) => (event) => {

    this.setState({ editableItemId: itemId, checkedOptions: event.target.checked });
  };



  changeCatItemVisibility = (checkedB, itemId) => (event) => {

    this.setState({ editableCatId: itemId, checkedB: event.target.checked });
  };


  handleClickOpen = (menuItemId) => {
    this.setState({ open: menuItemId, files: null, format: -1, imgsize: -1, disableCroping: false });
  };

  handleClose = () => {
    this.setState({ open: -1, format: -1, imgsize: -1, existingImgBase64: null });
  };


  /* change menu item  */
  editMenuItemName = (menuItemId) => {
    this.setState({ editableMenuItemId: menuItemId, itemName: -1, description: -1 });
  }

  /* category name change functions */




  handleEdit = (categoryId) => {
    this.setState({ editableCategoryId: categoryId, name: -1 });
  }

  handleEditV = (categoryId) => {
    this.setState({ editableCategoryIdV: categoryId, positionId: -1, checkedB: -1 });
  }

  handleEditMenuPositiօn = (menuItemId, menuItemPositionId) => {
    this.setState({ editableMenuIdV: menuItemId, menuPositionId: -1, checkedA: -1 });
  }



  closeMenuItemEdit = () => {
    this.setState({ editableMenuItemId: -1 });
  };

  changeMenuItemName(event) {
    this.setState({ itemName: event.target.value, nameError: false });
  }

  changeMenuItemDescription(event) {
    this.setState({ description: event.target.value });
  }


  handleChange(event) {
    this.setState({ name: event.target.value, catNameError: false });
  }

  handleChangePositionId(event) {
    this.setState({ positionId: event.target.value, catNumberError: false });
    /*  this.setState({ editableCategoryIdV: event.target.name });*/

  }

  handleChangeMenuPositionId(event) {
    this.setState({ menuPositionId: event.target.value });
  }

  handleChangePreparationTime = (event) => {
    this.setState({ menuPreparationTime: event.target.value });
  }


  async handleSave(categoryId) {
    const { query, token } = this.props;
    const { id, lang, cat } = query;
    const { categories, name } = this.state;
    let langId;
    if (lang === '1') {
      langId = 'hy';
    } else if (lang === '2') {
      langId = 'en';
    } else if (lang === '3') {
      langId = 'ru';
    }
    const menuId = id;


    try {
      if (name !== -1 && name !== '') {
        let res = await Api.changeCategory(menuId, categoryId, langId, name, token);
        if (res.isSuccess === true) {
          const categoriesFromServer = await Api.getCategories(id, langId);
          let categoriesnew = categoriesFromServer.categories;
          if (cat) {
            const cats = cat.split(',');
            cats.forEach((e) => {
              const temp = categoriesnew.find(x => (x.id == e));
              if (temp.subCategories && temp.subCategories.length > 0) {
                categoriesnew = temp.subCategories;
              }
              else {
                categoriesnew = [];
                itemsnew = temp.screenMenuItems;
              }
            });
          }
          this.setState({
            categories: categoriesnew
          });

          this.setState({ editableCategoryId: -1, catNameError: false });
        }
      }
      if (name == '') {
        this.setState({ catNameError: true });
      } else {
        this.setState({ editableCategoryId: -1, catNameError: false });
      }

    } catch (e) {
    }
  }

  async getImage(imgName) {
    const { token } = this.props;
    const { disableCroping } = this.state;
    const imagebase64 = await Api.getimageBase64(imgName, token)

    this.setState({ existingImgBase64: imagebase64, disableCroping: !disableCroping });
  }

  async saveMenuItemName(menuItemId) {
    const { query, token } = this.props;
    const { id, lang, cat } = query;
    const { items, itemName, description } = this.state;
    let langId;
    if (lang === '1') {
      langId = 'hy';
    } else if (lang === '2') {
      langId = 'en';
    } else if (lang === '3') {
      langId = 'ru';
    }
    const menuId = id;
    let name2;
    let description2;

    if (itemName === -1) {
      name2 = items.filter(item => item.MenuItemId === menuItemId)[0].name;
    } else {
      name2 = itemName;
    }

    if (description === -1) {
      if (items.filter(item => item.MenuItemId === menuItemId)[0].description == null) {
        description2 = '';
      } else {
        description2 = items.filter(item => item.MenuItemId === menuItemId)[0].description;
      }
    } else {
      description2 = description;
    }

    try {
      if (name2 != '') {
        const res = await Api.changeMenuItemName(menuId, menuItemId, langId, name2, description2, token);
        if (res.isSuccess === true) {
          const categoriesFromServer = await Api.getCategories(id, langId);
          let categoriesnew = categoriesFromServer.categories;
          let itemsnew = [];
          if (cat) {
            const cats = cat.split(',');
            cats.forEach((e) => {

              const temp = categoriesnew.find(x => (x.id == e));

              if (temp.subCategories && temp.subCategories.length > 0) {

                categoriesnew = temp.subCategories;
              } else {
                categoriesnew = [];
                itemsnew = temp.screenMenuItems;

              }
            });

          }
          this.setState({
            items: itemsnew, itemName: -1, description: -1,
          });

          this.setState({
            editableMenuItemId: -1,
          });
        }
      }
      else {
        this.setState({
          nameError: true,
        });
      }
    } catch (e) {
    }
  }


  async saveMenuItemVisibility(menuItemId) {
    const { query, token } = this.props;
    const { id, cat, lang } = query;
    const { items, checkedA, checkedOptions, menuPositionId, menuPreparationTime } = this.state;
    const menuId = id;
    const image = '';
    let langId;
    if (lang === '1') {
      langId = 'hy';
    } else if (lang === '2') {
      langId = 'en';
    } else if (lang === '3') {
      langId = 'ru';
    }

    let menuPositionId2;
    let menuPreparationTime2;

    if (menuPositionId === -1) {
      menuPositionId2 = items.filter(item => item.MenuItemId === menuItemId)[0].positionId;

    } else {
      menuPositionId2 = menuPositionId;
    }

    if (menuPreparationTime === -1) {
      menuPreparationTime2 = items.filter(item => item.MenuItemId === menuItemId)[0].preparationTimeInMinutes;

    } else {
      menuPreparationTime2 = menuPreparationTime;
    }

    try {

      if ((menuPositionId2 >= 0 || menuPositionId == null) && (menuPreparationTime2 >= 0 || menuPreparationTime2 == null)) {
        await Api.changeMenuItem(menuId, menuItemId, image, checkedA, checkedOptions, menuPositionId2, menuPreparationTime2, token);

        const categoriesFromServer = await Api.getCategories(id, langId);
        let categoriesnew = categoriesFromServer.categories;
        let itemsnew = [];
        const cats = cat.split(',');
        cats.forEach((e) => {
          const temp = categoriesnew.find(x => (x.id == e));
          if (temp.subCategories && temp.subCategories.length > 0) {
            categoriesnew = temp.subCategories;
          }
          else {
            categoriesnew = [];
            itemsnew = temp.screenMenuItems;
          }
        });
        this.setState({ items: itemsnew, editableMenuIdV: -1, menuPositionId: -1 });
      }
    } catch (e) {
    }
  }

  async saveCategoryItemVisibility(categoryId) {
    const { query, token } = this.props;
    const { id, cat, lang } = query;
    const { categories, checkedB, positionId } = this.state;
    const menuId = id;
    let langId;
    if (lang === '1') {
      langId = 'hy';
    } else if (lang === '2') {
      langId = 'en';
    } else if (lang === '3') {
      langId = 'ru';
    }

    let positionId2;


    if (positionId === -1) {
      positionId2 = categories.filter(category => category.id === categoryId)[0].positionId;

    } else {
      positionId2 = positionId;
    }

    /* 
       console.log(checkedB)*/
    /*if (checkedB === -1) {
      if (categories.filter(category => category.MenuItemId === menuItemId)[0].description == null) {
        description2 = '';
      } else {
        description2 = items.filter(item => item.MenuItemId === menuItemId)[0].description;
      }
    } else {
      description2 = description;
    }*/


    try {
      //  if (positionId!='') {
      if (positionId2 >= 0 || positionId == null) {
        await Api.ChangeCategory(menuId, categoryId, checkedB, positionId2, token);

        const categoriesFromServer = await Api.getCategories(id, langId);
        let categoriesnew = categoriesFromServer.categories;
        let itemsnew = [];

        if (cat) {
          const cats = cat.split(',');
          cats.forEach((e) => {
            const temp = categoriesnew.find(x => (x.id == e));

            if (temp.subCategories && temp.subCategories.length > 0) {
              categoriesnew = temp.subCategories;

            }
            else {
              categoriesnew = [];
              itemsnew = temp.screenMenuItems;
            }
          });
        }

        this.setState({ categories: categoriesnew, editableCategoryIdV: -1, catNumberError: false, positionId: -1 });
      }
      else {
        this.setState({ catNumberError: true });
      }
      //  }
      /*   if (positionId == '') {
             this.setState({ catNumberError: true });
         } else {
              this.setState({ editableCategoryIdV: -1, catNumberError: false });
         }   */
    } catch (e) {
    }
  }

  async uploadImage(menuItemId) {

    const { query, token } = this.props;
    const { id } = query;
    const {
      items, files, imgId, format, croppedImage
    } = this.state;
    const menuId = id;
    if (files !== null) {
      const hdnImage = files;
      const imagearr = hdnImage.split(',');
      const picture = imagearr[1];
      const pictureFormat1 = imagearr[0];
      const pictureFormat2 = pictureFormat1.split('/')[1].split(';');
      const pictureFormat = pictureFormat2[0];

      try {
        if (pictureFormat === 'jpeg' || pictureFormat === 'png') {
          this.setState({ loading: true });
          const res = await Api.uploadimage(menuId, menuItemId, picture, pictureFormat, token);
          if (res.isSuccess) {
            this.setState({
              open: -1
            });
            items.filter(item => item.MenuItemId === menuItemId)[0].imageUrl = res.generatedFileName;
            this.setState({
              items, imgId: menuItemId, files: null, loading: false, existingImgBase64: null
            });
          }
          else {
            this.setState({ files: null, imgsize: 0, imgSizeMessage: res.message, loading: false, existingImgBase64: null });
          }
        }
        else {
          this.setState({ files: null, format: 0, loading: false, existingImgBase64: null });
        }
      } catch (e) {

      }
    }
  }

  async deleteImage(menuItemId) {
    const { query, token } = this.props;
    const { id } = query;
    const {
      items
    } = this.state;
    const menuId = id;

    try {
      const res = await Api.deleteImage(menuId, menuItemId, token);

      if (res.isSuccess) {

        items.filter(item => item.MenuItemId === menuItemId)[0].imageUrl = res.generatedFileName;
        this.setState({
          open: -1, items, imgId: menuItemId, files: null, existingImgBase64: null
        });
      }
    } catch (e) {

    }

  }


  changeUrl(catId) {
    const { query, path } = this.props;
    const { id, lang, cat, partnername, branchname } = query;
    let newCat;
    if (cat) {
      newCat = `${cat},${catId.id}`;
    } else {
      newCat = catId.id;
    }
    let catIdName = catId.name.split('/').join('*');
    Router.push(`${path}/${id}/${lang}/${branchname}/${partnername}/${catIdName}/${newCat}`);
  }

  handleCrop = (cropImgUrl) => {
    this.setState({ files: cropImgUrl });
  }

  handleGroupItemsOpen = (menuItemId) => {
    this.setState({ openGroupDialod: menuItemId });
  };

  handleGroupItemsClose = () => {
    this.setState({ openGroupDialod: -1, editableGroupItemId: -1, editableGroupNameId: -1, groupName: -1, groupItemName: -1, });
  };

  handleEdiOptionGroupName = (groupNameId) => {
    this.setState({ editableGroupNameId: groupNameId, groupName: -1 });
  }

  handleEdiOptionGroupItem = (grouItemId) => {
    this.setState({ editableGroupItemId: grouItemId, groupItemName: -1 });
  }

  changeGroupName = (event) => {
    this.setState({ groupName: event.target.value });
  }

  changeGroupItemName = (event) => {
    this.setState({ groupItemName: event.target.value });
  }


  saveGroupName = async (groupNameId, groupName, groupStartName) => {
    const { query, token } = this.props;
    const { id, lang, cat } = query;
    let langId;
    if (lang === '1') {
      langId = 'hy';
    } else if (lang === '2') {
      langId = 'en';
    } else if (lang === '3') {
      langId = 'ru';
    }
    const menuId = id;
    let name = groupName;

    if (groupName === -1) {
      name = groupStartName;
    }


    try {
      if (name != '') {
        const res = await Api.ChangeOptionGroupName(menuId, groupNameId, langId, name, token);
        if (res.isSuccess === true) {

          const categoriesFromServer = await Api.getCategories(id, langId);
          let categoriesnew = categoriesFromServer.categories;
          let itemsnew = [];
          if (cat) {
            const cats = cat.split(',');
            cats.forEach((e) => {

              const temp = categoriesnew.find(x => (x.id == e));

              if (temp.subCategories && temp.subCategories.length > 0) {

                categoriesnew = temp.subCategories;
              } else {
                categoriesnew = [];
                itemsnew = temp.screenMenuItems;

              }
            });

          }
          this.setState({ items: itemsnew, editableGroupNameId: -1, groupName: -1 });
        }
      }
      else {
        this.setState({
          groupNameError: true,
        });
      }
    } catch (e) {
    }
  }


  saveGroupItemName = async (groupItemNameId, groupItemName, groupItemStartName) => {
    const { query, token } = this.props;
    const { id, lang, cat } = query;
    let langId;
    if (lang === '1') {
      langId = 'hy';
    } else if (lang === '2') {
      langId = 'en';
    } else if (lang === '3') {
      langId = 'ru';
    }
    const menuId = id;
    let name = groupItemName;

    if (groupItemName === -1) {
      name = groupItemStartName;
    }



    try {
      if (name != '') {
        const res = await Api.ChangeOptionGroupItemName(menuId, groupItemNameId, langId, name, token);
        if (res.isSuccess === true) {

          const categoriesFromServer = await Api.getCategories(id, langId);
          let categoriesnew = categoriesFromServer.categories;
          let itemsnew = [];
          if (cat) {
            const cats = cat.split(',');
            cats.forEach((e) => {

              const temp = categoriesnew.find(x => (x.id == e));

              if (temp.subCategories && temp.subCategories.length > 0) {

                categoriesnew = temp.subCategories;
              } else {
                categoriesnew = [];
                itemsnew = temp.screenMenuItems;

              }
            });

          }
          this.setState({ items: itemsnew, editableGroupItemId: -1, groupItemName: -1 });
        }
      }
      else {
        this.setState({
          groupNameError: true,
        });
      }
    } catch (e) {
    }
  }


  render() {
    const { query, path } = this.props;
    const {
      name, format, existingImgBase64, editableCategoryIdV, editableMenuIdV,
      menuPositionId, catNumberError, positionId, loading, imgsize,
      imgSizeMessage, nameError, catNameError, imgId, open, files,
      editableCategoryId, categories, items, checkedA, checkedB, editableItemId,
      editableMenuItemId, itemName, description, editableCatId,
      openGroupDialod, editableGroupItemId, groupName, groupItemName,
      editableGroupNameId, disableCroping, menuPreparationTime, checkedOptions
    } = this.state;
    let content = <div />;
    if (categories && categories.length > 0) {
      content = (
        <CategoryList
          catNumberError={catNumberError}
          editableCategoryIdV={editableCategoryIdV}
          data={categories} catNameError={catNameError}
          editableCategoryId={editableCategoryId}
          data2={name} onItemClick={(category) => { this.changeUrl(category); }}
          editableCatId={editableCatId}
          onEditClick={this.handleEdit}
          handleEditV={this.handleEditV}
          handleChangePositionId={(event) => { this.handleChangePositionId(event); }}
          handleChangeName={(event) => { this.handleChange(event); }}
          handleSave={(categoryId) => { this.handleSave(categoryId); }}
          saveCategoryItemVisibility={(categoryId) => { this.saveCategoryItemVisibility(categoryId); }}
          changeCatItemVisibility={this.changeCatItemVisibility}
          checkedB={checkedB}
          positionId={positionId}

        />
      );
    } else if (items && items.length > 0) {
      content = (
        <MenuItem
          editableMenuId={editableMenuIdV}
          checkedA={checkedA}
          menuPositionId={menuPositionId}
          handleEditMenuPositiօn={this.handleEditMenuPositiօn}
          handleChangePreparationTime={(event) => { this.handleChangePreparationTime(event); }}
          menuPreparationTime={menuPreparationTime}
          handleChangeMenuPositionId={(event) => { this.handleChangeMenuPositionId(event); }}
          existingImgBase64={existingImgBase64}
          getImage={(imgName) => this.getImage(imgName)}
          handleCrop={(cropImgUrl) => this.handleCrop(cropImgUrl)}
          data={items} loading={loading}
          imgsize={imgsize} imgSizeMessage={imgSizeMessage}
          format={format}
          nameError={nameError}
          imgId={imgId}
          query={query}
          open={open}
          itemName={itemName}
          description={description}
          editableItemId={editableItemId}
          editableMenuItemId={editableMenuItemId}
          editMenuItemName={this.editMenuItemName}
          changeMenuItemName={(event) => { this.changeMenuItemName(event); }}
          changeMenuItemDescription={(event) => { this.changeMenuItemDescription(event); }}
          saveMenuItemName={(event, menuItemId) => { this.saveMenuItemName(event, menuItemId); }}
          saveMenuItemVisibility={(menuItemId) => { this.saveMenuItemVisibility(menuItemId); }}
          handleChangeItemVisibility={(event) => { this.handleChangeItemVisibility(event); }}
          changeOptionItemVisibility={this.changeOptionItemVisibility}
          getDilesFunction={this.getFiles.bind(this)}
          fileimg={files} uploadImage={(event) => { this.uploadImage(event); }}
          deleteImage={(event) => { this.deleteImage(event); }}
          changeMenuItemVisibility={this.changeMenuItemVisibility}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose} closeMenuItemEdit={this.closeMenuItemEdit}
          handleGroupItemsOpen={this.handleGroupItemsOpen}
          openGroupDialod={openGroupDialod}
          handleGroupItemsClose={this.handleGroupItemsClose}
          handleEdiOptionGroupName={this.handleEdiOptionGroupName}
          handleEdiOptionGroupItem={this.handleEdiOptionGroupItem}
          editableGroupItemId={editableGroupItemId}
          editableGroupNameId={editableGroupNameId}
          groupName={groupName}
          groupItemName={groupItemName}
          changeGroupName={(event) => this.changeGroupName(event)}
          changeGroupItemName={(event) => this.changeGroupItemName(event)}
          saveGroupName={this.saveGroupName}
          saveGroupItemName={this.saveGroupItemName}
          disableCroping={disableCroping}
          checkedOptions={checkedOptions}
        />
      );
    }
    return (
      <div>

        <Grid container>
          <Sidebar />
          <Dashboard data={content} partnername={query} path={path} menuSignoutBtn={this.menuSignoutBtn} />
        </Grid>

      </div>
    );
  }
}


export default withAuthSync(Menu);
