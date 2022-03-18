import { useEffect, useState } from 'react'
import * as Api from '../api/api'
import { useSelector } from 'react-redux'
import { selectToken } from '../redux/authSlice'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'



export default SubRedditElement = (props) => {
    const [isSubscriber, setSubscribe] = useState(props.isSubscriber)
    const authToken = useSelector(selectToken)
    const SubscribeToSr = () => {
        if (!isSubscriber) {
            Api.postRequest("https://oauth.reddit.com/api/subscribe?action=sub&sr_name=" + props.subTitle, authToken)
            setSubscribe(true)
        }
        else {
            Api.postRequest("https://oauth.reddit.com/api/subscribe?action=unsub&sr_name=" + props.subTitle, authToken)
            setSubscribe(false)
        }
    }
    return (

        <View style={style.container}>
            <View style={style.header}>
                {
                    props.thumbnail != '' ? <Image source={{ uri: props.thumbnail }} style={style.thumbnail} /> : <Image source={ require('../assets/avatar.png') } style={style.thumbnail} />
                }
                <TouchableOpacity onPress={() => props.navigation.navigate('Subreddit', {
                    chosenSubReddit: {
                        subTitle:props.subTitle,
                        isSubscriber:props.isSubscriber
                    }
                })} >
                    <Text style={style.title}>{props.subTitle}</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: "row", padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        {
                            props.category != '' &&
                            <View style={{ backgroundColor: "black", borderRadius: 50, alignItems: "center", width: 120, margin: 3 }}>
                                <Text style={{ color: "orange" }}>{props.category}</Text>
                            </View>
                        }

                        <Text style={{ padding: 10, color: "white" }}>{props.subCount} subscribers</Text>
                    </View>


                </View>

            </View>


            <View style={{ justifyContent: "center", flex: 1 }}>
                <TouchableOpacity style={style.subButton} onPress={SubscribeToSr}><Text style={{ color: "white", fontWeight: "700", alignSelf: "center" }}> {isSubscriber ? "Unsubscribe" : "Subscribe"}</Text></TouchableOpacity>
            </View>

        </View>

    )

}

const style = StyleSheet.create({

    container: {
        flexDirection: "column",
        padding: 10,
        height: 200,
        backgroundColor: '#1f1a17',
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },


    header: {
        display: "flex",
        flexDirection: "row",
    },

    subButton: {
        backgroundColor: "orange",
        padding: 10,
        borderRadius: 50,
    },

    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10
    },

    title: {
        flex: 1,

        fontWeight: "700",
        fontSize: 20,
        color: "white",
        paddingBottom: 25,
    },

})