import { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Divider } from 'react-native-paper';
import ScreenContext from './ScreenContext';

const Payment = (props) => {
  const { theme } = useContext(ScreenContext);
  const [cardOwner, setCardOwner] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleCardOwnerChange = (text) => {
    setCardOwner(text);
  };

  const handleCardNumberChange = (text) => {
    let formattedText = text.replace(/\D/g, '');
    formattedText = formattedText.substring(0, 16);
    setCardNumber(formattedText);
  };

  const handleExpiryChange = (text) => {
    const formattedDate = text
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '$1/$2')
      .replace(/^(\d{2}\/\d{2})\d+$/, '$1');
    setCardDate(formattedDate);
  };

  const handleSecurityCodeChange = (text) => {
    const formattedCode = text.replace(/\D/g, '').substring(0, 3);
    setSecurityCode(formattedCode);
  };

  const handlePayment = () => {
    if (!validateCardNumber(cardNumber)) {
      alert('Número de tarjeta inválido.');
      return;
    }
    if (!validateExpiryDate(cardDate)) {
      alert('Fecha de caducidad inválida.');
      return;
    }
    if (!validateSecurityCode(securityCode)) {
      alert('Código de seguridad inválido.');
      return;
    }
    if (!cardOwner || !cardNumber || !cardDate || !securityCode) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    setCardOwner('');
    setCardNumber('');
    setCardDate('');
    setSecurityCode('');
    alert('¡Tu pago ha sido procesado correctamente!');
  };

  const validateCardNumber = (cardNumber) => {
    return cardNumber.length === 16;
  };

  const validateExpiryDate = (expiryDate) => {
    if (!expiryDate) return false;
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const expiryYear = parseInt('20' + year, 10);
    const expiryMonth = parseInt(month, 10) - 1;
    const expiryDateObject = new Date(expiryYear, expiryMonth, 1);
    return expiryDateObject > currentDate;
  };

  const validateSecurityCode = (securityCode) => {
    return securityCode.length === 3;
  };

  return (
    <View
      style={[
        styles.layout,
        theme === 'black'
          ? { backgroundColor: '#005588' }
          : { backgroundColor: 'lightblue' },
      ]}>
      <Text
        style={[
          styles.title,
          theme === 'black' ? { color: 'white' } : { color: 'black' },
        ]}>
        Realizar pago
      </Text>
      <TextInput
        label="💳 Titular de la tarjeta"
        onChangeText={handleCardOwnerChange}
        value={cardOwner}
        mode="outlined"
        outlineColor="purple"
      />
      <TextInput
        label="🔢 Nº tarjeta"
        onChangeText={handleCardNumberChange}
        value={cardNumber}
        mode="outlined"
        outlineColor="purple"
        keyboardType="numeric"
      />
      <TextInput
        label="📅 Caducidad"
        onChangeText={handleExpiryChange}
        value={cardDate}
        mode="outlined"
        outlineColor="purple"
        keyboardType="numeric"
      />
      <TextInput
        label="🔒 Cod. Seguridad"
        onChangeText={handleSecurityCodeChange}
        value={securityCode}
        mode="outlined"
        outlineColor="purple"
        keyboardType="numeric"
      />
      <View style={styles.swiperBorder} />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="outlined"
          color="black"
          onPress={handlePayment}>
          <Text style={styles.buttonText}>Pagar</Text>
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
  },

  title: {
    color: 'white',
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  buttonContainer: {
    marginTop: 50,
    width: '60%',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: 'orange',
    color: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  swiperBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'purple',
    paddingBottom: 50,
    width: '80%',
    alignSelf: 'center',
  },
});

export default Payment;
