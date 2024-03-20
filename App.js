
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  LogBox,
  Text
} from 'react-native';
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import { initializePusher } from './src/ChatPusher/ChatPusher';

const App = () => {

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native",
    "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package.",
    `ReactImageView: Image source "null" doesn't exist`
  ]);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    initializePusher()
  }, [])

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
