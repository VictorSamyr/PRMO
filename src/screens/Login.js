import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import validator from "validator";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const firebaseAuth = getAuth();

  const doLogin = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        SecureStore.setItemAsync("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Aplicativo', 'Não foi possível fazer o login!', [
          { text: 'OK', onPress: () => { } },
        ]);
      })
  }

  useEffect(() => {
    if (validator.isEmail(email) && validator.isLength(password, 6)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
      ></TextInput>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
      ></TextInput>
      <Button title="Entrar" onPress={doLogin} disabled={buttonDisabled}></Button>
      <View style={{justifyContent: "center", alignItems: "center" }}>
        <Text>Não tem Conta?, <Text style={{color:"#3F89AB"}} onPress={() => {}}>Registre-se</Text></Text>
      </View>
    </View>
  );
}

export default Login;