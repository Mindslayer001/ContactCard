import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key,value) => {
    try {
        const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log("Error Storing data",e)
    }
  };



export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log("helper class: ",jsonValue != null ? JSON.parse(jsonValue) : null)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error Retriving data",e)
    }

  };


export const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log("Error removing data",e)
    }
  
    console.log('Done. ',key)
  }

export const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      return keys;
    } catch(e) {
        console.log("Error Retriving all data",e)
    }
  
    console.log(keys)
  }

  export const getMultiple = async (keys) => {
    let values;
    let totaldata = [];
    
    try {
      values = await AsyncStorage.multiGet(keys);
      
      for (let i = 1; i < values.length; i++) {
        totaldata[i] = [];
        totaldata[i][0] = values[i][0];
        totaldata[i][1] = JSON.parse(values[i][1]);
      }
      
      return totaldata;
    } catch (e) {
      console.error("Error reading from AsyncStorage", e);
    }
  
    console.log("hi",totaldata);
  
    // Example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }
  
  
  