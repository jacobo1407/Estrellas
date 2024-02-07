import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const App = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.usuari}>Nom i cognoms:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUser(text)}
          placeholder="Nombre y apellidos"
          value={user}
          mode="outlined"
          outlineColor="#d4afe0"
          right={<TextInput.Icon name="account" />}
        />
        <Text style={styles.contrasenya}>Correu electronic:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          placeholder="Correo electronico"
          value={email}
          mode="outlined"
          outlineColor="#d4afe0"
          right={<TextInput.Icon name="email" />}
        />
        <Text style={styles.contrasenya}>Contrasenya:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPass(text)}
          placeholder="Contrasenya"
          value={pass}
          secureTextEntry={!showPassword}
          mode="outlined"
          outlineColor="#d4afe0"
          right={
            <TextInput.Icon
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          }
        />
        <Text style={styles.contrasenya}>Confirmar contrasenya:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConfirmPass(text)}
          placeholder="Confirmar contrasenya"
          value={confirmPass}
          secureTextEntry={!showConfirmPassword}
          mode="outlined"
          outlineColor="#d4afe0"
          right={
            <TextInput.Icon
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              onPress={toggleConfirmPasswordVisibility}
            />
          }
        />
        <Button
          style={styles.button}
          mode="contained"
          icon="account-plus"
          onPress={() => console.log('Registro de contraseña')}>
          CREAR COMPTE
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#9EBEFD',
  },
  sectionContainer: {
    flex: 0.9,
    width: 330,
    padding: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  usuari: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Rosarivo',
  },
  contrasenya: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Rosarivo',
  },
  input: {
    marginBottom: 15,
    width: '100%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#d4afe0',
  },
});

export default App;