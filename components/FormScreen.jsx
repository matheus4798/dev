import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function AlugueisForm() {
    const [nomeCarro, setNomeCarro] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [valorAluguel, setValorAluguel] = useState("");
  const [data, setData] = useState("");

  const handleAddAluguel = async () => {
    if (!nomeCarro || !nomeCliente || !valorAluguel || !data) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    await addDoc(collection(db, 'alugueis'), {
      nomeCarro,
      nomeCliente,
      valorAluguel,
      data
    });
    setNomeCarro('');
    setNomeCliente('');
    setValorAluguel('');
    setData('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Aluguel</Text>
      <TextInput placeholder="Nome do cliente" style={styles.input} value={nomeCliente} onChangeText={setNomeCliente} />
      <TextInput placeholder="Nome do carro" style={styles.input} value={nomeCarro} onChangeText={setNomeCarro} />
      <TextInput placeholder="Data" style={styles.input} value={data} onChangeText={setData} />
      <TextInput placeholder="Valor" style={styles.input} value={valorAluguel} onChangeText={setValorAluguel} />
      <Button title="Cadastrar" onPress={handleAddAluguel} />
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
