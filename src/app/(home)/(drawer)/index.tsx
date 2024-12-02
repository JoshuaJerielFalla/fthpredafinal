import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isVisible, onClose }) => {
  const router = useRouter();
  const translateX = useRef(new Animated.Value(-400)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : -400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return isVisible ? (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Animated.View style={[styles.drawerContainer, { transform: [{ translateX }] }]}>
        <View style={styles.drawerContent}>
         
          <View style={styles.FTHLogoContainer}>
          <Image
            style={styles.FTHarmonyLogo}
            resizeMode="contain"
            source={require("../../../../assets/img/FTHarmonyLogo.png")}
          />
          </View>
          <TouchableOpacity
            style={[styles.drawerItem, styles.activeItem]}
            onPress={() => router.replace('/(drawer)/profile')}
          >
            <MaterialIcons name="person" size={24} color="black" />
            <Text style={styles.drawerItemText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem}>
            <Ionicons name="folder-open" size={24} color="black" />
            <Text style={styles.drawerItemText}>Directories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem}>
            <Ionicons name="star" size={24} color="black" />
            <Text style={styles.drawerItemText}>Premium</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={() => supabase.auth.signOut()}>
            <FontAwesome name="sign-out" size={24} color="black" />
            <Text style={styles.drawerItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // semi-transparent background
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '65%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerContent: {
    marginTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderBottomWidth: .5,
    borderBottomColor: '#ddd', // Set border color
    width: '100%', // Expand to the full width of the drawer

  },
  drawerItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  activeItem: {
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#ddd', // Set border color
    width: '100%', // Expand to the full width of the drawer
  },
  FTHLogoContainer: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    marginTop: -18,
  },
  FTHarmonyLogo: {  
    marginLeft: 10,
    height: 170,
    width: 180,
    position: "absolute"
  }
});

export default Drawer;
