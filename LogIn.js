import { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ScreenContext from './ScreenContextId';

const LogIn = (props) => {
  const { setId } = useContext(ScreenContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    let url = 'http://44.195.98.192:8080/ESTRELLAS/login';

    let body = {
      email: email,
      password: password,
    };

    postData(url, body);
  };

  const postData = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status == 202) {
        if (response.ok) {
          const jsonResponse = await response.json();
          const id = jsonResponse.id;
          setId(id);

          navigation.navigate('Profile');
        }
      } else {
        setEmail('');
        setPassword('');

        alert('Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('An error has ocurred with the POST request:', error);
    }
  };

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Datos Inicio de Sesion</Text>
      <TextInput
        label="Correo eléctronico"
        onChangeText={handleEmailChange}
        value={email}
        placeholder="Introduce correo"
        mode="outlined"
        outlineColor="purple"
      />

      <TextInput
        label="Contraseña"
        onChangeText={handlePasswordChange}
        value={password}
        placeholder="Introduce Contraseña"
        mode="outlined"
        outlineColor="purple"
        style={{ marginTop: 10 }}
        secureTextEntry
      />
      <View style={{ marginTop: 50 }}>
        <Button
          style={styles.button}
          title="Iniciar Sesion"
          mode="outlined"
          color="black"
          onPress={handleLogin}>
          Inicia Sesion{' '}
        </Button>
      </View>
      <Text
        style={{ marginTop: 20, textAlign: 'center', color: 'blue' }}
        onPress={() => props.navigation.navigate('SignUp')}>
        ¿No tienes una cuenta? Regístrate aquí
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'lightblue',
  },
  title: {
    margin: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
  },
});

export default LogIn;
