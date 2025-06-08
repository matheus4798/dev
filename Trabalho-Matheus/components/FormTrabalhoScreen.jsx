import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function FormTrabalhoScreen() {
    const [nomeAluno, setNomeAluno] = useState("");
    const [nomeTrabalho, setnomeTrabalho] = useState("");
    const [valorPeriodo, setValorPeriodo] = useState("");


    const handleAddTrabalhos = async () => {
        if (!nomeAluno || !nomeTrabalho || !valorPeriodo) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }
        await addDoc(collection(db, 'Trabalho'), {
            nomeAluno,
            nomeTrabalho,
            valorPeriodo,
        });
        setNomeAluno('');
        setnomeTrabalho('');
        setValorPeriodo('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Aluno</Text>
            <TextInput placeholder="Nome do Aluno" style={styles.input} value={nomeAluno} onChangeText={setNomeAluno} />
            <TextInput placeholder="Nome do Trabalho" style={styles.input} value={nomeTrabalho} onChangeText={setnomeTrabalho} />
            <TextInput placeholder="Periodo" style={styles.input} value={valorPeriodo} onChangeText={setValorPeriodo} />
            <Button title="Cadastrar" onPress={handleAddTrabalhos} />
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
