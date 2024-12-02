import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { StyleSheet, View, Alert, ScrollView, TouchableOpacity, Text } from "react-native";
import { Button, Input, } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useAuth } from "../../../providers/AuthProvider";
import Avatar from "../../../components/Avatar";
import { useRouter } from 'expo-router';




export default function ProfileScreen() {

  const router = useRouter();


  
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url, full_name, phone_number, address`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setFullname(data.full_name);
        setPhonenumber(data.phone_number);
        setAddress(data.address);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    avatar_url,
    full_name,
    phone_number,
    address,
  }: {
    username: string;
    avatar_url: string;
    full_name: string;
    phone_number: string;
    address: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        full_name,
        phone_number,
        address,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (

    <ScrollView style={styles.MainContainer}>
       <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
        <Text style={styles.backButton}>{'< Back'}</Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginTop: 5, }} >
        <Avatar
          size={120}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url, full_name: fullname, phone_number: phonenumber, address: address });
          }}
          
        
        />
      </View>
      <View style={[styles.mt20]}>
        <Input
          label="Email"
          value={session?.user?.email}
          disabled

          inputContainerStyle={styles.inputInnerContainer}
          inputStyle={styles.input}
        />
      </View>
      <View>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}

          inputContainerStyle={styles.inputInnerContainer}
          inputStyle={styles.input}
        />
      </View>

      <View>
        <Input
          label="Full Name"
          value={fullname || ""}
          onChangeText={(text) => setFullname(text)}

          inputContainerStyle={styles.inputInnerContainer}
          inputStyle={styles.input}
        />
      </View>
      <View>
        <Input
          label="Phone Number"
          value={phonenumber || ""}
          onChangeText={(text) => setPhonenumber(text)}
          inputContainerStyle={styles.inputInnerContainer}
          inputStyle={styles.input}
        />
      </View>
      <View>
        <Input
          label="Address"
          value={address || ""}
          onChangeText={(text) => setAddress(text)}

          inputContainerStyle={styles.inputInnerContainer}
          inputStyle={styles.input}
        />
      </View>

      <View style={[styles.InputContainer, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({
              username,
              avatar_url: avatarUrl,
              full_name: fullname,
              phone_number: phonenumber,
              address: address,
            })
          }
          disabled={loading}
          buttonStyle={styles.updateButton}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: 10,
    padding: 12,
  },
  InputContainer: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  mt20: {
    marginTop: 0,
  },
  inputInnerContainer: {
    borderBottomWidth: 0, // remove the bottom border
    marginBottom: -20,
  },
  input: {
    padding: 7,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: "#28a745", // green color for the update button
    padding: 10,
    borderRadius: 10,
    width: "95%",
   
  },
  signOutButton: {
    backgroundColor: "#343a40", // red color for the sign out button
    padding: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    marginLeft: 10,
    marginTop: 10,
    color: "#1e90ff", // blue color for the back button
    fontSize: 20,
  },
});
