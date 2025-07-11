import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import imagesPaths from "@/assets/imagesPath";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";

type Props = {
  title: string;
  hasBack?: boolean;
};

const { logoBlack, person } = imagesPaths;
const goBack = () => {};
export default function Header({ title, hasBack }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.flexRow}>
        {hasBack ? (
          <Pressable onPress={goBack} style={styles.borderRound}>
            <MaterialIcons
              name="chevron-left"
              size={scale(28)}
              color={colors.black}
            />
          </Pressable>
        ) : (
          <React.Fragment>
            <Image source={logoBlack} style={styles.carLogo} />
            <Text style={styles.titleStyle}>{title}</Text>
          </React.Fragment>
        )}
      </View>
      {hasBack && <Text style={[styles.titleStyle, styles.t20]}>{title}</Text>}
      <View style={styles.flexRow}>
        {hasBack ? (
          <Pressable style={styles.borderRound}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={scale(26)}
              color={colors.black}
            />
          </Pressable>
        ) : (
          <React.Fragment>
            <Pressable style={styles.borderRound}>
              <Octicons name="bell" size={scale(20)} color={colors.gray} />
            </Pressable>
            <Pressable>
              <Image source={person} style={styles.person} />
            </Pressable>
          </React.Fragment>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: scale(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop : scale(28)
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(14),
    paddingVertical: scale(12),
  },
  titleStyle: {
    fontSize: FontSize.FONT_24Px,
    color: colors.black,
    fontFamily: typography.bold,
  },
  t20: {
    fontSize: FontSize.FONT_20Px,
  },
  carLogo: {
    height: scale(38),
    width: scale(38),
  },
  borderRound: {
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    height: scale(40),
    width: scale(40),
    borderRadius: scale(100),
  },
  person: {
    height: scale(40),
    width: scale(40),
  },
});
