import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('aluno');

  const handleSubmit = async () => {
    if (!nome || !usuario || !senha || !tipo) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, usuario, senha);
      await addDoc(collection(db, 'usuarios'), { nome, usuario, tipo });
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      setNome('');
      setUsuario('');
      setSenha('');
      setTipo('aluno');
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Digite o e-mail"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite a senha"
        secureTextEntry
      />

      <Text style={styles.label}>Tipo de Usuário</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={tipo}
          onValueChange={setTipo}
          style={styles.picker}
        >
          <Picker.Item label="Aluno" value="aluno" />
          <Picker.Item label="Administrador" value="administrador" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#e6f4ea',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34a853',
    marginBottom: 32,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 6,
    marginTop: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#b2d8b0',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    fontSize: 16
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#b2d8b0',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginBottom: 20
  },
  picker: {
    height: 50,
    width: '100%',
    fontSize: 16
  },
  button: {
    backgroundColor: '#34a853',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
