import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, ImageBackground, Image, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from 'expo-router';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SignupAuth() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.bgimage}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../../../assets/img/familytimelogo.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              left: 30,
              marginBottom: 5,
            }}
          >
            Signup
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "envelope", size: 22 }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Enter your email here..."
              autoCapitalize={"none"}
              labelStyle={{ color: "#333" }}
              placeholderTextColor="#555"
              selectionColor="#333"
            />
          </View>
          <View style={styles.input}>
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock", size: 28 }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Enter your password here..."
              autoCapitalize={"none"}
              labelStyle={{ color: "#333" }}
              placeholderTextColor="#555"
              selectionColor="#333"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Sign up"
              disabled={loading}
              onPress={() => signUpWithEmail()}
              buttonStyle={styles.signinButton}
              titleStyle={styles.buttonTitle}
              containerStyle={styles.signinButton}
            />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={styles.signupLink}>Sigin here.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5F7FA"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: -40,

  },
  logo: {
    width: 200,
    height: 200,
    bottom: 50
  },
  form: {
    marginHorizontal: 20,
  },
  input: {
    marginVertical: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signinButton: {
    backgroundColor: "#2a5d9c", // green color for the update button
    padding: 10,
    borderRadius: 10,
    width: "95%",
    height: 47,
    justifyContent: 'center'
  },
  buttonTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 18,
    color: '#2a5d9c',
  },
});

