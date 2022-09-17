import { useRef , useEffect } from 'react';
import { StatusBar } from 'react-native';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black

} from '@expo-google-fonts/inter'

import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';

import './src/service/notificationConfigs';
import { getPushNotificationToken } from './src/service/getPushNotificationToken';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationListner = useRef<Subscription>();
  const responseNotificationListner = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken()
  })

  useEffect(() => {
    getNotificationListner.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    });

    responseNotificationListner.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    });

    return () => {
      if(getNotificationListner.current && responseNotificationListner.current) {
        Notifications.removeNotificationSubscription(getNotificationListner.current);
        Notifications.removeNotificationSubscription(responseNotificationListner.current); 
      }
    }
  }, [])

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading /> }
    </Background>
  );
}