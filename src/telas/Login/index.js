import React, { useState } from "react";
import { View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { logar } from "../../servicos/requisicoesFirebase";
import estilos from "./estilos";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function realizarLogin() {
    const resultado = await logar(email, senha);
    console.log("resultado", resultado);
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        secureTextEntry
      />

      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
