import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Avatar from '../../../components/report_images';
import { supabase } from '../../../lib/supabase'; 
import { useAuth } from '../../../providers/AuthProvider'; 
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

const Report = () => {
  const { user } = useAuth(); 
  const [report, setReport] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [fullName, setFullName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
    }
  }, [user]);

  const fetchUserProfile = async (userId) => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const uploadImageToStorage = async (uri) => {
    const arraybuffer = await fetch(uri).then((res) => res.arrayBuffer());
    const fileExt = uri.split('.').pop().toLowerCase();
    const path = `${Date.now()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from('reportimages')
      .upload(path, arraybuffer, {
        contentType: 'image/jpeg', 
      });

    if (uploadError) {
      throw uploadError;
    }

    const imageUrl = `https://mwldwdhnlnsjccefhmcf.supabase.co/storage/v1/object/public/reportimages/${data.path}`;

    return imageUrl;
  };

  const uploadAudioToStorage = async (uri) => {
    const arraybuffer = await fetch(uri).then((res) => res.arrayBuffer());
    const fileExt = uri.split('.').pop().toLowerCase();
    const path = `${Date.now()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from('audiorecordings')
      .upload(path, arraybuffer, {
        contentType: 'audio/mpeg',
      });

    if (uploadError) {
      throw uploadError;
    }

    const audioUrl = `https://mwldwdhnlnsjccefhmcf.supabase.co/storage/v1/object/public/audiorecordings/${data.path}`;

    return audioUrl;
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        throw new Error("No user logged in");
      }

      setIsUploading(true);

      const imageUrl = avatarUrl ? await uploadImageToStorage(avatarUrl) : null;
      const audioUrl = recordingUri ? await uploadAudioToStorage(recordingUri) : null;

      const reportData = {
        description: report,
        address: address, // Use address here
        userId: user.id,
        fullName: fullName,
        imageUrl,
        audioUrl,
      };

      let { data, error } = await supabase
        .from('reports')
        .insert([reportData]);

      if (error) throw error;
      console.log('Data inserted:', data);
      setReport("");
      setAddress(""); // Clear address field
      setAvatarUrl(""); 
      setRecordingUri("");

      setIsUploading(false);
    } catch (error) {
      console.error('Error during report submission:', error);
      setIsUploading(false);
    }
  };

  const clearAvatar = () => {
    setAvatarUrl("");
  };

  const clearRecording = () => {
    setRecordingUri(null);
  };

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setRecordingUri(uri);
    console.log('Recording stopped and stored at', uri);
  };

  const handleRecordPress = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textHeader}>
        What are the details of this report?
      </Text>

      <Text style={styles.textLabel}>
        Describe the report as best as possible?
      </Text>

      <TextInput
        style={styles.reportInput}
        onChangeText={setReport}
        value={report}
        placeholder="Enter report details"
        multiline={true}
      />

      <Text style={styles.textLabel}>
        Address:
      </Text>

      <TextInput
        style={styles.reportInput}
        onChangeText={setAddress}
        value={address}
        placeholder="Enter address"
        multiline={true}
      />

      <View style={styles.avatarContainer}>
        <Avatar
          size={120}
          url={avatarUrl}
          onUpload={(url) => {
            setAvatarUrl(url);
          }}
          onClearAvatar={clearAvatar}
        />
        <View style={styles.audioContainer}>
          <TouchableOpacity style={styles.styledIconButton} onPress={handleRecordPress}>
            <FontAwesome name={recording ? "stop" : recordingUri ? "paperclip" : "microphone"} size={50} color={recording ? "black" : recordingUri ? "#343a40" : "black"} />
          </TouchableOpacity>
          {recordingUri && (
            <TouchableOpacity style={styles.clearButton} onPress={clearRecording}>
              <Entypo name="circle-with-cross" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={{ color: "white", fontWeight: "500" }}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA"
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    width: '80%',
  },
  textLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginLeft: 20,
  },
  reportInput: {
    fontSize: 14,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    height: '12%',
    alignSelf: 'center',
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  styledButton: {
    width: '90%',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: -25,
  },
  locationText: {
    fontSize: 14,
    margin: 5,
    textAlign: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 30,
    backgroundColor: '#F5F7FA',
  },
  styledIconButton: {
    alignItems: 'center',
    height: 120,
    width: 120,
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: 'rgb(200, 200, 200)',
    backgroundColor: '#F5F7FA',
  },
  submitButton: {
    width: '90%',
    padding: 10,
    backgroundColor: '#2a5d9c',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  audioContainer: {
    backgroundColor: '#F5F7FA',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative', // Added for positioning the clear button
  },
  clearButton: {
    position: 'absolute',
    top: -12,
    left: 8,
    backgroundColor: 'transparent',
  },
});

export default Report;
