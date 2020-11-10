import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-simple-toast';

export default function Cadastro() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [compras, setCompras] = useState([]);
  const [date, setDate] = useState(new Date());
  //armazena dados a cada novo cadastro
  async function armazenaDados() {
    try {
      await AsyncStorage.setItem("compras", JSON.stringify(compras));
    } catch (error) {
      Alert.alert("As tarefas não foram armazenados");
    }
  }
  //recupera lista de compras
  async function recuperaDados() {
    try {
      const comprasJson = await AsyncStorage.getItem("compras");
      if (comprasJson !== null) setCompras(JSON.parse(comprasJson));
    } catch (error) {
      Alert.alert("As tarefas não foram carregadas");
    }
  }

  useEffect(() => {
    recuperaDados();
  }, []);

  useEffect(() => {
    armazenaDados();
  }, [compras]);

  //gambiarra para salvar data em um modelo que dê para filtrar por mes
  function transformaDataPadraoBR(data) {
    let ano = data.getFullYear();
    let mes = data.getMonth()+1;
    let dia = data.getDate().toString().padStart(2, '0');

    return dia + '/' + mes + '/' + ano;
  }

  //adiciona uma nova compra
  function adicionaCompra(obj) {
    if(obj.descricao?.length && obj.valor > 0 && obj.date != null){
      if(obj.date.toString().length > 10){
        obj.date = transformaDataPadraoBR(obj.date);
      }
      const novaCompra = {
        id: Math.random().toString(),
        descricao: obj.descricao,
        valor: obj.valor,
        data: obj.date
      };
      setCompras([...compras, novaCompra]);
      armazenaDados();
      setDescricao("");
      setValor("");
      Toast.show('Compra adicionada', 3000);
    } else {
      Toast.show('Complete todos os campos', 3000);
    }
  }

  //exibe campos para cadastro de compra
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Text style={styles.labelInput}>Descrição</Text>
        <TextInput
          style={styles.input}
          onChangeText={(descricao) => setDescricao(descricao)}
          value={descricao}
        />
        <Text style={styles.labelInput}>Valor</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(valor) => setValor(valor)}
          value={valor}
        />
        <Text style={styles.labelInput}>Data</Text>
        <DatePicker
        format="DD/MM/YYYY"
        style={styles.input}
        date={date}
        onDateChange={(date) => setDate(date)}
        ></DatePicker>
        <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => adicionaCompra({ descricao, valor, date })}>
          <Text>ADICIONAR</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#269999",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    fontSize: 20,
    width: '100%'
  },
  labelInput: {
    fontSize: 20,
  },
  button: {
    padding: 10,
    width: '70%',
    backgroundColor: '#3ad0d0',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,  
    elevation: 5
  }
});
