import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState(''); // aqui será o e-mail
  const [senha, setSenha] = useState('');

  const handleSubmit = async () => {
    if (!nome || !usuario || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      // 🔐 Cria o usuário no Firebase Auth
      await createUserWithEmailAndPassword(auth, usuario, senha);

      // 🗂 Salva os dados no Firestore
      await addDoc(collection(db, 'usuarios'), {
        nome,
        usuario, // salva o e-mail como identificador
        senha   // em app real: nunca salve senha assim

      });

      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      setNome('');
      setUsuario('');
      setSenha('');

      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite o nome" />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} value={usuario} onChangeText={setUsuario} placeholder="Digite o e-mail" autoCapitalize="none" />

      <Text style={styles.label}>Senha:</Text>
      <TextInput style={styles.input} value={senha} onChangeText={setSenha} placeholder="Digite a senha" secureTextEntry />



      <Button title="Cadastrar" onPress={handleSubmit} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, marginTop: 4 }
});
