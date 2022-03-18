import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as Api from '../api/api'
import { selectToken } from '../redux/authSlice';
import { View, StyleSheet, Text, ColorPropType, Image, ImageBackground, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export default Subreddit = (props) => {
    const [isSubscriber, setSubscribe] = useState(props.isSubscriber)
    const authToken = useSelector(selectToken)
    const [hasAvatar, setAvatar] = useState(false)
    const [hasBanner, setBanner] = useState(false)

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
    const [showDesc, setShown] = useState(false)
    return (
        <View style={style.container}>

            {props.banner != '' && (
                <View>
                    <ImageBackground style={style.banner} source={{ uri: props.banner }}>
                        <View style={{ flexDirection: "row", padding: 10 }}>

                            {
                                props.thumbnail != '' ? (
                                    <View>
                                        <Image source={{ uri: props.thumbnail }} style={style.thumbnail} />
                                    </View>
                                ) : (
                                    <View>
                                        <Image source={require('../assets/avatar.png')} style={style.thumbnail} />
                                    </View>
                                )
                            }


                            <View style={{ flex: 1, width: 300 }}>
                                <View style={{ backgroundColor: "rgba(rgba(0, 0, 0, 0.8));", justifyContent: "center", borderRadius: 10, height: 25, width: "90%" }}>
                                    <Text style={style.subTitle}>{props.subTitle}</Text>
                                </View>

                                <View style={{ backgroundColor: "rgba(rgba(0, 0, 0, 0.8));", justifyContent: "center", borderRadius: 10, height: 40, width: "90%", marginTop: 3 }}>
                                    <Text style={{ color: "white", fontSize: 20, paddingLeft: 15 }}>{props.subCount} Subs</Text>
                                </View>

                            </View>

                        </View>




                    </ImageBackground>

                    <View>
                        <View style={{ justifyContent: "center", flex: 1 }}>
                            <TouchableOpacity style={style.subButton} onPress={SubscribeToSr}><Text style={{ color: "white", fontWeight: "700", alignSelf: "center" }}> {isSubscriber ? "Unsubscribe" : "Subscribe"}</Text></TouchableOpacity>
                        </View>
                        <Text style={style.publicDesc}>{props.public_description}</Text>

                        {showDesc ? (<ScrollView><Text style={style.description}>{props.description}</Text>
                            <TouchableOpacity style={style.showDesc} onPress={() => setShown(false)}><Ionicons name="ellipsis-horizontal-outline" size={24} color="black" /></TouchableOpacity>
                        </ScrollView>) : <TouchableOpacity style={style.showDesc} onPress={() => setShown(true)}><Text>Show description</Text><Ionicons name="ellipsis-horizontal-outline" size={24} color="black" /></TouchableOpacity>
                        }

                    </View>


                </View>
                
            )}
            
            {props.banner === '' && (
                <View >

                    <View style={{ flexDirection: "row", padding: 10 }}>

                        {props.thumbnail != '' ? (
                            <View>
                                <Image source={{ uri: props.thumbnail }} style={style.thumbnail} />
                            </View>
                        ) : <Image source={require('../assets/avatar.png')} style={style.thumbnail}/> 


                        }

                        <View style={{ flex: 1, width: 300 }}>
                            <View style={{ backgroundColor: "rgba(rgba(0, 0, 0, 0.8));", justifyContent: "center", borderRadius: 10, height: 30, width: "90%" }}>
                                <Text style={style.subTitle}>{props.subTitle}</Text>
                            </View>

                            <View style={{ backgroundColor: "rgba(rgba(0, 0, 0, 0.8));", justifyContent: "center", borderRadius: 10, height: 40, width: "90%", marginTop: 3 }}>
                                <Text style={{ color: "white", fontSize: 20, paddingLeft: 15 }}>{props.subCount} Subs</Text>
                            </View>

                        </View>

                    </View>

                    <View>

                        <Text style={style.publicDesc}>{props.public_description}</Text>
                        <View style={{ justifyContent: "center", flex: 1 }}>
                            <TouchableOpacity style={style.subButton} onPress={SubscribeToSr}><Text style={{ color: "white", fontWeight: "700", alignSelf: "center" }}> {isSubscriber ? "Unsubscribe" : "Subscribe"}</Text></TouchableOpacity>
                        </View>
                        {showDesc ? (<ScrollView><Text style={style.description}>{props.description}</Text>
                            <TouchableOpacity style={style.showDesc} onPress={() => setShown(false)}><Ionicons name="ellipsis-horizontal-outline" size={24} color="black" /></TouchableOpacity>
                        </ScrollView>) : <TouchableOpacity style={style.showDesc} onPress={() => setShown(true)}><Text>Show description</Text><Ionicons name="ellipsis-horizontal-outline" size={24} color="black" /></TouchableOpacity>
                        }





                    </View>



                </View>
            ) }




        </View>
    )

}


const style = StyleSheet.create({
    container: {

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
        backgroundColor: "orange",

    },
    subButton: {
        margin: 2,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 50,
    },

    description: {

        color: "white"
    },

    publicDesc: {
        fontWeight: "400",
        color: "white",
        fontSize: 15,
    },

    showDesc: {
        fontWeight: "600",
        padding: 10,
    },

    subTitle: {
        fontSize: 25,
        paddingLeft: 10,
        fontWeight: "600",
        color: "white",
    },

    thumbnail: {
        margin: 10,
        width: 70,
        height: 70,
        borderRadius: 100,
        resizeMode: "contain"
    },


    banner: {
        width: "100%",
        height: 100,
        resizeMode: "contain",

    }


})