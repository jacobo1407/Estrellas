import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ScreenContext from './ScreenContext';

const LogIn = () => {
  const { setId, theme } = useContext(ScreenContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    const url = 'http://44.195.98.192:8080/ESTRELLAS/login';

    const body = {
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

      if (response.status === 202) {
        if (response.ok) {
          const jsonResponse = await response.json();
          const id = jsonResponse.id;
          setId(id);

          navigation.navigate('Profile');
        }
      } else {
        setEmail('');
        setPassword('');

        Alert.alert(
          'Crendenciales incorrectas',
          'Las credenciales introducidas son incorrectas.'
        );
      }
    } catch (error) {
      console.error('An error has occurred with the POST request:', error);
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
      <Text
        style={[
          styles.title,
          theme === 'black' ? styles.titleDark : styles.titleLight,
        ]}>
        Datos Inicio de Sesión
      </Text>
      <TextInput
        label="📧 Correo electrónico"
        onChangeText={handleEmailChange}
        value={email}
        placeholder="Introduce correo"
        mode="outlined"
        outlineColor={theme === 'black' ? 'white' : 'purple'}
      />
      <TextInput
        label="🔒 Contraseña"
        onChangeText={handlePasswordChange}
        value={password}
        placeholder="Introduce Contraseña"
        mode="outlined"
        outlineColor={theme === 'black' ? 'white' : 'purple'}
        style={{ marginTop: 10 }}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            name={showPassword ? 'eye-off' : 'eye'}
            color={theme === 'black' ? 'white' : 'black'}
            onPress={togglePasswordVisibility}
          />
        }
      />
      <View style={{ marginTop: 30 }}>
        <Button
          style={styles.button}
          mode="contained"
          color={theme === 'black' ? 'white' : 'black'}
          onPress={handleLogin}>
          Iniciar Sesión
        </Button>
      </View>
      <Text
        style={[
          styles.signupText,
          theme === 'black' ? styles.signupTextDark : styles.signupTextLight,
        ]}
        onPress={() => navigation.navigate('SignUp')}>
        ¿No tienes una cuenta? Regístrate aquí
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  titleDark: {
    color: 'white',
  },
  titleLight: {
    color: 'black',
  },
  button: {
    borderRadius: 10,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  signupTextDark: {
    color: 'white',
  },
  signupTextLight: {
    color: 'black',
  },
});

export default LogIn;
