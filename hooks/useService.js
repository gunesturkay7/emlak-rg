// useService.js
import { useState, useCallback } from "react";
import baseHttpClient from "../services/baseHttpClient";

const useService = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const serviceCall = useCallback(async (requestObject, callback) => {
    setIsLoading(true);
    try {
      const response = await baseHttpClient(requestObject);
      setData(response.data);
      callback?.(null, response.data);
    } catch (err) {
      // Hatanın daha iyi işlenmesi için
      const errorResponse = err.response || { data: null, status: "Network Error" };
      setError(errorResponse);
      callback?.(errorResponse, null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { serviceCall, data, error, isLoading };
};

export default useService;
