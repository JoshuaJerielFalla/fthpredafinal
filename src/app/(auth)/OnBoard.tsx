import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';

export default function OnBoardingScreen() {
  const router = useRouter();

  const handleDone = () => {
    console.log("Navigating to login");
    router.push('login'); // Use React Navigation's navigate
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ fontWeight: '600' }}>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.onboardingContainer}>
        <Onboarding
          onDone={handleDone}
          onSkip={handleDone}
          bottomBarHighlight={false}
          DoneButtonComponent={doneButton} // Custom Done button
          pages={[
            {
              backgroundColor: '#D4E7FE',
              image: (
                <View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontWeight: '600',
                      fontStyle: 'italic',
                      color: '#2a5d9c',
                      marginTop: -20,
                      fontSize: 36,
                      textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
                      textShadowOffset: { width: 1, height: 1 }, // Shadow offset (x, y)
                      textShadowRadius: 4, // Shadow blur radius
                      zIndex: 1,
                    }}
                  >
                    WELCOME
                  </Text>
                  <Image
                    source={require('../../../assets/onboardingimg/harmonylogo1.png')}
                    style={{ width: 250, height: 250, zIndex: 1 }}
                  />
                </View>
              ),
              title: (
                <Text style={styles.title}>Empowering Families, Protecting Children</Text>
              ),
              subtitle: (
                <Text style={{ fontSize: 17, textAlign: 'center', marginHorizontal: 20 }}>
                  FamilyTime Harmony is a mobile app designed to support child safety and streamline family management. Let’s get started!
                </Text>
              ),
            },


            {
              backgroundColor: '#a7f3d0',
              image: (
                <View>
                  <Image
                    source={require('../../../assets/onboardingimg/safety.png')}
                    style={{ width: 250, height: 250, zIndex: 1 }}
                  />
                </View>
              ),
              title: <Text style={styles.title}>Protection</Text>,
              subtitle: (
                <Text style={styles.subtitle}>
                  Ensure your child's safety with our easy reporting system to quickly document and report concerns.
                </Text>
              ),
            },


            {
              backgroundColor: '#a78bfa',
              image: (
                <View>
                  <Image
                    source={require('../../../assets/onboardingimg/organized.png')}
                    style={{ width: 250, height: 250, zIndex: 1 }}
                  />
                </View>
              ),
              title: <Text style={styles.title}>Organization</Text>,
              subtitle: (
                <Text style={styles.subtitle}>
                  Manage family schedules, track important appointments, and ensure you never miss an important event or activity.
                </Text>
              ),
            },


            {
              backgroundColor: '#39afea',
              image: (
                <View>
                  <Image
                    source={require('../../../assets/onboardingimg/connected.png')}
                    style={{ width: 250, height: 250, zIndex: 1 }}
                  />
                </View>
              ),
              title: <Text style={styles.title}>Connection</Text>,
              subtitle: (
                <Text style={styles.subtitle}>
                  Communicate securely with family members and caregivers, ensuring private and safe interactions.
                </Text>
              ),
            },


            {
              backgroundColor: '#fef3c7',
              image: (
                <View>
                  <Image
                    source={require('../../../assets/onboardingimg/importantinfo1.png')}
                    style={{ width: 250, height: 250, zIndex: 1 }}
                  />
                </View>
              ),
              title: <Text style={styles.title}>Accessibility</Text>,
              subtitle: (
                <Text style={styles.subtitle}>
                  Explore resources designed to educate and empower families on child safety and family well-being.
                </Text>
              ),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  onboardingContainer: {
    flex: 1,
    zIndex: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: -40,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginRight: 20,
    marginLeft: 20
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginRight: 40,
    marginLeft: 40 
  },
  doneButton: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
