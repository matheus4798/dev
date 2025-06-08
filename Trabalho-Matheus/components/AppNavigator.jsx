import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from "./RegisterScreen";
import UsersListScreen from "./UsersListScreen"
import FormScreen from './AlunosFormScreen';
import ListScreen from './AlunosListScreen';
import LoginScreen from './LoginScreen';
import TemaForm from "./FormTemasPeriodoScreen";
import FormTemasPeriodoScreen from "./FormTemasPeriodoScreen";
import AlunosForm from "./AlunosFormScreen";
import AlunosFormScreen from "./AlunosFormScreen";
import AlunosScreen from "./AlunosListScreen";
import AlunosListScreen from "./AlunosListScreen";
import TrabalhoListScreen from "./TrabalhoListScreen";
import FormTrabalhoScreen from "./FormTrabalhoScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cadastrar Usuários" component={RegisterScreen} />
      <Tab.Screen name="Listar Usuários" component={UsersListScreen} />
      <Tab.Screen name="Cadastrar Tema" component={FormTemasPeriodoScreen} />
      <Tab.Screen name="Lista de Alunos" component={AlunosListScreen} />
      <Tab.Screen name="Cadastro de Alunos" component={AlunosFormScreen} />      
    </Tab.Navigator>
  );
}

export default function AppNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{title: "Login"}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{title: "Cadastrar Usuário"}}/>
                <Stack.Screen name="UsersList" component={UsersListScreen} options={{title: "Lista de Usuários"}}/>
                <Stack.Screen name="AlunosFormScreen" component={AlunosFormScreen} options={{title: "Cadastro de Alunos"}}/>
                <Stack.Screen name="AlunosListScreen" component={AlunosListScreen} options={{title: "Lista de Alunos"}}/>
                <Stack.Screen name="FormTemasPeriodoScreen" component={FormTemasPeriodoScreen} options={{title: "Cadastro de Trabalho"}}/>    
                <Stack.Screen name="FormTrabalhoScreen" component={FormTrabalhoScreen} options={{title: "Cadastro de Trabalhos"}}/>
                <Stack.Screen name="TrabalhoListScreen" component={TrabalhoListScreen} options={{title: "Lista de Trabalhos"}}/>                
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}