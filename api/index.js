// @flow

import RealApi from './realApi';
import LocalApi from './localApi';

const ApiModes = {
  LOCAL: 1,
  REAL: 2,
};

class Api {
  static apiMode = ApiModes.REAL;

  static async getPartners(lang, token: string) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getPartners(lang, token);
    }
    return LocalApi.getPartners(lang, token);
  }

  static async GetAllFeedback(token: string) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.GetAllFeedback(token);
    }
    return LocalApi.GetAllFeedback(token);
  }


  static async getCategories(id, lang) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getCategories(id, lang);
    }
    return LocalApi.getCategories(id, lang);
  }


  static async updateMenus(token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.updateMenus(token);
    }
    return LocalApi.updateMenus(token);
  }


  static async getTables(id, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getTables(id, token);
    }
    return LocalApi.getTables(id, token);
  }

  static async GetQrCodeImages(id, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.GetQrCodeImages(id, token);
    }
    return LocalApi.GetQrCodeImages(id, token);
  }



  static async getOrders(token: string) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getOrders(token);
    }
    return LocalApi.getOrders();
  }

  static async getAllOrders(token: string) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getAllOrders(token);
    }
    return LocalApi.getAllOrders();
  }

  static async getPays(token: string) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getPays(token);
    }
    return LocalApi.getPays();
  }

  static async login(name, password) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.login(name, password);
    }
    return LocalApi.login(name, password);
  }

  static async SendNotificationToAll(title, description, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.SendNotificationToAll(title, description, token);
    }
    return LocalApi.SendNotificationToAll(title, description, token);
  }


  static async changeCategory(menuId, categoryId, langId, name, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.changeCategory(menuId, categoryId, langId, name, token);
    }
    return LocalApi.changeCategory(menuId, categoryId, langId, name, token);
  }

  static async changeMenuItemName(menuId, menuItemId, langId, name, description, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.changeMenuItemName(menuId, menuItemId, langId, name, description, token);
    }
    return LocalApi.changeMenuItemName(menuId, menuItemId, langId, name, description, token);
  }

  static async ChangeOptionGroupName(menuId, optionId, langId, name, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.ChangeOptionGroupName(menuId, optionId, langId, name, token);
    }
    return LocalApi.ChangeOptionGroupName(menuId, optionId, langId, name, token);
  }

  static async ChangeOptionGroupItemName(menuId, optionItemId, langId, name, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.ChangeOptionGroupItemName(menuId, optionItemId, langId, name, token);
    }
    return LocalApi.ChangeOptionGroupItemName(menuId, optionItemId, langId, name, token);
  }

  static async changeMenuItem(menuId, menuItemId, image, isVisible, optionsVisible, positionId, preparationTimeInMinutes, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.changeMenuItem(menuId, menuItemId, image, isVisible, optionsVisible, positionId, preparationTimeInMinutes, token);
    }
    return LocalApi.changeMenuItem(menuId, menuItemId, image, isVisible, optionsVisible, positionId, preparationTimeInMinutes, token);
  }

  static async ChangeCategory(menuId, categoryId, isVisible, positionId, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.ChangeCategory(menuId, categoryId, isVisible, positionId, token);
    }
    return LocalApi.ChangeCategory(menuId, categoryId, isVisible, positionId, token);
  }

  static async uploadimage(menuId, menuItemId, picture, pictureFormat, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.uploadimage(menuId, menuItemId, picture, pictureFormat, token);
    }
    return LocalApi.uploadimage(menuId, menuItemId, picture, pictureFormat, token);
  }

  static async deleteImage(menuId, menuItemId, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.deleteImage(menuId, menuItemId, token);
    }
    return LocalApi.deleteImage(menuId, menuItemId, token);
  }



  static async UploadPartnerImage(partnerId, type, picture, pictureFormat, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.UploadPartnerImage(partnerId, type, picture, pictureFormat, token);
    }
    return LocalApi.UploadPartnerImage(partnerId, type, picture, pictureFormat, token);
  }

  static async getimage(menuId, menuItemId, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getimage(menuId, menuItemId, token);
    }
    return LocalApi.getimage(menuId, menuItemId, token);
  }

  static async getimageBase64(imgName, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.getimageBase64(imgName, token);
    }
    return LocalApi.getimageBase64(imgName, token);
  }


  static async reject(orderId, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.reject(orderId, token);
    }
    return LocalApi.reject(orderId, token);
  }

  static async approve(orderId, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.approve(orderId, token);
    }
    return LocalApi.approve(orderId, token);
  }

  static async delivered(orderId, token) {
    if (Api.apiMode === ApiModes.REAL) {
      return RealApi.delivered(orderId, token);
    }
    return LocalApi.delivered(orderId, token);
  }
}

export default Api;
