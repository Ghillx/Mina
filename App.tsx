import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Form from './src/Components/Form';

interface Cuenta {
  nombre: string;
  contraseña: string;
  registrosHoras: Array<{
    fecha: string;
    hora: string;
    periodo: string;
    totalHoras: string;
  }>;
}

function App() {
  const [modal, setModal] = useState(false);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [nombreUsuarioSesion, setNombreUsuarioSesion] = useState('');

  const Mayus = /[A-Z]/;
  const Numeros = /[0-9]/;
  const Caracter = /[#$%&@]/;

  const Registrarse = () => {
    if (contraseña.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    } else if (!Mayus.test(contraseña) || !Numeros.test(contraseña) || !Caracter.test(contraseña)) {
      Alert.alert('Error', 'La contraseña debe contener al menos una mayúscula, un número y un carácter especial');
      return;
    }

    // Crear un objeto para representar una cuenta
    const cuentaNueva: Cuenta = {
      nombre,
      contraseña,
      registrosHoras: [], // Inicializa la matriz de registros de horas vacía
    };

    // Agregar la cuenta a la matriz de cuentas
    setCuentas([...cuentas, cuentaNueva]);

    // Limpiar los campos de entrada
    setNombre('');
    setContraseña('');
  };

  const handleLogin = () => {
    if (!nombre || !contraseña) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Verificar si el nombre de usuario y la contraseña coinciden con una cuenta existente
    const cuentaExistente = cuentas.find(
      (cuenta) => cuenta.nombre === nombre && cuenta.contraseña === contraseña
    );

    if (cuentaExistente) {
      // La cuenta existe, muestra un mensaje de inicio de sesión exitoso
      Alert.alert('Inicio de sesión exitoso', '¡Bienvenido!');
      setSesionIniciada(true);
      setNombreUsuarioSesion(nombre); // Guarda el nombre de usuario en el estado

    } else {
      // La cuenta no existe, muestra un mensaje de error
      Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos');
    }

    // Limpiar los campos de inicio de sesión
    setNombre('');
    setContraseña('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Iniciar Sesión</Text>
        {sesionIniciada && <Text style={styles.welcomeText}>Bienvenido, {nombreUsuarioSesion}.</Text>}
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={(text) => setContraseña(text)}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={Registrarse}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.selectHoraButton}
          onPress={() => {
            if (sesionIniciada) {
              setModal(!modal);
            } else {
              Alert.alert('Error', 'Debes iniciar sesión antes de seleccionar la hora.');
            }
          }}
        >
          <Text style={styles.selectHoraText}>Seleccionar hora</Text>
        </TouchableOpacity>
        <Modal animationType="slide" visible={modal}>
          <Form modal={modal} cuenta={cuentas.find(cuenta => cuenta.nombre === nombreUsuarioSesion)} nombreUsuarioSesion={nombreUsuarioSesion} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  welcomeText: {
    fontSize: 20,
    color: '#333333',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 48,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 18,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 32,
  },
  button: {
    width: '48%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectHoraButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  selectHoraText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;