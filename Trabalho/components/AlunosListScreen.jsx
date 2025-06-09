import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function AlunosListScreen() {
  const [Alunos, setAlunos] = useState([]);

  const carregarAlunos = async () => {
    const querySnapshot = await getDocs(collection(db, 'Alunos'));
    const lista = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    setAlunos(lista);
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const excluirAluno = (id) => {
    Alert.alert(
      "Excluir Aluno",
      "Tem certeza que deseja excluir este aluno?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, 'Alunos', id));
            setAlunos((prev) => prev.filter((a) => a.id !== id));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alunos Cadastrados</Text>
      <FlatList
        data={Alunos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Nome: {item.nomeAluno}</Text>
              <Text style={styles.cardText}>Curso: {item.nomeCurso}</Text>
              <Text style={styles.cardText}>Período: {item.valorPeriodo}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => excluirAluno(item.id)}>
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
