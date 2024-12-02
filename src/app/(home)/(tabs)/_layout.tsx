import { Redirect, Tabs, useRouter } from "expo-router";
import { Ionicons, Octicons, AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Drawer from "../(drawer)/index"; // Adjust the path as needed

export default function TabsNavigator() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // this is for the drawer

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (

    <>
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.focusedTab]}>
                <Octicons name="home" size={24} color={focused ? "white" : "black"} />
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerLeftStyle}
                onPress={toggleDrawer}
              >
                <Ionicons name="menu" size={28} />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="report"
          options={{
            title: "Report",
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.focusedTab]}>
                <Feather name="clipboard" size={24} color={focused ? "white" : "black"} />
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerLeftStyle}
                onPress={toggleDrawer}
              >
                <Ionicons name="menu" size={28} />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="scheduler"
          options={{
            title: "Schedule",
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.focusedTab]}>
                <AntDesign name="plussquareo" size={24} color={focused ? "white" : "black"} />
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerLeftStyle}
                onPress={toggleDrawer}
              >
                <Ionicons name="menu" size={28} />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.focusedTab]}>
                <AntDesign name="message1" size={24} color={focused ? "white" : "black"} />
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerLeftStyle}
                onPress={toggleDrawer}
              >
                <Ionicons name="menu" size={28} />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="resources"
          options={{
            title: "Education and Prevention",
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.focusedTab]}>
                <Feather name="book" size={24} color={focused ? "white" : "black"} />
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={styles.headerLeftStyle}
                onPress={toggleDrawer}
              >
                <Ionicons name="menu" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
      {isDrawerVisible && (
        <Drawer isVisible={isDrawerVisible} onClose={closeDrawer} />
      )}
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10, // makes the background circular
  },
  focusedTab: {
    backgroundColor: "#39afea", // You can change this color to what you prefer
  },
  headerLeftStyle: {
    left: 15,
    marginRight: 10,
  },
});
