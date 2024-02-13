import { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { TextInput, Card, Button } from 'react-native-paper';
import getData from '../Services/GetData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenContext from './ScreenContext';

const Profile = (props) => {
  const { id } = useContext(ScreenContext);
  const { theme } = useContext(ScreenContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logged, setLogged] = useState(false);
  const [reservations, setReservations] = useState([]);

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [peopleNumber, setPeopleNumber] = useState([]);
  const [price, setPrice] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getInfo(id);
    getInfoBooks(id);
  }, [id]);

  useEffect(() => {
    if (id != -1) {
      setLogged(true);

      alert('Has iniciado sesión!');
    }
  }, [id]);

  const getInfoBooks = async (id) => {
    try {
      const data = await getData(
        `http://44.195.98.192:8080/ESTRELLAS/roomInformation?id=${id}`
      );
      console.log(id);
      console.log('Data received from API:', data);
      const titles = data.map((item) => item.title);
      const descriptions = data.map((item) => item.description);
      const peopleNumbers = data.map((item) => item.peopleNumber);
      const prices = data.map((item) => item.price);
      const images = data.map((item) => item.images);

      setTitle(titles);
      setDescription(descriptions);
      setPeopleNumber(peopleNumbers);
      setPrice(prices);
      setImages(images);
    } catch (error) {
      console.error('Error al obtener datos de las reservas:', error);
    }
  };

  const getInfo = async (id) => {
    try {
      const data = await getData(
        `http://44.195.98.192:8080/ESTRELLAS/userInformation?id=${id}`
      );

      if (data && data.name && data.email) {
        setName(data.name);
        setEmail(data.email);
        console.log('informacion recibida');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        theme === 'black'
          ? { backgroundColor: '#005588' }
          : { backgroundColor: 'lightblue' },
      ]}>
      {!logged && (
        <View styles={styles.containerBotton}>
          <Text
            style={[
              styles.text,
              theme === 'black' ? { color: 'white' } : { color: 'black' },
            ]}>
            Para ver la informacion del perfil inicia sesión
          </Text>
          <Button
            style={styles.button}
            title="Iniciar Sesion"
            mode="outlined"
            color="black"
            onPress={() => props.navigation.navigate('LogIn')}>
            Iniciar sesion
          </Button>
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
            disabled={true}
            value={name}
            mode="outlined"
            outlineColor="orange"
            right={<TextInput.Icon name="account" />}
          />
          <TextInput
            style={styles.resultat}
            label="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            placeholder={email}
            disabled={true}
            value={email}
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
            {title.length === 0 ? (
              <Text>No hay reservas disponibles</Text>
            ) : (
              title.map((room, index) => (
                <Card key={index} style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <Image source={images[index]} style={styles.roomImage} />
                    <View style={styles.textContainer}>
                      <Text>{title[index]}</Text>
                      <Text>{description[index]}</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: 'lightblue',
  },
  containerBotton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
