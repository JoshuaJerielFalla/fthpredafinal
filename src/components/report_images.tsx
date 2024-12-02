import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

interface Props {
  size: number;
  url: string | null;
  onUpload: (uri: string) => void;
  onClearAvatar: () => void; // Added prop for clearing the avatar
}

export default function Avatar({ size = 150, onUpload, url, onClearAvatar }: Props) {
  const [uploading, setUploading] = useState(false);
  const [localUri, setLocalUri] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.');
        setUploading(false);
        return;
      }

      const image = result.assets[0];
      console.log('Got image', image);

      if (!image.uri) {
        throw new Error('No image uri!');
      }

      // Set the local URI to state and pass it back to the parent component
      setLocalUri(image.uri);
      onUpload(image.uri); // Pass the local URI back to the parent component

      // Continue with uploading the image to Supabase storage
      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

      const fileExt = image.uri.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('reportimages')
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        });

      if (uploadError) {
        throw uploadError;
      }

      // After successful upload, you might want to do something with the uploaded file path
      // For example, you could save it to the state or call another callback function

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Upload error', error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  function clearAvatar() {
    setLocalUri(null); // Clear localUri state
    onUpload(''); // Clear the uploaded image URL in the parent component
    if (onClearAvatar) {
      onClearAvatar(); // Call the onClearAvatar function if it exists
    }
  }

  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={uploading ? undefined : uploadAvatar}>
        {uploading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : localUri ? (
          <Image
            source={{ uri: localUri }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : url ? (
          <Image
            source={{ uri: url }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : (
          <View style={[avatarSize, styles.avatar, styles.noImage]}>
            <Entypo name="camera" size={size / 2} color="black" />
          </View>
        )}
      </TouchableOpacity>
      {(localUri || url) && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAvatar}>
          <Entypo name="circle-with-cross" size={size / 4} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    borderRadius: 5,
    overflow: 'hidden',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 200, 200)',
  },
  clearButton: {
    position: 'absolute',
    top: -18,
    left: -18,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'transparent',
  },
});
