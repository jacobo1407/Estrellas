import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Card, Title, Paragraph } from 'react-native-paper';

const Rooms = (props) => {
  const [roomImages, setRoomImages] = useState([]);
  const [id, setId] = useState(1);
  const [description, setDescription] = useState('');
  const [peopleNumber, setPeopleNumber] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await fetch(
        `http://44.195.98.192:8080/ESTRELLAS/roomInformation?id=${id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const images = data.images;
        const description = data.description;
        const numPeople = data.peopleNumber;
        const price = data.price;

        setDescription(description);
        setPeopleNumber(numPeople);
        setPrice(price);
        setRoomImages(images);
      } else {
        Alert.alert('Error', `Failed to fetch Room`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Swiper style={styles.carouselWrapper}>
          {roomImages.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image
                source={{ uri: `data:image/jpg;base64,${image}` }}
                style={[styles.image, styles.border]}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
        <Text> Description </Text>
        <Text>{description} </Text>
        <Text>Num. de personas: {peopleNumber}</Text>
        <Text>Precio: {price}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  carouselWrapper: {
    height: 500,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 10,
    width: '95%',
    flex: 1,
    borderRadius: 5,
  },
  border: {
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default Rooms;