import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState(''); // e-mail
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('aluno'); // tipo de usuário (padrão: aluno)

  const handleSubmit = async () => {
    if (!nome || !usuario || !senha || !tipo) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, usuario, senha);

      await addDoc(collection(db, 'usuarios'), {
        nome,
        usuario,
        tipo, // 👈 salva o tipo de usuário
        // ⚠️ não é recomendável salvar a senha no Firestore
      });

      Alert.alert("Sucesso", "Usuário criado com sucesso!");
      setNome('');
      setUsuario('');
      setSenha('');
      setTipo('aluno');

      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Digite o e-mail"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite a senha"
        secureTextEntry
      />

      <Text style={styles.label}>Tipo de Usuário:</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Aluno" value="aluno" />
        <Picker.Item label="Administrador" value="administrador" />
        <Picker.Item label="Avaliador" value="avaliador" />
      </Picker>

      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 4
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 4,
    backgroundColor: '#f0f0f0'
  }
});
