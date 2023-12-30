// baseHttpClient.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseHttpClient = axios.create({
  baseURL: "https://expressjs-mongoose-production-f0ea.up.railway.app/", // API'nizin temel URL'si
  /* baseURL: "https://expressjs-mongoose-production-f0ea.up.railway.app/", */ // API'nizin temel URL'si
  /*   baseURL: "http://10.0.2.2:3000/", // API'nizin temel URL'si */
  /*   baseURL: "http://localhost:3000/", // API'nizin temel URL'si
   */ timeout: 10000,
  contentType: "application/json",
  // Diğer yapılandırmalar (headers, timeout, vs.)
});

// İsteğe bağlı olarak interceptor'lar eklenebilir
// Örnek: Yanıt interceptor'ı
baseHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hata işleme
    return Promise.reject(error);
  }
);

baseHttpClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Token alma hatası:", error);
      return config;
    }
  },
  (error) => {
    // İstek yapılırken hata oluşursa burada işlenir
    return Promise.reject(error);
  }
);

export default baseHttpClient;
