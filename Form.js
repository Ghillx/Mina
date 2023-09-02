
import React, { useState } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    Modal,
    Pressable,
  } from 'react-native';
  import { Picker } from '@react-native-picker/picker';
  import Consultas from './Consultas';
  
  const Form = ({ modal, cuenta, nombreUsuarioSesion }) => {
  
      
    const [next,setNext] = useState(false);
  
   
  
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [hora2, setHora2] = useState('');
  
    const [periodo, setPeriodo] = useState('AM');
    const [totalHoras, setTotalHoras] = useState('');
  
    const registrarHoras = () => {
      if (!fecha || !hora || !periodo) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return;
      }
  
      // Construir un objeto que represente el registro de horas
      const nuevoRegistro = {
        fecha,
        hora,
        hora2,
        periodo,
        totalHoras,
      };
  
      if (cuenta) {
        // Agregar el registro de horas a la cuenta actual
        
        cuenta.registrosHoras.push(nuevoRegistro);
      } else {
        Alert.alert('Error', 'Debes iniciar sesión antes de registrar las horas.');
      }
  
      // Limpiar los campos después de registrar las horas
      setFecha('');
      setHora('');
      setHora2('');
      setPeriodo('AM');
      setTotalHoras('');
    };
  
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>Ingreso de horas</Text>
            {nombreUsuarioSesion && (
              <Text>Bienvenido, {nombreUsuarioSesion}.</Text>
            )}
            <TextInput
              placeholder="Ingresa fecha MM/DIA/AÑO"
              value={fecha}
              onChangeText={(text) => setFecha(text)}
            />
            <TextInput
              placeholder="Ingresa la hora de entrada"
              value={hora}
              onChangeText={(text) => setHora(text)}
            />
            <Picker
              selectedValue={periodo}
              onValueChange={(value) => setPeriodo(value)}
            >
              <Picker.Item label="AM" value="AM" />
              <Picker.Item label="PM" value="PM" />
            </Picker>
            <TextInput
              placeholder="Ingresa la hora de salida"
              value={hora2}
              onChangeText={(text) => setHora2(text)}
            ></TextInput>
            <Button title="Registrar Horas" onPress={registrarHoras} />
            <Pressable
            onPress={() => setNext(!next)}
          >
            <Text>Consultas</Text>
            </Pressable>
                <Modal animationType='slide' visible={next}>
               <Consultas cuenta={cuenta} />
              </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Form;