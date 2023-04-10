import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import validator from "validator";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';

const Register = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const firebaseAuth = getAuth();

  const doRegister = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        sendEmailVerification(user)
    })
    .catch((error) => {
        console.error(error);
        Alert.alert('Aplicativo', 'Não foi possível fazer o Registro!', [
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
      <Text>Registro</Text>
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
      <Button title="Registro" onPress={doRegister} disabled={buttonDisabled}></Button>
      <Text>Já Possui Conta?, faça <Text style={{color:"#3F89AB"}} onPress={() => {navigation.navigate('Login')}}>Login</Text></Text>
    </View>
  );
}

export default Register;