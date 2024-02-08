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
const images = [];
const Rooms = (props) => {
  const [roomImages, setRoomImages] = useState([]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Swiper style={styles.carouselWrapper} ref={swiperRef}>
          {images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image
                source={roomImages}
                style={[styles.image, styles.border]}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
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
});

export default Rooms;
