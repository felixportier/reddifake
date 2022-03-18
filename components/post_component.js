import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    Linking,
    Button,
    SafeAreaView,
} from "react-native";
import { Video } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";

var screenWidth = Dimensions.get("window").width;
export default function PostComponent(props) {
    const [isVideo, setIsVideo] = React.useState(false);
    const [hasMedia, setHasMedia] = React.useState(false);
    const [isLink, setIsLink] = React.useState(false);

    const openWithWebBrowser = () => {
        WebBrowser.openBrowserAsync(props.postImage);
    };


    React.useEffect(() => {
        if (props.postHint == "text") setHasMedia(false)
        if (props.postHint == "hosted:video") {
            setIsVideo(true)
            setHasMedia(true)
        }

        if (props.postHint == "image") {
            setHasMedia(true)
        }
        if (props.postHint == "link") {
            setHasMedia(false)
            setIsLink(true)
        }
    }, [])

    return (

        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.subName}>{props.subName}</Text>
                <Text style={style.author}> - Published by u/{props.authorName}</Text>
            </View>

            <View style={style.subHeader}>
                {props.postType &&
                    <View style={style.postTypeCtn}>
                        <Text style={style.postType}>{props.postType}</Text>
                    </View>
                }
            </View>
            <View style={style.content}>
                <Text style={style.title}>{props.postTitle}</Text>


                {hasMedia && (
                    <View style={{ backgroundColor: "white", borderRadius: 5 }}>
                        {
                            !isVideo ?
                                <Image style={style.postImage} source={{ uri: props.postImage }} /> : <Video style={style.postImage} source={{ uri: props.postVideo }} useNativeControls
                                    resizeMode="contain"
                                    isLooping />
                        }

                    </View>

                )}


                {
                    !isLink ? <View>
                        <Text style={style.selfText}>{props.selfText}</Text>
                    </View> : <View>
                        <Button
                            onPress={openWithWebBrowser}
                            title={props.postImage}
                        />

                    </View>
                }

            </View>

            <View style={style.postFooter}>
                <Ionicons name="arrow-up-circle-outline" size={32} color="white" />
                <Text style={style.ups}>{props.ups}</Text>
                <Ionicons name="arrow-down-circle-outline" size={32} color="white" />
            </View>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: "#1f1a17",
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },

    },

    subName: {
        color: "white",
        fontSize:25,
        fontWeight:"600",
    },

    author: {
        paddingTop: 16,
        fontWeight: "300",
        fontSize: 12,
        color: "orange"
    },

    content: {
        padding: 0,
        display: "flex",
        flexDirection: "column",
    },

    title: {

        fontWeight: "700",
        fontSize: 25,
        color: "white",
        paddingBottom: 5
    },

    postImage: {

        width: "100%",
        padding: 5,
        height: screenWidth,
        resizeMode: "contain",
    },

    postFooter: {
        display: "flex",
        flexDirection: "row"
    },

    ups: {
        color: "white",
        paddingTop: 10,
        paddingRight: 5,
    },

    postType: {
        color: "orange",
        textAlign: 'center',
    },

    postTypeCtn: {
        backgroundColor: "white",
        borderRadius: 50,

        padding: 4,
        marginLeft: 2,
    },
    subHeader: {
        width: "100%",
        padding: 5,
    },
    selfText: {
        color: "#95C2C6",
        fontWeight: "bold"
    },




})
