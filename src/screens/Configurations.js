import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '../Services/i18n'; // Importa i18n desde tu archivo de configuración

const ConfigurationsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language); // Actualiza el estado del idioma al montar el componente
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en'; // Usamos el estado del idioma actual
    console.log('Nuevo idioma:', newLanguage); // Comprobamos el nuevo idioma
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage); // Actualizamos el estado del idioma después de cambiarlo
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>

      <Text style={styles.title}>{i18n.t('settings')}</Text>
      <View style={styles.option}>
        <Text>{i18n.t('darkMode')}</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
      <View style={styles.option}>
        <TouchableOpacity onPress={toggleLanguage}>
          <Text style={styles.languageButton}>{currentLanguage === 'es' ? 'English' : 'Español'}</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  sectionContainer: {
    padding: 20,
    marginBottom: 20,
    borderRadius:4,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 15,
  },
  languageButton: {
    color: 'blue',
  },
});

export default ConfigurationsScreen;
