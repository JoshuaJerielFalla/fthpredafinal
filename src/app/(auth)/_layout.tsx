import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage to store the flag
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from './OnBoard';
import LoginAuth from './login';
import SignupAuth from './signup';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AuthLayout() {
  const { user } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        console.log(hasLaunched);
        if (hasLaunched === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true'); // Mark as launched
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return <View><Text>Loading...</Text></View>; // Basic loading screen
  }

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
   
      <Stack.Navigator>
      
        {isFirstLaunch ? (
          <Stack.Screen name="OnBoard" options={{ headerShown: false }} component={OnBoardingScreen} />
        ) : (
          <Stack.Screen name="login" options={{ headerShown: false }} component={LoginAuth} />
        )}
        <Stack.Screen name="signup" options={{ headerShown: false }} component={SignupAuth} />
      </Stack.Navigator>
   
  );
}
