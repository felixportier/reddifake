import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import * as Api from "../api/api";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons,Ionicons,AntDesign, Entypo } from "@expo/vector-icons";

export default function ActivityComponent(props) {
  const [feedsPressed, setFeedsPressed] = useState(props.private_feeds);
  const [nsfwPressed, setNsfwPressed] = useState(props.label_nsfw);
  const [followersPressed, setFollowersPressed] = useState(props.enable_followers);
  const [overPressed, setOverPressed] = useState(props.over_18);
  const [profanityPressed, setProfanityPressed] = useState(props.no_profanity);
  const [adsPressed, setAdsPressed] = useState(props.hide_ads);
  const endpoint = "https://oauth.reddit.com/api/v1/me/prefs"
  return (
    <SafeAreaView style={styles.conteneur}>
      <View>
        <Text style={styles.titleText}>User Settings</Text>
      </View>
      <View style={{ borderBottomColor: "orange", borderBottomWidth: 1 }} />
      <View style={styles.settingsText}>
        {!feedsPressed ? (
          <Pressable
            onPress={() => {
              setFeedsPressed(true)
              Api.patchRequest(endpoint, props.token, { "private_feeds": "true" })
            }}
            style={({ pressed }) => [
              {
                borderRadius: 20,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <View style={{ padding: 1 }}>
              <Text style={styles.feedsText}>
              <Ionicons name="lock-open-outline" size={24} color="orange" />
                Enable private feeds
              </Text>
            </View>
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => {

                setFeedsPressed(false)

                Api.patchRequest(endpoint, props.token, { "private_feeds": "false" })
              }}
              style={({ pressed }) => [
                {
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <View style={{ padding: 1 }}>
                <Text style={styles.feedsText}>
                <Ionicons name="lock-closed" size={24} color="orange" />
                  Disable private feeds
                </Text>
              </View>
            </Pressable>
          </View>
        )}
        {!nsfwPressed ? (
          <Pressable
            onPress={() => {
              Api.patchRequest(endpoint, props.token, { "show_location_based_recommendations": "true" })
              setNsfwPressed(true)
            }}
            style={({ pressed }) => [
              {
                borderRadius: 20,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.langText}>
            <Ionicons name="location-outline" size={24} color="orange" />
              Show location base recommendations
            </Text>
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                Api.patchRequest(endpoint, props.token, { "show_location_based_recommendations": "false" })
                setNsfwPressed(false)
              }}
              style={({ pressed }) => [
                {
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.langText}>
              <Ionicons name="location" size={24} color="orange" />
                Hide location based recommendations
              </Text>
            </Pressable>
          </View>
        )}

        {!followersPressed ? (
          <Pressable
            onPress={() => {
              Api.patchRequest(endpoint, props.token, { "enable_followers": "true" })
              setFollowersPressed(true)
            }}
            style={({ pressed }) => [
              {
                borderRadius: 20,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.countryText}>
            <Ionicons name="people-outline" size={24} color="orange" />
              Enable Followers
            </Text>
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                Api.patchRequest(endpoint, props.token, { "enable_followers": "false" })
                setFollowersPressed(false)
              }}
              style={({ pressed }) => [
                {
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.countryText}>
              <Ionicons name="people" size={24} color="orange" />
                Disable followers
              </Text>
            </Pressable>
          </View>
        )}

        {!overPressed ? (
          <Pressable
            onPress={() => {
              Api.patchRequest(endpoint, props.token, { "over_18": "true" })
              setOverPressed(true)
            }}
            style={({ pressed }) => [
              {
                borderRadius: 20,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.overText}>
            <Ionicons name="warning-outline" size={24} color="orange" /> Enable 18+ content
            </Text>
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                Api.patchRequest(endpoint, props.token, { "over_18": "false" })
                setOverPressed(false)
              }}
              style={({ pressed }) => [
                {
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.overText}>
              <Ionicons name="warning" size={24} color="orange" /> Disable 18+ content
              </Text>
            </Pressable>
          </View>
        )}

        {!profanityPressed ? (
          <Pressable
            onPress={() => {
              Api.patchRequest(endpoint, props.token, { "no_profanity": "true" })
              setProfanityPressed(true)
            }}
            style={({ pressed }) => [
              {
                borderRadius: 20,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.profanityText}>
            <Ionicons name="eye-outline" size={24} color="orange" /> Disable profanity
            </Text>
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                Api.patchRequest(endpoint, props.token, { "no_profanity": "false" })
                setProfanityPressed(false)
              }}
              style={({ pressed }) => [
                {
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.profanityText}>
              <Ionicons name="eye" size={24} color="orange" /> Enable profanity
              </Text>
            </Pressable>
          </View>
        )}

        {!adsPressed ? (
          <Pressable
            onPress={() => {
              Api.patchRequest(endpoint, props.token, { "hide_ads": "true" })
              setAdsPressed(true)
            }}
            style={({ pressed }) => [
              {
                borderRadius: 20,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.pmsText}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={25}
                color="orange"
              />
              Hide ads
            </Text>
          </Pressable>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                Api.patchRequest(endpoint, props.token, { "hide_ads": "false" })
                setAdsPressed(false)
              }}
              style={({ pressed }) => [
                {
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.pmsText}>
                <MaterialCommunityIcons
                  name="message-text"
                  size={25}
                  color="orange"
                />
                Show ads
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    height: 270,
    width: "100%",
    borderRadius: 8,
    paddingTop: 15,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#1f1a17",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  titleText: {
    fontSize: 20,
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },

  settingsText: {
    padding: 5,
    alignItems: "center",
  },

  feedsText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    padding: 5,
  },

  langText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    padding: 5,
  },

  countryText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    padding: 5,
  },

  overText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    padding: 5,
  },

  profanityText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    padding: 5,
  },

  pmsText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    padding: 5,
  },

  feedButton: {},
});
