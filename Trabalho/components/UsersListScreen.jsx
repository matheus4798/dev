import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function UsersListScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsuarios(usersList);
      } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#34a853" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nome: {item.nome}</Text>
            <Text style={styles.cardText}>Usuário: {item.usuario}</Text>
            <Text style={styles.cardText}>Tipo: {item.tipo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum usuário cadastrado.</Text>}
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666'
  }
});
