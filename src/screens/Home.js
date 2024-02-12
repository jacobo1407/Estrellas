import React, { useRef, useEffect } from 'react';
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
const images = [
  require('../img/hall.jpg'),
  require('../img/zonaPisci.jpg'),
  require('../img/camas.jpg'),
];
const Home = () => {
  const swiperRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && swiperRef.current.state.total > 1) {
        swiperRef.current.scrollBy(1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [swiperRef]);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Swiper style={styles.carouselWrapper} ref={swiperRef}>
          {images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image
                source={image}
                style={[styles.image, styles.border]}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>

        <View style={styles.containerServicios}>
          <Text style={styles.serviciosTitle}>Servicios del Hotel </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardScrollContainer}>
          <Card style={styles.card}>
            <Image
              source={require('../img/piscina.jpg')}
              style={styles.imageCard}
              resizeMode="cover"
            />
            <Card.Content>
              <Title>Piscina climatizada</Title>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Image
              source={require('../img/masajes.jpg')}
              style={styles.imageCard}
              resizeMode="cover"
            />
            <Card.Content>
              <Title style={styles.text}>Masajes</Title>
            </Card.Content>
          </Card>
        </ScrollView>
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
    height: 300,
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
  imageCard: {
    marginTop: 7,
    width: 285,
    flex: 1,
    borderRadius: 5,
  },
  containerServicios: {
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  serviciosTitle: {
    fontSize: 24,
  },
  text: {
    fontFamily: 'Rosariva',
    fontSize: 20,
  },
  containerServicios: {
    marginTop: '20',
    alignItems: 'center',
  },
  cardScrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  card: {
    flex: 1,
    width: 300, // Ajusta el ancho según tus necesidades
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
