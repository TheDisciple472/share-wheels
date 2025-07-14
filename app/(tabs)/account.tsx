import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Text,
} from "react-native";
import imagesPaths from "@/assets/imagesPath";
import HeaderComponent from "@/components/HeaderComponent";
import { renderMarginBottom } from "@/utils/ui-utils";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import SingleListComponent from "@/components/SingleListComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";

const { person } = imagesPaths;

export default function Account() {
  return (
    <View style={styles.container}>
      <HeaderComponent title="Profile" hasBack />
      <ScrollView style={styles.main}>
        {renderMarginBottom(6)}
        <View style={styles.profileContainer}>
          <View style={styles.frcg}>
            <Image source={person} style={styles.profileImage} />
            <View>
              <Text style={styles.title}>John Doe</Text>
              <Text style={styles.email}>john@gmail.com</Text>
            </View>
          </View>
          <Pressable
            onPress={()=> router.push("/editProfileScreen")}
            style={styles.aic}>
            <Feather name="edit-3" size={scale(18)} color={colors.gray} />
            <Text style={styles.editProfile}>Edit Profile</Text>
          </Pressable>
        </View>
        {renderMarginBottom(12)}
        <Text style={styles.title}>General</Text>
        {renderMarginBottom(6)}
        <SingleListComponent
          children={
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Favourite Cars"
        />
        <SingleListComponent
          children={
            <MaterialCommunityIcons
              name="av-timer"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Previous Rent"
        />
        <SingleListComponent
          children={
            <MaterialCommunityIcons
              name="bell-outline"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Notification"
        />
        <SingleListComponent
          children={
            <MaterialCommunityIcons
              name="connection"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Partnership"
        />
        {renderMarginBottom(12)}
        <Text style={styles.title}>Support</Text>
        {renderMarginBottom(6)}
        <SingleListComponent
          children={
            <SimpleLineIcons
              name="settings"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Settings"
        />
        <SingleListComponent
          children={
            <Ionicons
              name="language-outline"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Languages"
        />
        <SingleListComponent
          children={
            <Ionicons
              name="person-add-outline"
              size={scale(20)}
              color={colors.gray}
            />
          }
          text="Invite Friends"
        />
        <SingleListComponent
          children={
            <MaterialIcons name="policy" size={scale(24)} color={colors.gray} />
          }
          text="Privacy Policy"
        />
        <SingleListComponent
          children={
            <MaterialCommunityIcons
              name="headphones"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Help Support"
        />
        <SingleListComponent
          children={
            <MaterialCommunityIcons
              name="logout"
              size={scale(24)}
              color={colors.gray}
            />
          }
          text="Privacy Policy"
        />
        {renderMarginBottom(32)}
        {renderMarginBottom(32)}
        {renderMarginBottom(32)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  main: {
    paddingHorizontal: scale(18),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(12),
  },
  profileImage: {
    height: scale(70),
    width: scale(70),
  },
  frcg: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(12),
  },
  aic: {
    alignItems: "center",
  },
  title: {
    fontSize: FontSize.FONT_16Px,
    color: colors.black,
    fontFamily: typography.semiBold,
  },
  email: {
    fontSize: FontSize.FONT_14Px,
    color: colors.placeholder,
    fontFamily: typography.regular,
  },
  editProfile: {
    fontSize: FontSize.FONT_14Px,
    color: colors.placeholder,
    fontFamily: typography.regular,
  },
});
