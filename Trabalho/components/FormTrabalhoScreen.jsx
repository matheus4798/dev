import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function FormTrabalhoScreen() {
  const [nomeAluno, setNomeAluno] = useState("");
  const [nomeTrabalho, setNomeTrabalho] = useState("");
  const [valorPeriodo, setValorPeriodo] = useState("");

  const handleAddTrabalhos = async () => {
    if (!nomeAluno || !nomeTrabalho || !valorPeriodo) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    await addDoc(collection(db, 'Trabalho'), {
      nomeAluno,
      nomeTrabalho,
      valorPeriodo
    });

    setNomeAluno('');
    setNomeTrabalho('');
    setValorPeriodo('');
    Alert.alert("Sucesso", "Trabalho cadastrado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Trabalho</Text>

      <TextInput
        placeholder="Nome do Aluno"
        style={styles.input}
        value={nomeAluno}
        onChangeText={setNomeAluno}
      />
      <TextInput
        placeholder="Nome do Trabalho"
        style={styles.input}
        value={nomeTrabalho}
        onChangeText={setNomeTrabalho}
      />
      <TextInput
        placeholder="Período"
        style={styles.input}
        value={valorPeriodo}
        onChangeText={setValorPeriodo}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTrabalhos}>
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
  input: {
    borderWidth: 1,
    borderColor: '#b2d8b0',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16
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
