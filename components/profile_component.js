
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import * as Api from "../api/api";

import { StatusBar } from "expo-status-bar";

import { Entypo } from "@expo/vector-icons";
import {
  selectLogIn,
  selectUserName,
  setLogin,
  selectLogOut,
  setLogOut,
} from "../redux/authSlice";
import { useDispatch } from "react-redux";

export default function ProfileComponent(props) {
  const dispatch = useDispatch()
  const SignOut = () => {
    dispatch(setLogOut())
  };

  return (
    <View style={styles.conteneur}>
      <View style={styles.backgroundHeader}>
        <View style={styles.conteneur2}>
          <Image
            source={{ uri: props.userProfileImage }}
            style={{ width: 130, height: 130, borderRadius: 100 }}
          />

          <Text style={styles.titleText}>{props.name}</Text>
          <Text style={styles.prefixName}>{props.displayName}</Text>
          <Text style={styles.nbrKarma}>Karma: {props.total_karma}</Text>
          <View style={{ borderBottomColor: "black", borderBottomWidth: 5 }} />
          <Text style={styles.descriptionText}>
            "{props.public_description}"
          </Text>
          <View style={styles.logoutButton}>
            <Pressable
              onPress={SignOut}
              style={({ pressed }) => [
                {
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.logoutText}>
                <Entypo name="log-out" size={20} color="white" />
                Log Out
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 15,
    paddingBottom: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  logoutButton: {
    alignItems: "center",
    padding: 5,
    backgroundColor: "#1f1a17",
    borderRadius: 10,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E50D0D",
  },

  conteneur2: {
    paddingTop: 10,
    paddingLeft: 10,
    alignItems: "center",
  },

  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 7,
    color: "white",
  },

  prefixName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
  },

  nbrKarma: {
    fontSize: 10,
    paddingTop: 2,
    color: "white",
  },

  descriptionText: {
    fontSize: 12,
    paddingTop: 7,
    paddingBottom: 5,
    color: "white",
    textAlign: "center",
  },

  postSection: {
    height: "50%",
    width: "100%",
    paddingTop: 10,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  scrollView: {
    backgroundColor: "#ffbe0b",
    marginHorizontal: 10,
    borderRadius: 5,
  },

  postText: {
    fontSize: 30,
    textAlign: "center",
  },
});
