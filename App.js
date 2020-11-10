import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from "expo-constants";
import React from "react";
import { StyleSheet } from "react-native";
import Cadastro from "./views/cadastro";
import Gastos from "./views/gastos";

const Stack = createStackNavigator();

export default function App() {
  //inicio da aplicaçção com as duas paginas de rota (listagem de compras e cadastro de compras)
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.areaNavegacao} initialRouteName="COMPRAS">
        <Stack.Screen  name="COMPRAS" component={Gastos} 
        options={{
          headerStyle: styles.header,
          headerTitleStyle: { alignSelf: 'center' }
        }}/>
        <Stack.Screen style={styles.header} name="CADASTRO" component={Cadastro}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: { alignSelf: 'center' }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3ad0d0',
},
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  areaNavegacao: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});
