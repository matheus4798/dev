import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function AlunosFormScreen() {
    const [nomeAluno, setNomeAluno] = useState("");
  const [nomeCurso, setNomeCurso] = useState("");
  const [valorPeriodo, setValorPeriodo] = useState("");


  const handleAddAlunos = async () => {
    if (!nomeAluno || !nomeCurso|| !valorPeriodo ) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    await addDoc(collection(db, 'Alunos'), {
      nomeAluno,
      nomeCurso,
      valorPeriodo,
    });
    setNomeAluno('');
    setNomeCurso('');
    setValorPeriodo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Aluno</Text>
      <TextInput placeholder="Nome do Aluno" style={styles.input} value={nomeAluno} onChangeText={setNomeAluno} />
      <TextInput placeholder="Nome do Curso" style={styles.input} value={nomeCurso} onChangeText={setNomeCurso} />
      <TextInput placeholder="Periodo" style={styles.input} value={valorPeriodo} onChangeText={setValorPeriodo} />
      <Button title="Cadastrar" onPress={handleAddAlunos} />
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
