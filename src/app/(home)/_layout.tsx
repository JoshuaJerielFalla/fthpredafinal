import { Redirect, Stack } from 'expo-router';
import ChatProvider from '../../providers/ChatProvider';
import { useAuth } from '../../providers/AuthProvider';

import VideoProvider from '../../providers/VideoProvider';
import CallProvider from '../../providers/CallProvider';

import VideoProvider from '../../providers/VideoProvider';
import CallProvider from '../../providers/CallProvider';


export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/OnBoard" />;
  }

  return (
    <ChatProvider>
      <VideoProvider>
        <CallProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        </CallProvider>
      </VideoProvider>
    </ChatProvider>
  );
}