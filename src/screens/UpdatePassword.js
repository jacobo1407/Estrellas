import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ScreenContext from './ScreenContext';

const UpdatePassword = ({ navigation }) => {
  const { theme, email } = useContext(ScreenContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showWarningPass, setShowWarningPass] = useState(false);
  const [showWarningConfirmPass, setShowWarningConfirmPass] = useState(false);
  const [warningPass, setWarningPass] = useState('');
  const [warningConfirmPass, setWarningConfirmPass] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = () => {
    const haveUpperCase = /[A-Z]/.test(password);
    const haveNumber = /\d/.test(password);
    const haveCharacterSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      password
    );
    const longValid = password.length >= 8;

    return haveUpperCase && haveNumber && haveCharacterSpecial && longValid;
  };

  const handleUpdatePass = () => {
    if (password != '') {
      if (validatePassword()) {
        if (password == confirmPassword) {
          handlePutUpdatePassword();
        } else {
          setShowWarningConfirmPass(true);
          setWarningConfirmPass('Las contraseñas no coinciden.');
        }
      } else {
        setShowWarningPass(true);
        setWarningPass(
          'La contraseña no es válida. \nDebe de contener almenos: \n\t8 caracteres \n\t1 letra mayúscula \n\t1 número \n\t1 carácter especial.'
        );
      }
    } else {
      setWarningPass('La contraseña no debe estar vacía');
    }
  };

  const handlePutUpdatePassword = () => {
    let url = `http://44.195.98.192:8080/ESTRELLAS/updatePassword`;
    let body = {
      email: email,
      password: password,
    };

    postData(url, body);
  };

  const postData = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        if (response.status === 204) {
          Alert.alert(
            'Información',
            'Se ha actualizado la contraseña correctamente.'
          );
          navigation.navigate('LogIn');
          return { status: response.status, data: null };
        } else {
          const responseData = await response.json();
          return { status: response.status, data: responseData };
        }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There was a problem with the PUT request:', error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        theme === 'black' ? styles.containerDark : styles.containerLight,
      ]}>
      <Text
        style={[
          styles.title,
          theme === 'black' ? styles.titleDark : styles.titleLight,
        ]}>
        Nueva contraseña:
      </Text>
      <TextInput
        label="🔒 Contraseña"
        onChangeText={(text) => {
          setPassword(text);
          if (showWarningPass) {
            setShowWarningPass(false);
          }
        }}
        value={password}
        placeholder="Introduce Contraseña"
        mode="outlined"
        outlineColor={theme === 'black' ? 'white' : 'purple'}
        style={{ marginTop: 10, marginBottom: 20 }}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            name={showPassword ? 'eye-off' : 'eye'}
            color={theme === 'black' ? 'white' : 'black'}
            onPress={togglePasswordVisibility}
          />
        }
      />
      {showWarningPass ? (
        <Text style={{ fontSize: 15, color: 'red' }}>{warningPass}</Text>
      ) : null}
      <Text
        style={[
          styles.title,
          theme === 'black' ? styles.titleDark : styles.titleLight,
        ]}>
        Confirmar nueva contraseña:
      </Text>
      <TextInput
        label="🔒 Confirmar contraseña"
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (setShowWarningConfirmPass) {
            setShowWarningConfirmPass(false);
          }
        }}
        value={confirmPassword}
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
      {showWarningConfirmPass ? (
        <Text style={{ fontSize: 15, color: 'red' }}>{warningConfirmPass}</Text>
      ) : null}
      <View style={{ marginTop: 30 }}>
        <Button
          style={styles.button}
          mode="contained"
          icon="update"
          color={theme === 'black' ? 'white' : 'black'}
          onPress={handleUpdatePass}>
          Actualizar Contraseña
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#001122',
  },
  containerLight: {
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
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
});

export default UpdatePassword;
