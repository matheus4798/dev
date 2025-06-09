import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function TrabalhoListScreen() {
  const [Trabalho, setTrabalho] = useState([]);

  const carregarTrabalho = async () => {
    const querySnapshot = await getDocs(collection(db, 'Trabalho'));
    const lista = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    setTrabalho(lista);
  };

  useEffect(() => {
    carregarTrabalho();
  }, []);

  const excluirTrabalho = (id) => {
    Alert.alert(
      "Excluir Trabalho",
      "Tem certeza que deseja excluir este trabalho?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, 'Trabalho', id));
            setTrabalho((prev) => prev.filter((t) => t.id !== id));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabalhos Cadastrados</Text>
      <FlatList
        data={Trabalho}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Nome: {item.nomeAluno}</Text>
              <Text style={styles.cardText}>Trabalho: {item.nomeTrabalho}</Text>
              <Text style={styles.cardText}>Período: {item.valorPeriodo}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => excluirTrabalho(item.id)}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#e6f4ea' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#34a853', marginBottom: 24, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1e1e', marginBottom: 4 },
  cardText: { fontSize: 16, color: '#333' },
  deleteButton: {
    backgroundColor: '#e53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 16
  },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' }
});
