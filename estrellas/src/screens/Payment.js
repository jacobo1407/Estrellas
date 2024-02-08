import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Payment  = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [secretNumber, setSecretNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
    const [cardUser, setCardUser] = useState('');

  const handleUsernameChange = (text) => {
    setCardNumber(text);
  };

  const handlePasswordChange = (text) => {
    setSecretNumber(text);
  };

  const handleLogin = () => {

  };

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Métodos de pago</Text>
         <TextInput
        label="Titular de la tarjeta"
        onChangeText={handleUsernameChange}
        value={cardNumber}
        placeholder="jose alcantara"
        mode="outlined"
        outlineColor="purple"
       
      />
      <TextInput
        label="Nºtarjeta"
        onChangeText={handleUsernameChange}
        value={cardNumber}
        placeholder="1234 1234 1234 1234"
        mode="outlined"
        outlineColor="purple"
        keyboardType='numeric'
      />

      <TextInput
        label="Caducidad"
        onChangeText={handlePasswordChange}
        value={cardNumber}
        placeholder="MM/YY"
        mode="outlined"
        outlineColor="purple"
        style={{ marginTop: 10 }}
        keyboardType='numeric'
      />
      <TextInput
        label="Cod.Seguridad"
        onChangeText={handlePasswordChange}
        value={secretNumber}
        placeholder="CVC"
        mode="outlined"
        outlineColor="purple"
        style={{ marginTop: 10 }}
        keyboardType='numeric'
        
      />
      <View style={{ marginTop: 50 }}>
        <Button
          style={styles.button}
         
          mode="outlined"
          color="black"
          onPress={handleLogin}>
          Pago
        </Button>
      </View>
  
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

export default Payment; 
