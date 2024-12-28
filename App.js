import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigation />
    </>
  );
}
