import { useState,useEffect,  useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { TextInput, Card,Button } from 'react-native-paper';
import getData from '../Services/GetData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenContext from './ScreenContextId';
import { useTranslation } from 'react-i18next';
const Profile = (props) => {
  const { t } = useTranslation();
  const { id } = useContext(ScreenContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
const [logged, setLogged] = useState(false);
const [reservations, setReservations] = useState([])

const [title, setTitle] = useState([]);
const [images, setImages] = useState([])
const [entranceDate, setEntranceDate] = useState([])
const [exitDate, setExitDate] = useState([])
const [realEntranceDate, setRealEntranceDate] = useState([])
const [realExitDate, setRealExitDate] = useState([])

  useEffect(() => {
    getInfo(id)
    getInfoBooks(id)
   
    
    
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
        `http://44.195.98.192:8080/ESTRELLAS/userBookedRooms?id=${id}`
      );
  
      console.log("Data received from API:", data);
  
      // Mapea los datos de la reserva y formatea las fechas
      const formattedReservations = data.map(item => {
        const entranceDate = changeDate(item.entranceDate);
        const exitDate = changeDate(item.exitDate);
        
        return {
          title: item.title,
          images: item.images[0],
          entranceDate,
          exitDate
        };
      });
  
      setTitle(formattedReservations.map(item => item.title)); 
      setEntranceDate(formattedReservations.map(item => item.entranceDate));
      setExitDate(formattedReservations.map(item => item.exitDate));
      setImages(formattedReservations.map(item => item.images));  
    } catch (error) {
      console.error('Error al obtener datos de las reservas:', error);
    }
  };
  
const changeDate = (dateString)=>{
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateParts = dateString.split(' ');
  
  const day = dateParts[2].padStart(2, '0');
  const month = (months.indexOf(dateParts[1]) + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
  const year = dateParts[5].slice(-2); // Obtener los últimos dos dígitos del año

  // Formatear la fecha como xx/xx/xx
  return `${day}/${month}/${year}`;
}



const getInfo = async (id) => {
    try {
      const data = await getData(
        `http://44.195.98.192:8080/ESTRELLAS/userInformation?id=${id}`
      );

      if (data && data.name && data.email) { 
        setName(data.name);
        setEmail(data.email);
        console.log("informacion recibida")
      }
  
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
};




  
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
     
        <TouchableOpacity onPress={() => props.navigation.navigate('Configurations')}>
  <Icon
    name="information-outline"
    size={24}
    color="black"
    style={styles.chatIcon}
  />
</TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
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
  </View>
        <TextInput
          style={styles.resultat}
          label="Correo electrónico"
          onChangeText={(text) => setEmail(text)}
          placeholder= {email}
          disabled={true}
          value= {email}
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
      <View style={styles.cardInner}>
  <Image source={{ uri: `data:image/jpg;base64,${images[index]}` }} style={styles.roomImage} />
  <View style={styles.textContainer}>
    <View style={{ maxWidth: '70%' }}> 
    <Text style={styles.title}>{title[index]}</Text>
   
      <Text style={styles.description}>{entranceDate[index]}</Text>
      <View style={styles.cardInnerInner}>
      <Text style={styles.cardInnerInner}> - </Text>
      </View>
      <Text style={styles.description}>{exitDate[index]}</Text>
  
    </View>
  </View>
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
    marginTop:-40,
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
    backgroundColor:"#E0E3E3"
  },
  roomImage: {
    width: 140,
    height: 100,
    marginRight: 10,
    borderRadius:2
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width / 3,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  cardInnerInner: {
    flexDirection: 'row',
  alignItems:'center',
  justifyContent:'flex-end',
   width:"70%",
   
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
  title: {
    fontWeight: 'bold',
    marginBottom: 5, // ajusta según sea necesario
  },
});

export default Profile;
