import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, RefreshControl, SafeAreaView, View, StyleSheet, TextInput, TouchableOpacity, Image, Text, Pressable, ActivityIndicator } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { selectToken, selectUserName, selectLogIn, setLogOut } from '../redux/authSlice'
import * as Api from "../api/api"
import SubRedditElement from '../components/subredditElement_component'
export default SubRedditsScreen = ({ navigation }) => {
    const authToken = useSelector(selectToken)
    const [subReddits, setSubReddits] = useState(undefined)
    const [requestedSubreddits, setRequestedSubReddits] = useState("https://oauth.reddit.com/subreddits/popular?limit=25")
    const [isLoading, setLoading] = useState(true)
    const [refreshing, setRefresh] = React.useState(false)
    const [scrollBottomEvent, setBottomEnd] = React.useState(false)
    const [filterType, setFilter] = React.useState('popular')
    useEffect(() => {
        setLoading(true)
        setBottomEnd(false)
        Api.getRequest(requestedSubreddits, authToken).then((res) => {
            setSubReddits(res)
            setLoading(false)
            setRefresh(false)
        })

    }, [requestedSubreddits]
    )
    const [searchText, setSearch] = useState('')

    const onRefresh = React.useCallback(() => {
        const current = requestedSubreddits
        setLoading(true)
        setRefresh(true)
        setRequestedSubReddits(current)
    })


    const scrollReachedEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <SafeAreaView>
            <View>
                <View style={style.searchInput}>
                    <TextInput placeholder="Search for subreddits" style={{ flex: 1 }} onChangeText={
                        setSearch
                    }
                        value={searchText}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            setRequestedSubReddits("https://oauth.reddit.com/search?q=" + searchText + "&type=sr&limit=100")
                            setLoading(true)
                        }}
                    >

                        <Ionicons name="ios-search" size={25} color="orange" />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedSubReddits("https://oauth.reddit.com/subreddits/popular")
                        setFilter('popular')
                        setLoading(true)
                    }}>
                        <Text style={style.buttonText}><Ionicons name="ios-rocket-outline" size={25} color="orange" />Popular</Text>
                    </Pressable>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedSubReddits("https://oauth.reddit.com/subreddits/new")
                        setFilter('new')
                        setLoading(true)

                    }}>
                        <Text style={style.buttonText}><Ionicons name="newspaper-outline" size={25} color="orange" />New</Text>
                    </Pressable>

                </View>


                {!isLoading ? (
                    <ScrollView
                        contentContainerStyle={{
                            paddingBottom: 150,
                            justifyContent: 'center',
                        }}
                        onScroll={({ nativeEvent }) => {
                            if (scrollReachedEnd(nativeEvent) && !scrollBottomEvent) {
                                setBottomEnd(true)
                                var lastSub = subReddits.data.children.pop()

                                var subId = lastSub.data.name

                                setLoading(true)
                                setRequestedSubReddits("https://oauth.reddit.com/subreddits/" + filterType + "?after=" + subId)
                            }
                        }}
                        scrollEventThrottle={400}
                        centerContent="true"
                        refreshControl={<RefreshControl
                            onRefresh={onRefresh}
                            refreshing={isLoading}
                            removeClippedSubviews="true"

                        />

                        }
                    >
                        {
                            subReddits.data.children.map((val, key) => {
                                return (
                                    <SubRedditElement
                                        navigation={navigation}
                                        key={key}
                                        subTitle={val.data.display_name_prefixed}
                                        thumbnail={val.data.icon_img}
                                        subCount={val.data.subscribers}
                                        category={val.data.advertiser_category}
                                        isSubscriber={val.data.user_is_subscriber}
                                    />
                                )
                            })
                        }



                    </ScrollView>


                ): <View style={{ paddingTop: "50%" }}><ActivityIndicator size="large" color="orange" /></View>
                }



            </View>






        </SafeAreaView>
    )
}


const style = StyleSheet.create({



    searchInput: {
        flexDirection: "row",
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        backgroundColor: "white"

    },

    buttonText: {
        color: "white",
        fontSize: 15,
        paddingLeft: 5,
        paddingBottom: 10,
        fontWeight: "500",
    },

    filterButton: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 3,
        backgroundColor: '#1f1a17',
    },


})