import { extendTheme, NativeBaseProvider } from 'native-base';
import { colorModeManager, colors, config, fontConfig, fonts } from './components/ColorModeManger';
import Test from './screens/Test.screen';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_100Thin, Inter_900Black, Inter_500Medium, Inter_700Bold, Inter_200ExtraLight } from '@expo-google-fonts/inter';
import { Pinch } from './components/Animations';
import GesturesAnimation from './components/GesturesOld';
import { Dimensions } from 'react-native';
import CardAnimation from './components/CardAnimation';

export default function App() {

  //https://github.com/expo/google-fonts
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_700Bold, Inter_200ExtraLight, Inter_100Thin
  });
  const theme = extendTheme({ colors, fontConfig, fonts });

  if (!fontsLoaded) return <AppLoading />;
  return (

    <NativeBaseProvider {...{ theme, colorModeManager, config }} >
      {/* <Test /> */}
      {/* <Pinch /> */}
      <CardAnimation />
      {/* <GesturesAnimation width={Dimensions.get('window').width} height={Dimensions.get('window').height} /> */}
    </NativeBaseProvider>
  );
}

