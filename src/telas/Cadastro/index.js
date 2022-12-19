import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import estilos from "./estilos";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  async function realizarCadastro() {
    const resultado = await cadastrar(email, senha, confirmaSenha);
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
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
        secureTextEntry
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={(texto) => setConfirmaSenha(texto)}
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
