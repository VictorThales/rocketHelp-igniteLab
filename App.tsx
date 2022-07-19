import React from 'react';
import { SignIn } from './src/screens/SignIn';
import {NativeBaseProvider} from 'native-base'

export default function App() {
  return (
    <NativeBaseProvider>
      <SignIn/>
    </NativeBaseProvider>
  );
}


