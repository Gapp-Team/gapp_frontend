import axios from "axios";
import { apiUrl } from "./apiconfig";

const url = apiUrl;

let options = {
  method: "",
  url: apiUrl,
  headers: {
    Authorization: "",
    contentType: "",
  },
  data: {},
};


export const AddUser = async (data) => {
  console.log(data);
  options.method = "POST";
  options.headers.contentType = "application/json";
  options.headers.Authorization="";
  options.url = `${apiUrl}/users/create`;
  options.data = data;  

  try {
    const response = await axios(options);
    console.log("response login:", response);

    if (response.data.code === 400) {
      // Bu durumda kullanıcı zaten kayıtlıdır, bu durumu işleyin.
      console.log("User already exists:", response.data.message);
    }

    return response;
  } catch (error) {
    throw error; 
  }
};

export const loginUser = async (data) => {
  console.log("data",data);
  options.method = "POST";
  options.headers.contentType = "application/json";
  options.headers.Authorization="";
  options.url = `${apiUrl}/users/auth`;
  options.data = data;  

  try {
    const response = await axios(options);
    console.log("response login:", response);

    return response.data;
  } catch (error) {
    throw error; 
  }
};



export const getUserByToken = async (token) => {
  const options = {
    method: "GET",
    url: `${apiUrl}/users/userinfo`,
    headers: {
      "x-auth-token": token,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

