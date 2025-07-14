import { colors } from "@/theme/colors";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { scale } from "@/theme/scale";

export default function TabsLayout() {
  return(
    <Tabs
    screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.button,
        position : "absolute",
        bottom : scale(25),
        borderRadius : scale(38),
        marginHorizontal : scale(12),
        flexDirection : "row",
        // justifyContent : "center",
        alignItems : "center"
      },
      tabBarShowLabel :  false
    }
    
}
  >
    <Tabs.Screen
      name="homeScreen"
      options={{
        title: "Home",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={focused ? "home-sharp" : "home-outline"}
            color={color} size={22}
          />
        ), 
        headerShown : false
      }}
    />
    <Tabs.Screen
      name="search"
      options={{
        title: "Search",
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name={focused ? "search" : "search"}
            color={color} size={22}
          />
        ), 
        headerShown : false
      }}
    />
    <Tabs.Screen
      name="message"
      options={{
        title: "Message",
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name={focused ? "message" : "message"}
            color={color} size={22}
          />
        ), 
        headerShown : false
      }}
    />
    <Tabs.Screen
      name="notification"
      options={{
        title: "Notification",
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name={focused ? "notifications-none" : "notifications-none"}
            color={color} size={22}
          />
        ), 
        headerShown : false
      }}
    />
    <Tabs.Screen
      name="account"
      options={{
        title: "Account",
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons
            name={focused ? "person-outline" : "person-outline"}
            color={color} size={22}
          />
        ), 
        headerShown : false
      }}
    />
  </Tabs>
  );
}
