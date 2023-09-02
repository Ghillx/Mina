import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, Alert } from 'react-native';

const Consultas = ({ next, cuenta }) => {
  const [inicio, setInicio] = useState('');
  const [final, setFinal] = useState('');
  const [registrosHoras, setRegistrosHoras] = useState([]);
  const [incapacidadInicio, setIncapacidadInicio] = useState('');
  const [incapacidadFin, setIncapacidadFin] = useState('');
  const [licenciaHoras, setLicenciaHoras] = useState('');
  const [vacacionesDias, setVacacionesDias] = useState('');

  const cargarRegistros = () => {
    if (!inicio || !final) {
      Alert.alert('Error', 'Por favor, completa las fechas de inicio y final.');
      return;
    }

    if (cuenta) {
      const registrosFiltrados = cuenta.registrosHoras.filter((registro) => {
        const fechaRegistro = new Date(registro.fecha);
        return fechaRegistro >= new Date(inicio) && fechaRegistro <= new Date(final);
      });

      setRegistrosHoras(registrosFiltrados);
    } else {
      Alert.alert('Error', 'Debes iniciar sesión antes de consultar las horas.');
    }
  };

  const agregarIncapacidad = () => {
    if (!incapacidadInicio || !incapacidadFin) {
      Alert.alert('Error', 'Por favor, completa las fechas de incapacidad.');
      return;
    }

    if (cuenta) {
      const fechaInicio = new Date(incapacidadInicio);
      const fechaFin = new Date(incapacidadFin);
      const diasIncapacidad = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));

      if (diasIncapacidad >= 1 && diasIncapacidad <= 15) {
        cuenta.registrosHoras.push({
          fecha: incapacidadInicio,
          hora: '00:00', // Hora de inicio de la incapacidad
          periodo: 'AM', // Periodo por defecto para la incapacidad
          totalHoras: `${diasIncapacidad * 24}`, // Total de horas basado en días
        });

        Alert.alert('Éxito', 'Se ha registrado la incapacidad.');
      } else {
        Alert.alert('Error', 'La incapacidad debe ser de 1 a 15 días.');
      }
    } else {
      Alert.alert('Error', 'Debes iniciar sesión antes de registrar la incapacidad.');
    }
  };

  const agregarLicencia = () => {
    if (!licenciaHoras) {
      Alert.alert('Error', 'Por favor, ingresa la cantidad de horas de licencia.');
      return;
    }

    if (cuenta) {
      const horasLicencia = parseInt(licenciaHoras, 10);

      if (horasLicencia > 8) {
        // Convertir la licencia en vacaciones si excede las 8 horas.
        const diasVacaciones = Math.ceil(horasLicencia / 24);
        if (diasVacaciones >= 1 && diasVacaciones <= 15) {
          cuenta.registrosHoras.push({
            fecha: new Date().toLocaleDateString(),
            hora: '00:00', // Hora de inicio de las vacaciones
            periodo: 'AM', // Periodo por defecto para las vacaciones
            totalHoras: `${horasLicencia}`, // Total de horas
          });

          Alert.alert('Éxito', 'Se ha registrado la licencia como vacaciones.');
        } else {
          Alert.alert('Error', 'Las vacaciones deben ser de 1 a 15 días.');
        }
      } else {
        cuenta.registrosHoras.push({
          fecha: new Date().toLocaleDateString(),
          hora: '00:00', // Hora de inicio de la licencia
          periodo: 'AM', // Periodo por defecto para la licencia
          totalHoras: `${horasLicencia}`, // Total de horas
        });

        Alert.alert('Éxito', 'Se ha registrado la licencia.');
      }
    } else {
      Alert.alert('Error', 'Debes iniciar sesión antes de registrar la licencia.');
    }
  };

  const agregarVacaciones = () => {
    if (!vacacionesDias) {
      Alert.alert('Error', 'Por favor, ingresa la cantidad de días de vacaciones.');
      return;
    }

    if (cuenta) {
      const diasVacaciones = parseInt(vacacionesDias, 10);

      if (diasVacaciones >= 1 && diasVacaciones <= 15) {
        cuenta.registrosHoras.push({
          fecha: new Date().toLocaleDateString(),
          hora: '00:00', // Hora de inicio de las vacaciones
          periodo: 'AM', // Periodo por defecto para las vacaciones
          totalHoras: `${diasVacaciones * 24}`, // Total de horas basado en días
        });

        Alert.alert('Éxito', 'Se han registrado las vacaciones.');
      } else {
        Alert.alert('Error', 'Las vacaciones deben ser de 1 a 15 días.');
      }
    } else {
      Alert.alert('Error', 'Debes iniciar sesión antes de registrar las vacaciones.');
    }
  };

  return (
   
    <View style={styles.container}>
        <Text>Consulta de Horas Trabajadas</Text>
        <TextInput
          placeholder="Fecha de Inicio"
          value={inicio}
          onChangeText={(text) => setInicio(text)}
        />
        <TextInput
          placeholder="Fecha Final"
          value={final}
          onChangeText={(text) => setFinal(text)}
        />
        <Button title="Cargar Registros" onPress={cargarRegistros} />
        
        <Text>Agregar Novedades</Text>
        
        <TextInput
          placeholder="Fecha de Inicio de Incapacidad"
          value={incapacidadInicio}
          onChangeText={(text) => setIncapacidadInicio(text)}
        />
        <TextInput
          placeholder="Fecha de Fin de Incapacidad"
          value={incapacidadFin}
          onChangeText={(text) => setIncapacidadFin(text)}
        />
        <Button title="Agregar Incapacidad" onPress={agregarIncapacidad} />
        
        <TextInput
          placeholder="Horas de Licencia"
          value={licenciaHoras}
          onChangeText={(text) => setLicenciaHoras(text)}
        />
        <Button title="Agregar Licencia" onPress={agregarLicencia} />

        <TextInput
          placeholder="Días de Vacaciones"
          value={vacacionesDias}
          onChangeText={(text) => setVacacionesDias(text)}
        />
        <Button title="Agregar Vacaciones" onPress={agregarVacaciones} />

        {/* Mostrar los registros de horas */}
        <FlatList
          data={registrosHoras}
          keyExtractor={(item) => item.fecha}
          renderItem={({ item }) => (
            <View style={styles.record}>
              <Text>Fecha: {item.fecha}</Text>
              <Text>Hora: {item.hora}</Text>
              <Text>Total Horas: {item.totalHoras}</Text>
              {/* Mostrar otros detalles de los registros */}
            </View>
          )}
        />
      </View>
    
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  record: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
};

export default Consultas;