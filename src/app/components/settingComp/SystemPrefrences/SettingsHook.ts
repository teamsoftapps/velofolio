"use client"
import { useState } from "react";

const useSettings = (initialState: any) => {
  const [settings, setSettings] = useState(initialState);

  const toggleSetting = (key: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return { settings, toggleSetting, setSettings };
};
export default useSettings