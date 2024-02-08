import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import roomImage from '../../assets/room.jpg';
import image1 from '../../assets/imagen1.png';
import image2 from '../../assets/imagen2.png';
import image3 from '../../assets/imagen3.png';

const Rooms = () => {
  const roomList = [
    {
      name: 'Habitació Superior',
      beds: '1 Cama queen o 2 Cama twin',
      description: '2 camas queen',
      image: roomImage
    },
    {
      name: 'Habitació Premium',
      beds: '2 camas queen',
      description: '2 camas queen',
      image: image1,
      extras: 'Albornoz',
    },
    {
      name: 'Habitació Superior vista',
      beds: '1 habitacio con camas lujosas',
      description: '2 camas queen',
      image: image2,
    },
    {
      name: 'Habitació Familiar Vista',
      beds: '1 habitacio con camas lujosas',
      description: '2 camas queen',
      image: image3,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.llista}> LLISTA HABITACIONS FILTRADES </Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {roomList.map((room, index) => (
          <Card key={index} style={styles.card}>
            {room.image && (
              <View style={styles.imageContainer}>
                <Icon
                  name="chevron-left"
                  size={30}
                  color="white"
                  onPress={() =>
                    setCurrentImageIndex((prevIndex) =>
                      prevIndex < roomList.length - 1 ? prevIndex + 1 : 0
                    )
                  }
                  style={styles.imageIcon}
                />
                <Image source={room.image} style={styles.cardImage} />
                <Icon
                  name="chevron-right"
                  size={30}
                  color="white"
                  onPress={() =>
                    setCurrentImageIndex((prevIndex) =>
                      prevIndex > 0 ? prevIndex - 1 : roomList.length - 1
                    )
                  }
                  style={styles.imageIconRight}
                />
              </View>
            )}
            <Card.Content>
              <Title style={styles.title}>{room.name}</Title>
              {room.beds && (
                <View style={styles.row}>
                  <Icon
                    name="bed"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                  <Text style={styles.text}>{room.beds}</Text>
                </View>
              )}
              {room.description && (
                <Text style={styles.text}>{room.description}</Text>
              )}
              {room.extras && <Text style={styles.text}>{room.extras}</Text>}
            </Card.Content>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                icon="information-outline"
                labelStyle={{
                  fontSize: 15,
                  color: 'white',
                  fontWeight: 'bold',
                }}
                onPress={() => console.log('Hola mundo')}
                style={styles.button}>
                MÉS INFORMACIÓ
              </Button>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 18,
  },
  llista: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'lightyellow',
    marginTop: 27,
    padding: 10, // Agregado para un espacio interno
    textAlign: 'center',
    color: 'green',
    backgroundColor: 'lightcyan', // Fondo del texto
    borderRadius: 8, // Bordes redondeados
  },
  imageIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
  },
  imageIconRight: {
    position: 'absolute',
    zIndex: 1, // Asegura que el ícono esté sobre la imagen
    right: 10,
  },
  imageContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    padding: 3,
    marginTop: 8,
    paddingTop: 30,
  },
  card: {
    marginVertical: 10,
    elevation: 4,
  },
  cardImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    marginBottom: 4,
  },
  button: {
    margin: 8,
    backgroundColor: '#d4afe0',
    justifyContent: 'center',
    borderRadius: 5,
    width: 195,
    height: 45,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    margin: 5,
  },
});

export default Rooms;
