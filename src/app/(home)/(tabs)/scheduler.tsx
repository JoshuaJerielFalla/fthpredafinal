import { Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SimpleLineIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { supabase } from '../../../lib/supabase';
import AuthProvider, { useAuth } from "../../../providers/AuthProvider";

const Scheduler: React.FC = () => {

  const [title, setTitle] = useState<string>(""); 
  const [notes, setNotes] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isSelectedTimePickerVisible, setSelectedTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const router = useRouter();
  const { user } = useAuth(); // Get the current user

  // This is for the Start Date
  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleConfirmStart = (event, date) => {
    const selectedDate = date || startDate;
    setStartDate(selectedDate);
    hideStartDatePicker();
  };

  // This is for the End Date
  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleConfirmEnd = (event, date) => {
    const selectedDate = date || endDate;
    setEndDate(selectedDate);
    hideEndDatePicker();
  };

  // This is for the selected Time
  const showSelectedTimePicker = () => {
    setSelectedTimePickerVisible(true);
  };
  
  const hideSelectedTimePicker = () => {
    setSelectedTimePickerVisible(false);
  };
  
  const handleConfirmTime = (event, time) => {
    const selectedTime = time || selectedTime;
    setSelectedTime(selectedTime);
    hideSelectedTimePicker();
  };

  // Posting schedules
  const handleAddSchedule = async () => {
    
    try {
      if (!user) {
        throw new Error("No user logged in");
      }
  
      const scheduleData = {
        title,
        notes,
        location,
        budget,
        startDate,
        endDate,
        selectedTime,
        userId: user.id,  // Add user ID here
      };
  
      let { data, error } = await supabase
        .from('schedules')
        .insert([scheduleData]);
  
      if (error) throw error;
      console.log('Data inserted:', data);
      // Clear the form fields
      setTitle("");
      setNotes("");
      setLocation("");
      setBudget("");
      setStartDate(new Date());
      setEndDate(new Date());
      setSelectedTime(new Date());
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            style={styles.titleInput}
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
            multiline
            textAlignVertical="bottom"
          />
        </TouchableWithoutFeedback>

        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={showStartDatePicker}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={styles.dateText}>Start</Text>
              <Text style={styles.dateValue}>{startDate.toDateString()}</Text>
            </View>
            {isStartDatePickerVisible && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleConfirmStart}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateButton} onPress={showEndDatePicker}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -10 }}>
              <Text style={styles.dateText}>End</Text>
              <Text style={styles.dateValue}>{endDate.toDateString()}</Text>
            </View>
            {isEndDatePickerVisible && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={handleConfirmEnd}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.dateButton} onPress={showSelectedTimePicker}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -30 }}>
              <Text style={styles.dateText}>Time</Text>
              <Text style={styles.dateValue}>{selectedTime.toLocaleTimeString()}</Text>
            </View>
            {isSelectedTimePickerVisible && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="default"
                onChange={handleConfirmTime}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.notesContainer}>
          <SimpleLineIcons
            name="note"
            size={18}
            color="#6c757d"
            style={styles.icon}
          />
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes"
          />
        </View>

        <View style={styles.locationContainer}>
          <SimpleLineIcons
            name="location-pin"
            size={18}
            color="#6c757d"
            style={styles.icon}
          />
          <TextInput
            style={styles.locationInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
        </View>

        <View style={styles.budgetContainer}>
          <FontAwesome6
            name="coins"
            size={18}
            color="#6c757d"
            style={styles.icon}
          />
          <TextInput
            style={styles.budgetInput}
            value={budget}
            onChangeText={setBudget}
            placeholder="Budget"
          />
        </View>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.bottomButton} onPress={() => router.replace("/home")}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomButton, styles.addButton]} onPress={handleAddSchedule}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Scheduler;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  titleInput: {
    marginTop: 5,
    fontSize: 26,
    padding: 5,
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    textAlignVertical: 'top',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notesInput: {
    width: '80%',
    fontSize: 18,
    margin: 12,
    paddingTop: 5,
    paddingLeft: 5,
    textAlignVertical: 'top',
    borderBottomWidth: 0.5,
    borderColor: 'light-gray',
    marginLeft: 40,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInput: {
    width: '80%',
    fontSize: 18,
    margin: 12,
    paddingTop: 5,
    paddingLeft: 5,
    textAlignVertical: 'top',
    borderBottomWidth: 0.5,
    borderColor: 'light-gray',
    marginLeft: 40,
  },
  inviteeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteeInput: {
    width: '80%',
    fontSize: 18,
    margin: 12,
    paddingTop: 5,
    paddingLeft: 5,
    textAlignVertical: 'top',
    borderBottomWidth: 0.5,
    borderColor: 'light-gray',
    marginLeft: 40,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetInput: {
    width: '80%',
    fontSize: 18,
    margin: 12,
    paddingTop: 5,
    paddingLeft: 5,
    textAlignVertical: 'top',
    borderBottomWidth: 0.5,
    borderColor: 'light-gray',
    marginLeft: 40,
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateButton: {
    width: '87%',
    height: 40,
    justifyContent: 'center',
  },
  dateText: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 17,
    color: '#6c757d',
  },
  dateValue: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 17,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  bottomButtonContainer: {
    gap: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    marginTop: 80,
    width: '35%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#6c757d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#2a5d9c',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});