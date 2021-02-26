import Middleware from './middleware';
import HttpClient from '../../network/HttpClient';

const getClient = async () => HttpClient.getInstance();

class RealApi {
  static token = '';

  static async getPartners(lang, token: string) {
    try {

      const client = await getClient();
      const response = await client.get(`Menu/GetPartners?langId=${lang}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async getCategories(id, lang) {
    try {
      const client = await getClient();
      const response = await client.get(`Menu/GetMenu/?menuId=${id}&langId=${lang}`, {
      });
      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async updateMenus(token) {
    try {
      const client = await getClient();

      const response = await client.post(`Common/updatemenus`, 'dddd', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async getTables(id, token) {
    try {
      const client = await getClient();
      const response = await client.get(`menu/gettables?branchid=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async GetQrCodeImages(id, token) {
    try {
      const client = await getClient();
      const response = await client.get(`menu/GetQrCodeImages?branchid=${id}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(resposne);
      return response.data;
    } catch (e) {
      console.log(e.message);
      // ToDo firebase log
      throw new Error(`Error fetching data ${e.message}`);
    }
  }



  static async getimage(menuId, menuItemId, token) {
    try {
      const client = await getClient();
      const response = await client.get(`Menu/GetImage/${menuId}/${menuItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async getimageBase64(imgName, token) {
    try {
      const client = await getClient();
      const response = await client.get(`Menu/GetImageBase64/${imgName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async getOrders(token: string) {
    try {
      const client = await getClient();
      const response = await client.get('Order/GetOrders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.orders == null) {
        return false;
      }

      return response.data;
    } catch (e) {
      // ToDo firebase log

      throw new Error('Error fetching data');
    }
  }

  static async getAllOrders(token: string) {
    try {
      const client = await getClient();
      const response = await client.get('Order/GetAllOrders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.orders == null) {
        return false;
      }
      console.log(response.data, 'response.data');
      return response.data;
    } catch (e) {
      // ToDo firebase log

      throw new Error('Error fetching data');
    }
  }

  static async getPays(token: string) {
    try {
      const client = await getClient();
      const response = await client.get('Order/GetPays', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data == null) {
        return false;
      }

      return response.data;
    } catch (e) {
      // ToDo firebase log
      // throw new Error('Error fetching data')
    }
  }

  static async GetAllFeedback(token: string) {
    try {
      const client = await getClient();
      const response = await client.get('User/GetAllFeedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async login(name, password) {
    try {
      const client = await getClient();
      const response = await client.post('User/AdminLogin', { name, password });
      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async SendNotificationToAll(title, description, token: string) {
    try {
      const client = await getClient();

      const response = await client.post('Common/SendNotificationToAll', {
        title,
        description,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async changeCategory(menuId, categoryId, langId, name, token: string) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/ChangeCategoryName', {
        menuId,
        categoryId,
        langId,
        name,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async changeMenuItemName(menuId, menuItemId, langId, name, description, token: string) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/ChangeMenuItemName', {
        menuId,
        menuItemId,
        langId,
        name,
        description,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async ChangeOptionGroupName(menuId, optionId, langId, name, token) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/ChangeOptionGroupName', {
        menuId,
        optionId,
        langId,
        name,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async ChangeOptionGroupItemName(menuId, optionItemId, langId, name, token) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/ChangeOptionGroupItemName', {
        menuId,
        optionItemId,
        langId,
        name,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async changeMenuItem(menuId, menuItemId, image, isVisible, optionsVisible, positionId, preparationTimeInMinutes, token: string) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/ChangeMenuItem', {
        menuId,
        menuItemId,
        image,
        isVisible,
        optionsVisible,
        positionId,
        preparationTimeInMinutes,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async ChangeCategory(menuId, categoryId, isVisible, positionId, token: string) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/ChangeCategory', {
        menuId,
        categoryId,
        isVisible,
        positionId
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async uploadimage(menuId, menuItemId, picture, pictureFormat, token: string) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/uploadimage', {
        menuId,
        menuItemId,
        picture,
        pictureFormat,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async deleteImage(menuId, menuItemId, token: string) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/DeleteImage', {
        menuId,
        menuItemId,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async UploadPartnerImage(partnerId, type, picture, pictureFormat, token: string) {
    try {
      const client = await getClient();
      const response = await client.post('Menu/UploadPartnerImage', {
        partnerId,
        type,
        picture,
        pictureFormat,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }


  static async reject(orderId, token) {
    try {
      const client = await getClient();
      const response = await client.post('Order/CancelOrder', {
        orderId,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async approve(orderId, token) {
    try {
      const client = await getClient();
      const response = await client.post('Order/ProcessOrder', {
        orderId,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }

  static async delivered(orderId, token) {
    try {
      const client = await getClient();
      const response = await client.post('Order/MakeOrderDelivered', {
        orderId,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data;
    } catch (e) {
      // ToDo firebase log
      throw new Error('Error fetching data');
    }
  }
}

export default RealApi;
