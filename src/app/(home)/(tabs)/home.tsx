import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from "../../../lib/supabase";  
import { useAuth } from "../../../providers/AuthProvider";

interface Schedule {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  selectedTime: string;
  location?: string;
}

const Home = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { user } = useAuth(); 

  useEffect(() => {
    getUserSchedules();
  }, []);

  const getUserSchedules = async () => {
    try {
      if (!user) {
        throw new Error("No user logged in");
      }
  
      const { data: schedules, error } = await supabase
        .from<Schedule>('schedules')
        .select('*')
        .eq('userId', user.id); 
  
      if (error) {
        throw error;
      }
  
      setSchedules(schedules);
    } catch (error) {
      console.log("error", error);
    }
  };
  

  const deleteSchedule = async (scheduleId: string) => {
    try {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', scheduleId);

      if (error) {
        throw error;
      }

      setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#333" }}>
            Your Agendas
          </Text>
        </View>

        <View style={styles.scheduleContainer}>
          {schedules.map((schedule) => (
            <TouchableOpacity key={schedule.id} onPress={() => console.log(schedule.title)}>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleTitle}>{schedule.title}</Text>
                <Text style={styles.scheduleText}>
                  Start Date: {new Date(schedule.startDate).toLocaleDateString()}
                </Text>
                <Text style={styles.scheduleText}>
                  End Date: {new Date(schedule.endDate).toLocaleDateString()}
                </Text>
                <Text style={styles.scheduleText}>
                  Location: {schedule.location}
                </Text>
                <Text style={styles.scheduleText}>
                  Time: {new Date(schedule.selectedTime).toLocaleTimeString()}
                </Text>

                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteSchedule(schedule.id)}>
                  <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  scheduleContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  scheduleItem: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  scheduleText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#EF5350",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
    right: 20,
    top: 20,
  },
});
