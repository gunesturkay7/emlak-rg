// AuthProvider.js
import React, { useState, createContext, useContext, useEffect } from "react";
import AxiosClient from "../services/baseHttpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const [error, setError] = useState(null);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      setLoading(true);
      try {
        console.log("ba;ladi");
        userToken = await AsyncStorage.getItem("token");
        console.log("token", userToken);
        setToken(userToken);

        console.log("bitti");
      } catch (e) {
        // Restoring token failed
        setLoading(false);
        console.log(e);
      } finally {
        setLoading(false);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  const signIn = async (credentials) => {
    try {
      setError(null);
      setLoading(true); // Giriş işlemi başladığında yükleme durumunu true yap
      const response = await AxiosClient.post("/auth/signin", credentials);
      const { token, user } = response.data;
      setUser(user);
      await AsyncStorage.setItem("token", token);
      setToken(token);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false); // Giriş işlemi tamamlandığında yükleme durumunu false yap
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logout, error, loading, token }}>{children}</AuthContext.Provider>
  );
};
