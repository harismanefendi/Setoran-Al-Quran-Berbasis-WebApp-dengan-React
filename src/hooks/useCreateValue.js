// useCreateValue.js
import { useRef, useState } from "react";
import { getDatabase, ref, push, set, child } from "firebase/database";

const useCreateValue = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const pushValue = async (path, value) => {
    setLoading(true);
    try {
      const db = getDatabase();
      const dbPath = child(ref(db), path);
      await push(dbPath, value);
      setSuccess(true);
    } catch (pushError) {
      setError(pushError.message);
    }
    setLoading(false);
  };

  const createValue = async (path, value) => {
    setLoading(true);
    try {
      const db = getDatabase();
      const dbPath = child(ref(db), path);
      await set(dbPath, value);
      setSuccess(true);
    } catch (setError) {
      setError(setError.message);
    }
    setLoading(false);
  };

  const setValuewithKey = async (path, key, value) => {
    try {
      const db = getDatabase();
      const dbPath = child(ref(db), path);
      const keyRef = child(dbPath, key);
      await set(keyRef, value);
      setSuccess(true);
    } catch (setError) {
      setError(setError.message);
    }
  };

  return {
    loading,
    success,
    error,
    pushValue,
    createValue,
    setValuewithKey,
  };
};

export default useCreateValue;
