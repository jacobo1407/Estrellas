import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Rooms = (props) => {
  const [roomImages, setRoomImages] = useState([]);
  const [id, setId] = useState(2);
  const [description, setDescription] = useState('');
  const [peopleNumber, setPeopleNumber] = useState(null);
  const [price, setPrice] = useState(null);
  const [beds, setBeds] = useState(null);
  const [m2, setM2] = useState(null);
  const [index, setIndex] = useState(0);

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
        const beds = data.beds;
        const m2 = data.m2;

        setDescription(description);
        setPeopleNumber(numPeople);
        setPrice(price);
        setBeds(beds);
        setRoomImages(images);
        setM2(m2);
      } else {
        Alert.alert('Error', `Failed to fetch Room`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FeatureRow = ({ iconName, label, value }) => (
    <View style={styles.column}>
      <Icon name={iconName} size={15} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
    </View>
  );

  const RoomFeatures = ({ peopleNumber, beds, m2 }) => (
    <View style={styles.featuresContainer}>
      <FeatureSquare>
        <FeatureRow iconName="coffee" label="Breakfast" />
      </FeatureSquare>
      <FeatureSquare>
        <FeatureRow iconName="television" label="32'' TV" />
      </FeatureSquare>
      <FeatureSquare>
        <FeatureRow iconName="usb" label="Bedsite USB charging" />
      </FeatureSquare>
      <FeatureSquare>
        <FeatureRow iconName="users" label="Persons:" value={peopleNumber} />
      </FeatureSquare>
      <FeatureSquare>
        <FeatureRow iconName="bed" label="Beds:" value={beds} />
      </FeatureSquare>
      <FeatureSquare>
        <FeatureRow iconName="bed" label="Meters Square:" value={m2} />
      </FeatureSquare>
    </View>
  );
  const FeatureSquare = ({ children }) => (
    <View style={styles.square}>{children}</View>
  );

  const renderImages = () => {
    return roomImages.map((image, idx) => (
      <View key={idx} style={styles.slide}>
        <Image
          source={{ uri: `data:image/png;base64,${image}` }}
          style={[styles.image, styles.border]}
        />
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Swiper
          style={styles.swiper}
          showsButtons={false}
          loop={false}
          index={index}
          onIndexChanged={(newIndex) => setIndex(newIndex)}
          showsPagination={true}>
          {renderImages()}
        </Swiper>
        <View style={styles.container}>
          <View style={styles.swiperBorder} />
          <View style={styles.descriptionContainer}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Description
            </Text>
            <Text style={{ textAlign: 'center' }}>{description}</Text>
            <View style={styles.swiperBorder2} />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Information
            </Text>
            <RoomFeatures
              peopleNumber={peopleNumber}
              price={price}
              beds={beds}
              m2={m2}
            />
          </View>
          <View style={{backgroundColor: 'white', margin: 30, borderRadius: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.price}>{price} </Text>
              <Icon name="eur" size={40} style={{ color: 'purple' }} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => props.navigation.navigate('Home')}>
                RERSERVAR
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  swiper: {
    height: 500,
    backgroundColor: 'lightblue',
    marginBottom: -200,
  },
  swiperBorder: {
    borderBottomWidth: 3,
    borderBottomColor: 'purple',
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  swiperBorder2: {
    borderBottomWidth: 3,
    borderBottomColor: 'purple',
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  border: {
    borderWidth: 2,
    borderColor: 'white',
  },
  descriptionContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    alignItems: 'center',
    marginBottom: -370,
  },
  featuresContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  square: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    padding: 5,
    borderRadius: 2,
    margin: 2,
    alignItems: 'center',
  },
  column: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 10,
    marginRight: 5,
  },
  value: {
    fontWeight: 'bold',
  },
  price: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'purple',
  },
  button: {
    backgroundColor: '#d4afe0',
    width: '50%',
    marginBottom: 20,
  },
});

export default Rooms;
