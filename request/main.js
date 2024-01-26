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

export const getAllCategories = async () => {
    const options = {
      method: "GET",
      url: `${apiUrl}/categories`,
    };
    try {
      const response = await axios(options);   
      return response.data.categories;
    } catch (error) {
      throw error; 
    }
};


export const getAllProducts = async () => {
    const options = {
      method: "GET",
      url: `${apiUrl}/products`,
    };
    try {
      const response = await axios(options);   
      return response.data;
    } catch (error) {
      throw error; 
    }
};

export const getProductsByCategoryId = async (categoryId) => {
    const options = {
        method: "GET",
        url: `${apiUrl}/products/byCategory/${categoryId}`,
    };

    try {
        const response = await axios(options);
        console.log("Başarılı cevap:", response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("404: Kategoriye ait ürün bulunamadı.");
            // throw new Error("Kategoriye ait ürün bulunamadı.");
            console.error("error burası",error.response);
        return error.response;

        }
        throw error;
    }
};

export const getProductsById = async (id) => {
    const options = {
        method: "GET",
        url: `${apiUrl}/products/${id}`,
    };

    try {
        const response = await axios(options);
        console.log("Başarılı cevap İDDD:", response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("404: Kategoriye ait İDLİ bulunamadı.");
            // throw new Error("Kategoriye ait ürün bulunamadı.");
            console.error("error burası",error.response);
        return error.response;

        }
        throw error;
    }
}

export const getCategoryById = async (id) => {
    const options = {
        method: "GET",
        url: `${apiUrl}/categories/${id}`,
    };

    try {
        const response = await axios(options);
        console.log("Başarılı cevap İDDD:", response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("404: Kategoriye ait İDLİ bulunamadı.");
            // throw new Error("Kategoriye ait ürün bulunamadı.");
            console.error("error burası",error.response);
        return error.response;

        }
        throw error;
    }
}