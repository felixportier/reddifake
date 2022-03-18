import * as React from "react";
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import * as api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { selectLogIn, selectUserName, setLogIn } from "../redux/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: api.params.client_id,
      scopes: api.scopes,
      redirectUri: api.params.redirect_uri,
    },
    api.endpoints
  );
  function logIn() {
    promptAsync();
  }

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      api.login(code).then((res) => {
        dispatch(setLogIn(res));
      });

    }

  }, [response]);
  return (
    <View style={styles.Bouton}>
      <TouchableOpacity
        style={styles.texte}
       
        onPress={logIn}
      ><Text style={{color:"white" , fontSize:20,fontWeight:"600"}}>Log in !</Text></TouchableOpacity>
    </View>
  );
};


export default LoginScreen = props => {
    const isLoggedIn = useSelector(selectLogIn)
    const userName = useSelector(selectUserName)
    return (
        <View style={styles.container}>
            <Image 
            style={styles.Logo}
            source={require('../assets/reddit_icon.png')}/>
            <View>
                <SignIn/>
            </View>
            <View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  Logo: {
    height: 100,
    width: 300,
    margin: 100,
    borderRadius:100,
    resizeMode:"contain"
  },

  Bouton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 140,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "orange",
  },

  texte: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
