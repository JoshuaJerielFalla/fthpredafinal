
import { router, Stack, useLocalSearchParams } from "expo-router";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel as ChannelType } from 'stream-chat';
import { MessageList, MessageInput, Channel, useChatContext} from "stream-chat-expo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import * as Crypto from 'expo-crypto';



export default function ChannelScreen () {
    
const [channel, setChannel] = useState<ChannelType | null>(null);
    const {cid} = useLocalSearchParams<{cid: string}>();
    
    const { client } = useChatContext();

    const videoClient = useStreamVideoClient();

    const videoClient = useStreamVideoClient();

    useEffect(() => {

        const fetchChannel = async () => {
            const channels = await client.queryChannels({ cid });
            setChannel(channels[0]);

        };
        fetchChannel();
    }, [cid])


    const joinCall = async () => {
      const members = Object.values(channel.state.members).map((member) => ({
        user_id: member.user_id,
      }))

      // create a call using the channel members
      const call = videoClient.call('default', Crypto.randomUUID());
      await call.getOrCreate({
        ring: true,
        data: {
          members,
        },
      });

      // // navigate to the call screen
      // router.push(`/call/${call.id}`);
    }



    if(!channel){
        return <ActivityIndicator />
    }

    return (
      <Channel channel={channel} audioRecordingEnabled>

        <Stack.Screen options={{ title: 'Chat', headerRight: () => <Ionicons name="call" size={20} color="#a1a1a1" onPress={joinCall}/>}}/>

        <Stack.Screen options={{ title: 'Chat', headerRight: () => <Ionicons name="call" size={20} color="#a1a1a1" onPress={joinCall}/>}}/>

        <MessageList />
        <SafeAreaView edges={["bottom"]}>
          <MessageInput />
        </SafeAreaView>
      </Channel>
    );
}