import React, { useState, useEffect } from 'react';
import { View, Text,  FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function TemaListScreen() {
  const [Alunos, setAlunos] = useState([]);

  const carregarTema = async () => {
    const querySnapshot = await getDocs(collection(db, 'Alunos'));
    const lista = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    setAlunos(lista);
  };

  useEffect(() => {
    carregarTema();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Temas Cadastrados</Text>
      <FlatList
        data={Alunos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>Nome:{item.nomeTema}</Text>
            <Text style={styles.itemText}>Curso:{item.nomeCurso}</Text>
            <Text style={styles.itemText}>Períodor:{item.valorPeriodo}</Text>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginTop: 10 },
  card: { marginTop: 10, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 6 },
  cardText: { fontWeight: 'bold' },
  delete: { color: 'red', marginTop: 5 },
  itemText: {fontSize: 16}
});
