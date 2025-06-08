import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from "./RegisterScreen";
import UsersListScreen from "./UsersListScreen"
import FormScreen from './FormScreen';
import ListScreen from './ListScreen';
import LoginScreen from './LoginScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cadastrar Usuários" component={RegisterScreen} />
      <Tab.Screen name="Listar Usuários" component={UsersListScreen} />
      <Tab.Screen name="Cadastrar Aluguel" component={FormScreen} />
      <Tab.Screen name="Lista de Alugueis" component={ListScreen} />
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
                <Stack.Screen name="FormScreen" component={FormScreen} options={{title: "Cadastrar Aluguel"}}/>
                <Stack.Screen name="ListScreen" component={ListScreen} options={{title: "Lista de Alugueis"}}/>
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}