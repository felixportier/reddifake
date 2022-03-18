import { useEffect, useState } from 'react'
import * as Api from '../api/api'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Pressable,RefreshControl} from 'react-native'
import { useSelector } from 'react-redux'
import { selectToken } from '../redux/authSlice'
import SubReddit from '../components/subreddit_component'
import { ScrollView } from 'react-native-gesture-handler'
import PostComponent from '../components/post_component'
import Ionicons from '@expo/vector-icons/Ionicons'
export default SubRedditProfileScreen = ({ route, navigation }) => {
    const params = route.params
    const auhToken = useSelector(selectToken)
    const [subRedditPosts, setPosts] = useState(undefined)
    const [subRedditData, setData] = useState({})
    const [filterType, setFilter] = useState('best')
    const [isLoading, setLoading] = useState(true)
    const[onRefresh,setRefresh] = useState(false)
    const [scrollBottomEvent, setBottomEnd] = useState(false)
    const [isLoadingPosts, setLoadingPosts] = useState(true)
    const [requestedPosts, setRequestedPosts] = useState("https://oauth.reddit.com/" + params.chosenSubReddit.subTitle + "/" + filterType, auhToken)
    useEffect(() => {
        try {
            Api.getRequest("https://oauth.reddit.com/" + params.chosenSubReddit.subTitle + "/about", auhToken).then((res) => {
                setData(res)
                setLoading(false)
            })

        } catch {
            console.log("Error making request !")
        }

    }, [isLoading])


    const scrollReachedEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 120;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };


    useEffect(() => {
        Api.getRequest(requestedPosts, auhToken).then((res) => {
            setPosts(res)
            setLoadingPosts(false)
        })
    }, [requestedPosts])

    return (
        <SafeAreaView>
            <ScrollView style={{ height: 200 }}>
                {isLoading ? <Text>Loading</Text> : <SubReddit
                    thumbnail={subRedditData.data.icon_img}
                    subCount={subRedditData.data.subscribers}
                    public_description={subRedditData.data.public_description}
                    description={subRedditData.data.description}
                    subTitle={subRedditData.data.display_name_prefixed}
                    isSubscriber={params.chosenSubReddit.isSubscriber}
                    banner={subRedditData.data.mobile_banner_image} />}
            </ScrollView>

            <View>
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
                        setRequestedPosts("https://oauth.reddit.com/" + params.chosenSubReddit.subTitle + "/top")
                        setFilter("top")
                        setLoadingPosts(true)
                    }}>
                        <Text style={style.buttonText}><Ionicons name="ios-rocket-outline" size={25} color="orange" />Top</Text>
                    </Pressable>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedPosts("https://oauth.reddit.com/" + params.chosenSubReddit.subTitle + "/best")
                        setLoadingPosts(true)
                        setFilter("best")
                    }}>
                        <Text style={style.buttonText}><Ionicons name="ios-medal-outline" size={25} color="orange" />Best</Text>
                    </Pressable>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedPosts("https://oauth.reddit.com/" + params.chosenSubReddit.subTitle + "/hot")
                        setLoadingPosts(true)
                        setFilter("hot")
                    }}>
                        <Text style={style.buttonText}><Ionicons name="ios-flame-outline" size={25} color="orange" />Hot</Text>
                    </Pressable>
                    <Pressable style={style.filterButton} onPress={() => {
                        setRequestedPosts("https://oauth.reddit.com/" + params.chosenSubReddit.subTitle + "/new")
                        setLoadingPosts(true)
                        setFilter("new")
                    }}>
                        <Text style={style.buttonText}><Ionicons name="newspaper-outline" size={25} color="orange" />New</Text>
                    </Pressable>
                </ScrollView>
            </View>






            {!isLoadingPosts ? (
                <ScrollView
                    
                contentContainerStyle={{
                    paddingBottom: 300,
                    justifyContent: 'center',
                }}
                onScroll={({ nativeEvent }) => {
                    if (scrollReachedEnd(nativeEvent) && !scrollBottomEvent) {
                        setBottomEnd(true)
                        var lastPost = subRedditPosts.data.children.pop()

                        var postId = lastPost.data.name
                        console.log("DANGER ON SCROLL END")
                        setLoadingPosts(true)
                        setRequestedPosts("https://oauth.reddit.com/"+ params.chosenSubReddit.subTitle + "/" + filterType + "?limit=25&after=" + postId)
                    }
                }}
                scrollEventThrottle={400}
                centerContent="true"
                refreshControl={<RefreshControl
                    onRefresh={onRefresh}
                    refreshing={isLoading}
                    removeClippedSubviews="true"
                />}>

                    {
                        subRedditPosts &&
                        subRedditPosts.data.children.map((val, key) => {
                            return (
                                <PostComponent key={key} postTitle={val.data.title}
                                    postHint={val.data.post_hint}
                                    selfText={val.data.selfText}
                                    authorName={val.data.author}
                                    postImage={val.data.url}
                                    ups={val.data.score}
                                    postType={val.data.link_flair_text}
                                    postVideo={val.data.is_video && val.data.media != null ? val.data.media.reddit_video.fallback_url : ""}
                                />
                            )

                        })
                    }

                </ScrollView>

            ) : <ActivityIndicator color='orange' size="large" />}










        </SafeAreaView>
    )



}


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
})