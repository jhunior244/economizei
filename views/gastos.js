import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View, Text } from "react-native";
import Gasto from "../componentes/gasto";
import NavBarFooter from "../componentes/navbar-footer";
import { useIsFocused } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import Toast from "react-native-simple-toast";

export default function Gastos(props) {
  const [compras, setCompras] = useState([]);
  const [date, setDate] = useState(new Date());
  const [soma, setSoma] = useState(0);
  const isFocused = useIsFocused();
  //hook para recalcular o total de gastos toda vez que a lista exibida é alterada
  useEffect(() => {
    calculaTotalGastos();
  }, [compras]);

  //hook para buscar a lista de compras ao iniciar a aplicaçao
  useEffect(() => {
    recuperaDados();
  }, []);

  //hook para filtrar a lista ao navegar entre paginas
  useEffect(() => {
    recuperaDados();
  }, [props, isFocused]);

  //busca todos os gastos cadastrados
  async function recuperaDados() {
    try {
      const comprasJson = await AsyncStorage.getItem("compras");
      if (comprasJson !== null) {
        setCompras(JSON.parse(comprasJson));
        filtraMes(format(date, "MM/yyyy"));
      }
    } catch (error) {
      Alert.alert("As tarefas não foram carregadas");
    }
  }
  
  //apaga um gasto
  async function apagaGasto(id) {
    try {
      const comprasJson = await AsyncStorage.getItem("compras");
      const listaCompras = JSON.parse(comprasJson);
      await AsyncStorage.setItem(
        "compras",
        JSON.stringify(listaCompras.filter((compra) => compra.id !== id))
      );
      recuperaDados();
      Toast.show("Compra apagada", 3000);
    } catch (error) {
      Alert.alert("As tarefas não foram armazenados");
    }
  }

  //recua um mes
  function mesAnterior() {
    setDate(subMonths(date, 1));
    filtraMes(format(subMonths(date, 1), "MM/yyyy"));
  }
  //avança um mes
  function mesPosterior() {
    setDate(addMonths(date, 1));
    filtraMes(format(addMonths(date, 1), "MM/yyyy"));
  }

  //filtra os gastos do mes e ano passados por parametro
  async function filtraMes(mesEAno) {
    const comprasJson = await AsyncStorage.getItem("compras");
    const lista = JSON.parse(comprasJson);
    if (lista !== null) {
      setCompras(lista.filter((compra) => compra.data.endsWith(mesEAno)));
    }
  }

  //calcula o total de gastos do mês para ser exibido
  function calculaTotalGastos() {
    let soma = 0;
    if (compras != null) {
      compras.forEach((gasto) => {
        soma += Number.parseFloat(gasto.valor);
      });
    }
    return setSoma(soma);
  }
  //constroi a lista de cards de gastos a ser exibida
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.areaScroll}>
        <View style={styles.sliderData}>
          <IconButton icon="arrow-left" onPress={mesAnterior} />
          <Text style={{ fontSize: 22 }}>
            {format(date, "MMMM 'de' yyyy", { locale: ptBR })}
          </Text>
          <IconButton icon="arrow-right" onPress={mesPosterior} />
        </View>
        <ScrollView>
          <View style={styles.listaGastos}>
            {compras.map((compra) => (
              <Gasto key={compra.id} gasto={compra} onDelete={apagaGasto} />
            ))}
          </View>
        </ScrollView>
      </View>
      <NavBarFooter soma={soma} navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  areaScroll: {
    flex: 0.81,
  },
  sliderData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listaGastos: {
    alignItems: "center",
  },
});
