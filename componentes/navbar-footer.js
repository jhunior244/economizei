import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavBarFooter(props) {
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
  //exibe uma barra inferior exibindo o total de gastos do mes e um botão para navegar até a pagina de cadastro
  return (
    <View style={estilos.footer}>
      <Text style={estilos.total}>Total mes: R$ {formataValor(props.soma)}</Text>
      <View style={estilos.caixaButton}>
        <TouchableOpacity
          style={estilos.button}
          onPress={() => props.navigation.navigate("CADASTRO")}
        >
          <Image style={estilos.icone} source={require("../assets/add.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  footer: {
    backgroundColor: "#3ad0d0",
    position: "absolute",
    bottom: 0,
    height: "12%",
    width: "100%",
  },
  total: {
    fontSize: 22,
    color: "black",
    marginLeft: 10,
    top: 10,
  },
  caixaButton: {
    position: "absolute",
    right: 25,
    bottom: "60%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3ad0d0",
    height: 60,
    width: 60,
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  icone: {
    height: 20,
    width: 20,
  },
});
