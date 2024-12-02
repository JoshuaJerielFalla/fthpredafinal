import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const Card = ({ image, title, previewContent, fullContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>
        {isExpanded ? fullContent : previewContent}
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Resources = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>

      <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginVertical: 5,
          }}
          >Section 1: Understanding Child Abuse
        </Text>
      </View>

        <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Child Abuse2.jpg')}
          title="Types of Child Abuse"
          previewContent={
            <Text>Child abuse is any action that intentionally harms or endangers a child. It can take many forms...</Text>
          }
          fullContent={
            <View>
              <Text>Child abuse is any action that intentionally harms or endangers a child.</Text>
              <Text style={styles.sectionTitle}>Forms of Child Abuse:</Text>
              
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Physical Abuse:</Text> Inflicting physical harm through hitting, shaking, or other violent acts.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Emotional Abuse:</Text> Damaging a child’s self-worth through verbal attacks, criticism, or neglect of emotional needs.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Sexual Abuse:</Text> Involving a child in sexual activities, including inappropriate touching or exposure to sexual content.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Neglect:</Text> Failing to meet a child’s basic needs such as food, shelter, medical care, and emotional support.</Text>
            </View>
          }
        />
        </ScrollView>

        <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Signs of Abuse.jpg')}
          title="Recognizing Signs of Abuse"
          previewContent={
            <Text>Children may not always verbalize abuse, so it’s crucial to be aware of warning signs. It can take many forms...</Text>
          }
          fullContent={
            <View>
              <Text>Children may not always verbalize abuse, so it’s crucial to be aware of warning signs.</Text>
              <Text style={styles.sectionTitle}>Recognizing Signs of Child Abuse:</Text>
              
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Behavioral Changes:</Text> Sudden withdrawal, aggression, fearfulness, or anxiety.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Physical Signs:</Text> Unexplained bruises, burns, or injuries.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Developmental Delays:</Text> Regression in behavior or delays in physical or emotional development.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Fear of Certain People or Places:</Text> Reluctance to be alone with certain individuals or go to specific locations.</Text>
            </View>
          }
        />
        </ScrollView>



        <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 20,
          marginVertical: 5,
          }}
          >Section 2: Prevention Strategies
        </Text>
      </View>
      <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Building Relationships.jpg')}
          title="Building Healthy Relationships"
          previewContent={
            <Text>Strong relationships between children and caregivers are key to prevention:</Text>
          }
          fullContent={
            <View>
              <Text>Strong relationships between children and caregivers are key to prevention:</Text>
              
              <Text style={styles.bulletItem}>• Create a home environment built on trust, respect, and open communication.</Text>
              <Text style={styles.bulletItem}>• Model healthy relationships by showing love, kindness, and patience.</Text>
            </View>
          }
        />
        </ScrollView>

        <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Communicate.jpg')}
          title="Open Communication"
          previewContent={
            <Text>Open communication to children is essential for building trust and ensuring a child feels safe and heard:</Text>
          }
          fullContent={
            <View>
              <Text>Open communication to children is essential for building trust and ensuring a child feels safe and heard:</Text>
              
              <Text style={styles.bulletItem}>• Encourage children to speak openly and ask questions without fear of judgment.</Text>
              <Text style={styles.bulletItem}>• Regularly talk to your child about their day, their feelings, and any worries they may have.</Text>
            </View>
          }
        />
        </ScrollView>

        <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Internet Safety.jpg')}
          title="Internet Safety"
          previewContent={
            <Text>Teaching children about internet safety is crucial for protecting them from online risks and helping them navigate the digital world responsibly:</Text>
          }
          fullContent={
            <View>
              <Text>Teaching children about internet safety is crucial for protecting them from online risks and helping them navigate the digital world responsibly:</Text>
              
              <Text style={styles.bulletItem}>• Educate your child about the potential dangers online, such as cyberbullying and predators.</Text>
              <Text style={styles.bulletItem}>• Set boundaries for screen time and monitor your child’s online activity, including social media and chat platforms.</Text>
            </View>
          }
        />
        </ScrollView>



        <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 20,
          marginVertical: 5,
          }}
          >Section 3: Empowering Children
        </Text>
      </View>
      <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Teaching Boundaries.jpg')}
          title="Teaching Boundaries"
          previewContent={
            <Text>Teaching children about personal boundaries empowers them to understand their rights and recognize when someone is crossing those boundaries:</Text>
          }
          fullContent={
            <View>
              <Text>Teaching children about personal boundaries empowers them to understand their rights and recognize when someone is crossing those boundaries:</Text>
              
              <Text style={styles.bulletItem}>• Help children understand the concept of personal boundaries, teaching them that it’s okay to say “no” if someone makes them uncomfortable.</Text>
              <Text style={styles.bulletItem}>• Encourage them to recognize when someone crosses a boundary and to trust their instincts.</Text>
            </View>
          }
        />
        </ScrollView>

        <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Self Esteem.jpg')}
          title="Building Confidence and Self-Esteem"
          previewContent={
            <Text>Building a child’s confidence and self-esteem helps them develop resilience and reduces their vulnerability to manipulation or abuse:</Text>
          }
          fullContent={
            <View>
              <Text>Building a child’s confidence and self-esteem helps them develop resilience and reduces their vulnerability to manipulation or abuse:</Text>
              
              <Text style={styles.bulletItem}>• Confident children are less likely to be targeted by abusers. Support their interests and hobbies and praise their achievements.</Text>
              <Text style={styles.bulletItem}>• Encourage independence by letting them make age-appropriate decisions, which helps build self-assurance.</Text>
            </View>
          }
        />
        </ScrollView>



        <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 20,
          marginVertical: 5,
          }}
          >Section 4: How to Respond
        </Text>
      </View>
      <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Keep Calm.jpg')}
          title="What to Do if You Suspect Abuse"
          previewContent={
            <Text>If you suspect a child is being abused, it’s critical to take immediate and appropriate action to protect them:</Text>
          }
          fullContent={
            <View>
              <Text>If you suspect a child is being abused, it’s critical to take immediate and appropriate action to protect them:</Text>
              <Text style={styles.sectionTitle}>If you suspect a child is being abused:</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Stay calm</Text> and listen if the child confides in you.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Report the abuse</Text> to local authorities or a child protection agency immediately.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Do not confront</Text> the suspected abuser directly.</Text>
            </View>
          }
        />
        </ScrollView>

        <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Supporting Child.jpg')}
          title="Supporting the Child After Disclosure"
          previewContent={
            <Text>Supporting a child after they disclose abuse involves offering reassurance, belief, and seeking professional help to aid in their healing process:</Text>
          }
          fullContent={
            <View>
              <Text>Supporting a child after they disclose abuse involves offering reassurance, belief, and seeking professional help to aid in their healing process:</Text>
              <Text style={styles.sectionTitle}>If a child tells you about abuse:</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Reassure them</Text> that they did the right thing by speaking up.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Be supportive</Text> and let them know it’s not their fault.</Text>
              <Text style={styles.bulletItem}>• <Text style={styles.boldText}>Seek professional help,</Text> such as therapy, to help the child heal.</Text>
            </View>
          }
        />
        </ScrollView>



        <View>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 20,
          marginVertical: 5,
          }}
          >Section 5: Resources and Support
        </Text>
      </View>
      <ScrollView>
        <Card
          image={require('../../../../assets/cardassets/Preda Logo.png')}
          title="Helplines and Local Resources"
          previewContent={
            <Text>Helplines and local resources provide essential support, guidance, and immediate assistance for children and families affected by abuse:</Text>
          }
          fullContent={
            <View>
              <Text>Helplines and local resources provide essential support, guidance, and immediate assistance for children and families affected by abuse:</Text>
              <Text style={styles.sectionTitle}>Support Groups and Organizations:</Text>
              <Text style={styles.sectionTitle}>        PREDA Foundation (Philippines)</Text>
              <Text style={styles.sectionTitle}>Contact Info:</Text>
              <Text style={styles.bulletItem}>    • Landline #:<Text style={styles.boldText}> (+63) 047 222 4994</Text></Text>
              <Text style={styles.bulletItem}>    • Hotline to report abuse:<Text style={styles.boldText}> +63 917 532 4453</Text></Text>
              <Text style={styles.bulletItem}><Text style={styles.boldText}>Main address :</Text> Km. 129 National Highway, Upper Kalaklan, Olongapo City Philipines 2200</Text>
            </View>
          }
        />
        </ScrollView>


      </View>
    </ScrollView>
  );
};

export default Resources;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: "95%",
    alignSelf: "center",
  },
  cardImage: {
    justifyContent: "center",
    borderRadius: 8,
    width: "100%",
    height: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  bulletItem: {
    marginVertical: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    width: "100%",
    marginVertical: 15,
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: "center",
  },
});
