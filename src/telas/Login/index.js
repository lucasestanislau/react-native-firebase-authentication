import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { logar } from "../../servicos/requisicoesFirebase";
import estilos from "./estilos";
import { auth } from "../../config/firebase";
import animacaoCarregando from "../../../assets/animacaoCarregando.gif";
import { alteraDados } from "../../utils/comum";

export default function Login({ navigation }) {
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setCarregando(false);
    });

    return () => estadoUsuario();
  }, []);

  async function realizarLogin() {
    const resultado = await logar(dados.email, dados.senha);

    if (resultado) {
      navigation.replace("Principal");
    }
  }

  if (carregando) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={animacaoCarregando} style={estilos.imagem} />
      </View>
    );
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
