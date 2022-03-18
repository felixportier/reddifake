import * as React from 'react';
import { ActivityIndicator, Text, View, RefreshControl, TextInput, StyleSheet, Pressable, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import * as Api from "../api/api"
import Ionicons from '@expo/vector-icons/Ionicons'
import PostComponent from "../components/post_component"


export default PostsScreen = props => {
    const [isLoading, setLoading] = React.useState(true)
    const authToken = useSelector(selectToken)
    const [searchText, setSearch] = React.useState('')
    const [posts, setPosts] = React.useState(undefined)
    const [filterType, setFilter] = React.useState('best')
    const [requestedPosts, setRequestedPosts] = React.useState("https://oauth.reddit.com/best?limit=25")
    const [refreshing, setRefresh] = React.useState(false)
    const [scrollBottomEvent, setBottomEnd] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        setBottomEnd(false)
        try {
            Api.getRequest(requestedPosts, authToken).then((res) => {
                setPosts(res)
                setLoading(false)
                setRefresh(false)
                
            })
        } catch {
            console.log("Error in Api Request")
        }



    }, [requestedPosts])




    const onRefresh = React.useCallback(() => {
        const current = requestedPosts
        setLoading(true)
        setRefresh(true)
        console.log("REFRESH!!!!")
        try {

            Api.getRequest(current, authToken).then((res) => {
                setPosts(res)
                setLoading(false)
                setRefresh(false)
                
            })

        } catch {
            console.log("failed setting req posts")
        }

    })

    const scrollReachedEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 120;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };


    return (


        <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>


            <View>
                <View style={style.searchInput}>
                    <TextInput placeholder="Search for posts" style={{ flex: 1 }} onChangeText={
                        setSearch
                    }
                        value={searchText}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            setRequestedPosts("https://oauth.reddit.com/search?q=" + searchText + "&limit=100")
                            setLoading(true)
                        }}
                    >

                        <Ionicons name="ios-search" size={25} color="orange" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{
                    padding: 5,
                    height: 75,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                }} horizontal
                    showsVerticalScrollIndicator={false}
                    directionalLockEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}

                >
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedPosts("https://oauth.reddit.com/top?limit=25")
                        setFilter("top")
                        setLoading(true)
                    }}>
                        <Text style={style.buttonText}><Ionicons name="ios-rocket-outline" size={25} color="orange" />Top</Text>
                    </Pressable>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedPosts("https://oauth.reddit.com/best?limit=25")
                        setLoading(true)
                        setFilter("best")
                    }}>
                        <Text style={style.buttonText}><Ionicons name="ios-medal-outline" size={25} color="orange" />Best</Text>
                    </Pressable>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedPosts("https://oauth.reddit.com/hot?limit=25")
                        setLoading(true)
                        setFilter("hot")
                    }}>
                        <Text style={style.buttonText}><Ionicons name="ios-flame-outline" size={25} color="orange" />Hot</Text>
                    </Pressable>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedPosts("https://oauth.reddit.com/new?limit=25")
                        setLoading(true)
                        setFilter("new")
                    }}>
                        <Text style={style.buttonText}><Ionicons name="newspaper-outline" size={25} color="orange" />New</Text>
                    </Pressable>
                </ScrollView>




                {

                    !isLoading ? (

                        <ScrollView

                            contentContainerStyle={{
                                paddingBottom: 150,
                                justifyContent: 'center',
                            }}
                            onScroll={({ nativeEvent }) => {
                                if (scrollReachedEnd(nativeEvent) && !scrollBottomEvent) {
                                    setBottomEnd(true)
                                    var lastPost = posts.data.children.pop()

                                    var postId = lastPost.data.name
                                    console.log("DANGER ON SCROLL END")
                                    setLoading(true)
                                    setRequestedPosts("https://oauth.reddit.com/" + filterType + "?limit=25&after=" + postId)
                                }
                            }}
                            scrollEventThrottle={400}
                            centerContent="true"
                            refreshControl={<RefreshControl
                                onRefresh={onRefresh}
                                refreshing={isLoading}
                                removeClippedSubviews="true"
                            />}
                        >

                            
                                {
                                    posts.data.children.map((val, key) => {
                                        return (
                                            <PostComponent
                                                key={key}
                                                postHint={val.data.post_hint}
                                                selfText={val.data.selftext}
                                                subName={val.data.subreddit_name_prefixed}
                                                postTitle={val.data.title}
                                                authorName={val.data.author}
                                                postImage={val.data.url}
                                                ups={val.data.score}
                                                subThumbnail={val.data.thumbnail}
                                                postType={val.data.link_flair_text}
                                                postVideo={val.data.is_video && val.data.media != null ? val.data.media.reddit_video.fallback_url : ""}
                                            />
                                        )
    
                                    })
                                }
                                
                        </ScrollView>  )

                        : <View style={{ paddingTop: "50%" }}><ActivityIndicator color="orange" size="large" /></View>


                }






            </View>




        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    header: {
        padding: 5,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },

    filterButton: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 3,
        backgroundColor: '#1f1a17',
    },

    buttonText: {
        color: "white",
        fontSize: 15,
        paddingLeft: 5,
        paddingBottom: 10,
        fontWeight: "500",
    },
    searchInput: {
        flexDirection: "row",
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        backgroundColor: "white"

    }
})