import React from "react";
import {
  Image, 
  StyleSheet,
  Text,
  TouchableOpacity, 
  View
} from "react-native";

export default function Gasto(props) {

  //formata numero para exibir em formato brasileiro de moeda
  function formataValor (amount) {
    
    var decimal = ',';
    var thousands = '.';
    var decimalCount = 2;
    
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    
    } catch (e) {
      console.log(e)
    }
  }
  //retorna um card que exibe a descrição, valor e um botão pra excluir a compra
  return (
    <View style={styles.cardGasto} key={props.gasto.id}>
      <View style={styles.informacoesGasto}>
      <Text style={styles.textoDescricao}>{props.gasto.descricao}</Text>
        <Text style={styles.textoValor}>R$ {formataValor(props.gasto.valor)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => props.onDelete(props.gasto.id)}
      >
        <Image
          style={styles.icone}
          source={require("../assets/delete.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardGasto: {
    flexDirection: "row",
    backgroundColor: "#269999",
    borderRadius: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
    width: "95%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  informacoesGasto: {
    flexDirection: "column",
  },
  textoDescricao: {
    color: "black",
    fontSize: 21,
  },
  textoValor: {
    color: "white",
    fontSize: 18,
  },
  icone: {
    height: 30,
    width: 25
  },
});
