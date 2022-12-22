import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { logar } from "../../servicos/requisicoesFirebase";
import estilos from "./estilos";
import { auth } from "../../config/firebase";
import animacaoCarregando from "../../../assets/animacaoCarregando.gif";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
    const resultado = await logar(email, senha);

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
