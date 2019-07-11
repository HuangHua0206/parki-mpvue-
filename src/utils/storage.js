export default {
  /**
   * 设置本地存储数据
   * @param key  关键key
   * @param obj  存储的数据
   */
   setStorage(key, obj){
    var oStore = {
      time: +new Date(),
      // validDate: +new Date + (storeTime || 10000000) * 1000 * 60,
      data: obj
    };

    try {
      wx.setStorageSync(key, JSON.stringify(oStore))
    } catch (e) {
    }
  },

  /**
   * 获取本地存储数据
   * @param key
   * @param storeTime 不必填
   */
   getStorage(key, storeTime){
    if (!key) {
      return null;
    }
    var oStore;
    try {
      oStore = wx.getStorageSync(key);
    } catch (e) {
    }
    if (oStore) {
      oStore = JSON.parse(oStore);
    }

    if (!oStore) {
      return null;
    } else if (storeTime && (!oStore.time || +new Date > oStore.time + storeTime * 60 * 1000)) {
      this.removeStorage(key);
      return null;
    } else {
      return oStore.data;
    }
  },

  /**
   * 删除本地存储数据
   * @param key
   */
   removeStorage(key){
    try {
      wx.removeStorageSync(key)
    } catch (e) {
    }
  }

}
