import * as React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { NavigationContainer, TabActions, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen, PostsScreen,SubRedditsScreen} from './screens'
import { selectLogIn, setLogOut } from './redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Theme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: '#363636',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerMode: 'none',
        }}>
            <Stack.Screen name="Auth" component={LoginScreen} />
        </Stack.Navigator>
    )
}

function HomeStack() {
    const dispatch = useDispatch()
    return (
        <Tab.Navigator theme={Theme}  screenOptions={ ({route}) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Posts') {
                iconName = focused
                  ? 'albums'
                  : 'albums-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              }else if (route.name === 'Subreddits'){
                  iconName = focused ? 'logo-reddit' : 'logo-reddit'
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'grey',
            tabBarStyle: {
                alignContent:'center',
                backgroundColor:"#363636"
            },
            headerShown:false,
          })}
        >
            <Tab.Screen name="Posts" component={PostsScreen}/>
            <Tab.Screen name="Subreddits" component={SubRedditsScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
            <Tab.Screen name="Subreddit" component={SubRedditProfileScreen} options={{
        unmountOnBlur:true,
        tabBarButton: () => null,
        tabBarVisible: false, // if you don't want to see the tab bar
      }}/>
        </Tab.Navigator>
    )
}

export function Router() {
    const isLoggedIn = useSelector(selectLogIn)
    return (
        <NavigationContainer theme={Theme}>
           
           
            {isLoggedIn ? <HomeStack /> : <AuthStack />}
            
        </NavigationContainer>
    )
}