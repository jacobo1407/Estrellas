import { useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import ScreenContext from './ScreenContext';

const ForgotPassword = ({ navigation }) => {
  const { theme, email, setEmail } = useContext(ScreenContext);
  const [code, setCode] = useState('');
  const [codeInsert, setCodeInsert] = useState('');
  const [timeRemain, setTimeRemain] = useState(30);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [warningConfirmEmail, setWarningConfirmEmail] = useState('');
  const [showWarningCode, setShowWarningCode] = useState(false);
  const [warning, setWarning] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    if (showWarning) {
      setShowWarning(false);
    }
  };

  const handlePostEmail = () => {
    let url = 'http://44.195.98.192:8080/ESTRELLAS/emailConfirmation';
    setButtonEnabled(false);
    let body = email;
    postDataEmail(url, body);

    setTimeRemain(30);
    const intervalId = setInterval(() => {
      setTimeRemain((prevTiempo) => {
        if (prevTiempo > 0) {
          return prevTiempo - 1;
        } else {
          clearInterval(intervalId);
          setButtonEnabled(true);
          return 0;
        }
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setTimeRemain(30);
      setButtonEnabled(true);
    }, 30000);
  };

  const postDataEmail = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: body,
      });
      console.log(response);
      if (response.ok) {
        setShowConfirmEmail(true);
        const codigoRecibido = await response.text();
        setCode(codigoRecibido);
        return { status: response.status, data: codigoRecibido };
      } else {
        setShowWarning(true);
        setWarning('No se ha encontrado el correo electronico.');
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
    }
  };

  const handleRegister = () => {
    if (!showConfirmEmail) {
      handlePostEmail();
    } else {
      if (codeInsert == code) {
        navigation.navigate('UpdatePassword');
      } else {
        setWarningConfirmEmail('Código introducido no válido');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          styles.container,
          theme === 'black'
            ? { backgroundColor: '#005588' }
            : { backgroundColor: 'lightblue' },
        ]}>
        <View styles={styles.containerBotton}>
          <Text
            style={[
              styles.text,
              theme === 'black' ? { color: 'white' } : { color: 'black' },
            ]}>
            Introduce correo electrónico de la cuenta que desea recuperar.
          </Text>
          <TextInput
            label="📧 Correo electrónico"
            onChangeText={handleEmailChange}
            value={email}
            placeholder="Introduce correo"
            mode="outlined"
            outlineColor={theme === 'black' ? 'white' : 'purple'}
          />
          {showConfirmEmail ? (
            <View style={styles.confirmCode}>
              <Text
                style={[
                  styles.usuari,
                  theme === 'black' ? { color: 'white' } : { color: 'black' },
                ]}>
                CONFIRMACIÓN DE REGISTRO:
              </Text>
              {!buttonEnabled ? (
                <Text style={{ fontSize: 15, color: 'red' }}>
                  Espera {timeRemain}s para volver a intentar
                </Text>
              ) : null}
              <Text
                style={[
                  { marginTop: 10, fontSize: 20 },
                  theme === 'black' ? { color: 'white' } : { color: 'black' },
                ]}>
                Introduce el código:
              </Text>
              <TextInput
                style={styles.inputCode}
                onChangeText={(text) => {
                  setCodeInsert(text);
                  if (showWarningCode) {
                    setShowWarningCode(false);
                  }
                }}
                placeholder="Introduce el código"
                value={codeInsert}
                mode="outlined"
                outlineColor="#d4afe0"
              />
              <Text style={{ fontSize: 15, color: 'red' }}>
                {warningConfirmEmail}
              </Text>
              <Button
                disabled={!buttonEnabled}
                mode="contained"
                style={{ backgroundColor: 'blue' }}
                onPress={() => handlePostEmail(email)}>
                VOLVER A ENVIAR CÓDIGO
              </Button>
            </View>
          ) : null}
          {showWarning ? (
            <Text style={{ fontSize: 15, color: 'red', marginBottom: 10 }}>
              {warning}
            </Text>
          ) : null}
          <Button
            style={styles.button}
            mode="contained"
            icon="lock"
            onPress={handleRegister}>
            RECUPERAR CONTRASEÑA
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  usuari: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Rosarivo',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#d4afe0',
  },
  confirmCode: {
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    marginTop: 10,
  },
  inputCode: {
    width: '100%',
  },
});

export default ForgotPassword;
