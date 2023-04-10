import { View, Text, Button, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { getAuth, sendPasswordResetEmail} from "firebase/auth";

const Home = ({navigation}) => {

  const firebaseAuth = getAuth();
  const user = firebaseAuth.currentUser;
  
  const signOut = async () => {
    await SecureStore.deleteItemAsync("user");
    await firebaseAuth.signOut();
  }

  const goToProfile = () => {
    navigation.navigate("Profile");
  }

  const recoveryPassWord = () => {
    sendPasswordResetEmail(firebaseAuth, user.email)
    .then(()=>{
      Alert.alert('Aplicativo', `Um Email de Reset de Senha Foi Enviado a ${user.email}, Apos Alterar Sua Senha, Faça o Login Novamente`,)
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Aplicativo', 'Não foi Possível Alterar Sua Senha', [
        { text: 'OK', onPress: () => { } },
      ]);
    })
  }

  return (
    <View>
      <Text>Home</Text>
      { user && <Text>{user.email}</Text> }
      <Text style={{color:"#3F89AB"}} onPress={recoveryPassWord}>Alterar senha</Text>
      <Button title="Atualizar Perfil" onPress={goToProfile}></Button>
      <Button title="Sair" onPress={signOut}></Button>
    </View>
  );
}

export default Home;