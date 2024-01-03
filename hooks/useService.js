import { useState, useCallback } from "react";
import baseHttpClient from "../services/baseHttpClient";

const useService = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const serviceCall = useCallback(async (requestObject, callback) => {
    setIsLoading(true);
    try {
      const response = await baseHttpClient(requestObject);
      callback?.(null, response.data);
    } catch (err) {
      setError(err);
      callback?.(err, null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { serviceCall, error, isLoading, setIsLoading };
};

export default useService;
