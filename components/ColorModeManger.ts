import { ColorMode } from "native-base";
import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@my-app-color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      console.log(e);
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      if (value) await AsyncStorage.setItem("@my-app-color-mode", value);
      // console.log(value);
    } catch (e) {
      console.log(e);
    }
  },
};
export const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export const colors = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

export const fontConfig = {
  Roboto: {
    100: {
      normal: "Inter_200ExtraLight",
    },
    200: {
      normal: "Inter_500Medium",
    },
    300: {
      normal: "Inter_700Bold",
    },
  },
};
// Make sure values below matches any of the keys in `fontConfig`
export const fonts = {
  heading: "Roboto",
  body: "Roboto",
  mono: "Roboto",
};
