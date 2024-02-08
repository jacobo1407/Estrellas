import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { TextInput, Card,Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
const [logged, setLogged] = useState(false);

  const reservations = [

  ];

  return (
    <View style={styles.container}>
     {!logged && (
       <View styles={styles.containerBotton}>

         <Text style={styles.text}>Para ver la informacion del perfil inicia sesión</Text>
         <Button style={styles.button} title="Iniciar Sesion" mode="outlined" color='black' onPress={() => props.navigation.navigate('LogIn')}>Iniciar sesion</Button>
         </View>
      )}

      {logged && (
      <View style={styles.sectionContainer}>
        <View style={styles.info}>
          <View>
            <Text style={styles.sectionTitle}>Información Personal</Text>
          </View>
          <View style={styles.icon}>
            <Icon
              name="information-outline"
              size={24}
              color="black"
              style={styles.chatIcon}
            />
          </View>
        </View>
        <TextInput
          style={styles.resultat}
          label="Nombre Completo"
          onChangeText={(text) => setName(text)}
          placeholder="Nombre completo"
          disabled={true}
          value="Hola mundo"
          mode="outlined"
          outlineColor="orange"
          right={<TextInput.Icon name="account" />}
        />
        <TextInput
          style={styles.resultat}
          label="Correo electrónico"
          onChangeText={(text) => setEmail(text)}
          placeholder="Correo electrónico"
          disabled={true}
          value="Hola mundo"
          mode="outlined"
          outlineColor="orange"
          right={<TextInput.Icon name="email" />}
        />
      </View>
)} 
 {logged && (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.sectionContainer}>
          <View style={styles.booking}>
            <Text style={styles.sectionTitle}>Reservas Activas</Text>
            <View style={styles.icon}>
              <Icon
                name="bed"
                size={24}
                color="black"
                style={styles.chatIcon}
              />
            </View>
          </View>
          {reservations.length === 0 ? (
            <Text>No hay reservas disponibles</Text>
          ) : (
            reservations.map((reservation, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Image source={reservation.image} style={styles.roomImage} />
                  <View style={styles.textContainer}>
                    <Text>{reservation.type}</Text>
                    <Text>{`${reservation.start} - ${reservation.end}`}</Text>
                  </View>
                </Card.Content>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: 'lightblue',
  },
   containerBotton: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    marginLeft: 10,
  },
  booking: {
    flexDirection: 'row',
  },
  sectionContainer: {
    padding: 20,
    marginBottom: 20,
    
    backgroundColor: 'white',
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
  roomImage: {
    width: 120,
    height: 100,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width / 3,
  },
    text: {
    fontSize: 20, 
    textAlign: 'center', 
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  textContainer: {
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
   button: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
  },
});

export default Profile;