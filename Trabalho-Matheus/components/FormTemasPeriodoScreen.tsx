import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function FormTemasPeriodoScreen() {
    const [nomeCurso, setNomeCurso] = useState("");
  const [nomeTema, setNomeTema] = useState("");
  const [valorPeriodo, setValorPeriodo] = useState("");

  const handleAddTema = async () => {
    if (!nomeCurso || !nomeTema || !valorPeriodo ) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    await addDoc(collection(db, 'Tema'), {
      nomeCurso,
      nomeTema,
      valorPeriodo,
    });
    setNomeCurso('');
    setNomeTema('');
    setValorPeriodo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Tema e período:</Text>
      <TextInput placeholder="Nome do Curso" style={styles.input} value={nomeCurso} onChangeText={setNomeCurso} />
      <TextInput placeholder="Nome do Tema" style={styles.input} value={nomeTema} onChangeText={setNomeTema} />
      <TextInput placeholder="Periodo" style={styles.input} value={valorPeriodo} onChangeText={setValorPeriodo} />
      <Button title="Cadastrar" onPress={handleAddTema} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginTop: 10 },
  card: { marginTop: 10, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 6 },
  cardText: { fontWeight: 'bold' },
  delete: { color: 'red', marginTop: 5 }
});
