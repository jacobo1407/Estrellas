import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const DATA = [
  { id: 1, date: '01/01/2022', adults: 2, children: 0 },
  { id: 2, date: '01/02/2022', adults: 1, children: 2 },
  { id: 3, date: '01/03/2022', adults: 3, children: 1 },
];

const ActiveFilters = (props) => {
  const [selectedDateEntrada, setSelectedDateEntrada] = useState(new Date());
  const [selectedDateSalida, setSelectedDateSalida] = useState(new Date());
  const [isDatePickerVisibleEntrada, setDatePickerVisibilityEntrada] =
    useState(false);
  const [isDatePickerVisibleSalida, setDatePickerVisibilitySalida] =
    useState(false);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);

  const handleConfirmDateEntrada = (date) => {
    setSelectedDateEntrada(date);
    hideDatePickerEntrada();
  };

  const handleConfirmDateSalida = (date) => {
    setSelectedDateSalida(date);
    hideDatePickerSalida();
  };

  const showDatePickerEntrada = () => {
    setDatePickerVisibilityEntrada(true);
  };

  const hideDatePickerEntrada = () => {
    setDatePickerVisibilityEntrada(false);
  };

  const showDatePickerSalida = () => {
    setDatePickerVisibilitySalida(true);
  };

  const hideDatePickerSalida = () => {
    setDatePickerVisibilitySalida(false);
  };

  return (
     <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      
        <View style={styles.icon}>
          <Icon name="cog-outline" size={24} color="black" />
        </View>
        <Text style={styles.filterButtonText}>Criterios de busqueda</Text>
    

      <View style={styles.dateContainer}>
        <View style={styles.dates}>
          <Text style={styles.datePickerLabel}>Introduce fechas</Text>
          <View style={styles.calendar}>
            <Icon name="calendar" size={24} color="black" />
          </View>
        </View>
        <TouchableOpacity onPress={showDatePickerEntrada}>
          <Text style={styles.dateLabelText}>Fecha de entrada:</Text>
          <Text style={styles.selectedDateText}>
            {selectedDateEntrada.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleEntrada}
          mode="date"
          onConfirm={handleConfirmDateEntrada}
          onCancel={hideDatePickerEntrada}
        />

        <TouchableOpacity onPress={showDatePickerSalida}>
          <Text style={styles.dateLabelText}>Fecha de salida:</Text>
          <Text style={styles.selectedDateText}>
            {selectedDateSalida.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleSalida}
          mode="date"
          onConfirm={handleConfirmDateSalida}
          onCancel={hideDatePickerSalida}
        />
      </View>

      <View style={styles.peopleContainer}>
        <View style={styles.people}>
          <Icon name="account" size={24} color="black" />
          <Text style={styles.personsLabel}>Select People</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adultos</Text>
          <Button
            onPress={() => setNumAdults(numAdults - 1)}
            icon="minus"
            labelStyle={{
              fontSize: 16,
              color: '#16C4F3',
              fontWeight: 'bold',
            }}
            style={styles.button}
            disabled={numAdults === 1}></Button>
          <Text style={styles.value}>{numAdults}</Text>
          <Button
            onPress={() => setNumAdults(numAdults + 1)}
            icon="plus"
            labelStyle={{
              fontSize: 16,
              color: '#16C4F3',
              fontWeight: 'bold',
            }}
            style={styles.button}></Button>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Niños</Text>
          <Button
            onPress={() => setNumChildren(numChildren - 1)}
            icon="minus"
            labelStyle={{
              fontSize: 16,
              color: '#16C4F3',
              fontWeight: 'bold',
            }}
            style={styles.button}
            disabled={numChildren === 0}></Button>
          <Text style={styles.value}>{numChildren}</Text>
          <Button
            onPress={() => setNumChildren(numChildren + 1)}
            icon="plus"
            labelStyle={{
              fontSize: 16,
              color: '#16C4F3',
              fontWeight: 'bold',
            }}
            style={styles.button}></Button>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => props.navigation.navigate('ActiveFilters')}
          icon="filter"
          labelStyle={{
            fontSize: 14,
            color: 'white',
            fontWeight: 'bold',
          }}
          style={styles.filter}>
          APLICAR FILTRES
        </Button>
      </View>
    </View>
      </ScrollView>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'lightblue',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'darkred',
  },
  calendar: {
    marginLeft: 10,
  },
  people: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 0.6,
    width: 310,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowOpacity: 0.25,
    elevation: 5,
  },
  peopleContainer: {
    flex: 0.6,
    padding: 22,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dateLabelText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  selectedDateText: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    borderWidth: 2,
    padding: 8,
    borderRadius: 5,
    borderColor: '#3498db',
    color: '#3498db',
  },
  personsLabel: {
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
    fontSize: 18,
  },
  filter: {
    width: 200,
    height: 40,
    marginTop: 20,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowRadius: 3,
  },
  filterButton: {
    width: 190,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Rosarivo',
  },
  icon: {
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: 270,
    padding: 6,
  },
  label: {
    flex: 1,
  },
  value: {
    width: 50,
    textAlign: 'center',
  },
});

export default ActiveFilters;