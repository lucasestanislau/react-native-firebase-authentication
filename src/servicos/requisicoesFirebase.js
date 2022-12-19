import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "firebase/auth";

function errosFirebase(error) {
  console.log("error", error.code);
  let mensagem = "";
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse e-mail já está";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "E-mail inválido";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "A senha deve ter no mínimo 6 caracteres";
      break;
    default:
      mensagem = "Erro desconhecido";
  }

  return mensagem;
}

export async function cadastrar(email, senha) {
  const resultado = createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      return "sucesso";
    })
    .catch((error) => {
      return errosFirebase(error);
    });

  return resultado;
}

export async function logar(email, senha) {
  const resultado = signInWithEmailAndPassword(auth, email, senha)
    .then((dadosUsuario) => {
      console.log("dadosUsuario", dadosUsuario);
      return "sucesso";
    })
    .catch((error) => {
      console.log("Erro-logar", error);
      //return errosFirebase(error);
    });

  return resultado;
}
