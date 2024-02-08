import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LogIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Datos Inicio de Sesion</Text>
      <TextInput
        label="Usuario"
        onChangeText={handleUsernameChange}
        value={username}
        placeholder="Introduce Usuario"
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
