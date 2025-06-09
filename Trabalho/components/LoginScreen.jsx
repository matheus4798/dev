import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha e-mail e senha.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const userEmail = userCredential.user.email;
      const q = query(collection(db, 'usuarios'), where('usuario', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Erro", "Usuário não encontrado no Firestore.");
        return;
      }

      const userTipo = querySnapshot.docs[0].data().tipo;
      navigation.navigate('Main', { tipo: userTipo });

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha no login. Verifique o e-mail e senha.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#e6f4ea'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34a853',
    marginBottom: 32,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#b2d8b0',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16
  },
  button: {
    backgroundColor: '#34a853',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16
  },
  secondaryButton: {
    backgroundColor: '#2e9447'
  }
});
