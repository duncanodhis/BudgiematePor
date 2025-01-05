import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { AuthProvider } from './src/contexts/AuthContext';
export default function App() {
  return (
    <AuthProvider>
      <>
        <StatusBar style="auto" />
        <AppNavigation />
      </>
    </AuthProvider>
  );
}
 
