import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import Routes from './src/routes';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
