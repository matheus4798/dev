import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegisterScreen from "./RegisterScreen";
import UsersListScreen from "./UsersListScreen";
import AlunosFormScreen from "./AlunosFormScreen";
import AlunosListScreen from "./AlunosListScreen";
import FormTemasPeriodoScreen from "./FormTemasPeriodoScreen";
import FormTrabalhoScreen from "./FormTrabalhoScreen";
import TrabalhoListScreen from "./TrabalhoListScreen";
import LoginScreen from "./LoginScreen";
import TemaListScreen from "./TemaListScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ route }) {
  const tipo = route?.params?.tipo;

  return (
    <Tab.Navigator>
      {tipo === 'administrador' && (
        <>
          <Tab.Screen name="Cadastrar Usuários" component={RegisterScreen} />
          <Tab.Screen name="Listar Usuários" component={UsersListScreen} />
          <Tab.Screen name="Cadastrar Tema" component={FormTemasPeriodoScreen} />
          <Tab.Screen name="Cadastro de Alunos" component={AlunosFormScreen} />
        </>
      )}
      {/* Visível para todos */}
      <Tab.Screen name="Lista de Tema do PI" component={TemaListScreen} />
      <Tab.Screen name="Lista de Alunos" component={AlunosListScreen} />
      <Tab.Screen name="Cadastro Trabalho" component={FormTrabalhoScreen} />
      <Tab.Screen name="Lista Trabalhos" component={TrabalhoListScreen} />
    </Tab.Navigator>
  );
}

function MainTabsWrapper({ route }) {
  return <MainTabs route={route} />;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Cadastrar Usuário" }} />
        <Stack.Screen name="UsersList" component={UsersListScreen} options={{ title: "Lista de Usuários" }} />
        <Stack.Screen name="AlunosFormScreen" component={AlunosFormScreen} options={{ title: "Cadastro de Alunos" }} />
        <Stack.Screen name="AlunosListScreen" component={AlunosListScreen} options={{ title: "Lista de Alunos" }} />
        <Stack.Screen name="FormTemasPeriodoScreen" component={FormTemasPeriodoScreen} options={{ title: "Cadastro de Trabalho" }} />
        <Stack.Screen name="TemaListScreen" component={TemaListScreen} options={{ title: "Lista de Tema do PI" }} />
        <Stack.Screen name="FormTrabalhoScreen" component={FormTrabalhoScreen} options={{ title: "Cadastro de Trabalhos" }} />
        <Stack.Screen name="TrabalhoListScreen" component={TrabalhoListScreen} options={{ title: "Lista de Trabalhos" }} />
        <Stack.Screen name="Main" component={MainTabsWrapper} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
