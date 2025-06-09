import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function TemaListScreen() {
  const [Tema, setTema] = useState([]);

  const carregarTema = async () => {
    const querySnapshot = await getDocs(collection(db, 'Tema'));
    const lista = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    setTema(lista);
  };

  useEffect(() => {
    carregarTema();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temas Cadastrados</Text>
      <FlatList
        data={Tema}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nome: {item.nomeTema}</Text>
            <Text style={styles.cardText}>Curso: {item.nomeCurso}</Text>
            <Text style={styles.cardText}>Período: {item.valorPeriodo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#e6f4ea'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34a853',
    marginBottom: 24,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 4
  },
  cardText: {
    fontSize: 16,
    color: '#333'
  }
});
