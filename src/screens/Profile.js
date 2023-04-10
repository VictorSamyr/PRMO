import { View, Text, Button, TextInput, Alert } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import React from "react";

const Profile = () => {

  const firebaseAuth = getAuth();
  console.log(firebaseAuth);
  const user = firebaseAuth.currentUser;

  const [name, setName] = useState(user.displayName);
  const [imageUrl, setImageUrl] = useState("");

  const updateUserProfile = () => {
    console.log("Updating...");
    updateProfile(user, {
      displayName: name,
    }).then(() => {
      Alert.alert('Aplicativo', 'Perfil atualizado!', [
        { text: 'OK', onPress: () => { } },
      ]);
    }).catch((error) => {
      console.error(error);
      Alert.alert('Aplicativo', 'Não foi possível atualizar o perfil!', [
        { text: 'OK', onPress: () => { } },
      ]);
    })
  }

  return (
    <View>
      <Text>{user.emailVerified === false ? " Perfil Não Verificado" : " Perfil Verificado"}</Text>
      <TextInput
        value={" " + name}
        onChangeText={setName}
      ></TextInput>
      <Button title="Alterar Foto De Perfil" onPress={updateUserProfile}></Button>
      <Button title="Salvar" onPress={updateUserProfile}></Button>
    </View>
  );
}

export default Profile;