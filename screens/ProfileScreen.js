import { useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import * as Api from "../api/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import ProfileComponent from "../components/profile_component";
import ActivityComponent from "../components/profileActivity_component";

export default ProfileScreen = () => {
  const [userProfile, setProfile] = useState(undefined);
  const [userProfileImage, setImg] = useState("");
  const [isLoadingProfile, setLoadingProfile] = useState(true);
  const [isLoadingSettings, setLoadingSettings] = useState(true);
  const [userSettings, setSettings] = useState(undefined);
  // const [myPosts, setMyPosts] = React.useState({});
  //   const [userProfileBanner, setBanner] = useState("");
  const authToken = useSelector(selectToken);
  useEffect(() => {
    if (!userProfile) {
      Api.getRequest("https://oauth.reddit.com/api/v1/me.json", authToken).then(
        (res) => {
          const usrImage = res.icon_img.split("?");
          //   const usrBanner = res.banner_img.split("?");
          // setMyPosts(res);
          setProfile(res);
          setImg(usrImage[0]);
          setLoadingProfile(false);
          //   setBanner(usrBanner[0]);
        }
      );

      if (!userSettings) {
        Api.getRequest(
          "https://oauth.reddit.com/api/v1/me/prefs",
          authToken
        ).then((res2) => {
          setSettings(res2);
          setLoadingSettings(false);
        });
      }
    }
  }, [isLoadingProfile, isLoadingSettings]);

  return (
    <SafeAreaView>
      <View style={{ padding: 10 }}>
        {!isLoadingProfile ? (
          <ProfileComponent

            userProfileImage={userProfileImage}
            name={userProfile.name}
            displayName={userProfile.subreddit.display_name_prefixed}
            total_karma={userProfile.total_karma}
            public_description={userProfile.subreddit.public_description}
          />
        ) : (
          <ActivityIndicator color="orange"/>
        )}

        {!isLoadingSettings ? (
          <ActivityComponent
            token={authToken}
            private_feeds={userSettings.private_feeds}
            label_nsfw={userSettings.label_nsfw}
            over_18={userSettings.over_18}
            no_profanity={userSettings.no_profanity}
            hide_ads={userSettings.hide_ads}
            enable_followers={userSettings.enable_followers}
          />
        ) : (
          <Text>t</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
