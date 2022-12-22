import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import estilos from "./estilos";
import { alteraDados } from "../../utils/comum";

export default function Cadastro({ navigation }) {
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  async function realizarCadastro() {
    const resultado = await cadastrar(
      dados.email,
      dados.senha,
      dados.confirmaSenha
    );
    if (resultado === "sucesso") {
      Alert.alert("Usuário cadastrado com sucesso!");

      setEmail("");
      setSenha("");
      setConfirmaSenha("");
    } else {
      Alert.alert(resultado);
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={dados.email}
        onChangeText={(texto) => alteraDados("email", texto, dados, setDados)}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={(texto) => alteraDados("senha", texto, dados, setDados)}
        secureTextEntry
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        onChangeText={(texto) =>
          alteraDados("confirmaSenha", texto, dados, setDados)
        }
        secureTextEntry
      />

      <Botao
        onPress={() => {
          realizarCadastro();
        }}
      >
        CADASTRAR
      </Botao>
    </View>
  );
}
