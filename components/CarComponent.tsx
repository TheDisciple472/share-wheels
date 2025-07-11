import imagesPaths from "@/assets/imagesPath";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderMarginBottom } from "@/utils/ui-utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";

type Props = {
  bottomActions?: React.ReactNode;
};

const { car1 } = imagesPaths;

export default function CarComponent({ bottomActions }: Props) {
  return (
    <Pressable style={styles.container}>
      <Pressable style={styles.favContainer}>
        <MaterialCommunityIcons name={"cards-heart-outline"} size={scale(18)} />
      </Pressable>
      <View style={styles.carBackground}>
        <Image source={car1} resizeMode="contain" style={styles.carImage} />
      </View>
      <View style={styles.textContainer}>
        {renderMarginBottom(4)}
        <Text style={styles.title}>Ferrari</Text>
        {renderMarginBottom(4)}
        <View style={styles.flex}>
          <Text style={styles.title}>5.0</Text>
          <MaterialIcons name="star" size={scale(20)} color={colors.star} />
        </View>
        {renderMarginBottom(4)}
        <View style={[styles.flex]}>
          <MaterialIcons
            name="location-pin"
            size={scale(16)}
            color={colors.gray}
          />
          <Text style={styles.text}>Douala</Text>
        </View>
        {renderMarginBottom(6)}
        {bottomActions ? (
          bottomActions
        ) : (
          <View style={[styles.flex, styles.priceContainer]}>
            <View style={[styles.flex]}>
              <MaterialCommunityIcons
                name="sofa-single-outline"
                size={scale(16)}
                color={colors.gray}
              />
              <Text style={[styles.text, styles.textBold]}>4 Seats</Text>
            </View>
            <View style={[styles.flex]}>
              <Pressable style={styles.dollarContainer}>
                <Fontisto name="dollar" size={scale(8)} color={colors.gray} />
              </Pressable>
              <Text style={[styles.text, styles.textBold, styles.price]}>
                $200/Day
              </Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(16),
    maxWidth: "50%",
    paddingBottom: scale(10),
  },
  carImage: {
    height: scale(100),
    width: scale(160),
  },
  title: { fontFamily: typography.semiBold, fontSize: FontSize.FONT_14Px },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(2),
  },
  textBold: {
    fontFamily: typography.semiBold,
  },
  textContainer: {
    paddingHorizontal: scale(8),
  },
  text: {
    fontSize: FontSize.FONT_12Px,
    color: colors.placeholder,
    fontFamily: typography.regular,
  },
  dollarContainer: {
    borderColor: colors.gray,
    borderWidth: scale(1),
    height: scale(14),
    width: scale(14),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  priceContainer: {
    paddingVertical: scale(4),
    alignItems: "center",
    columnGap: scale(8),
  },
  price: {
    fontSize: FontSize.FONT_11Px,
    color: colors.black,
  },
  carBackground: {
    borderTopRightRadius: scale(16),
    borderTopLeftRadius: scale(16),
    backgroundColor: colors.carBg,
  },
  favContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 999,
    right: scale(4),
    top: scale(4),
    borderRadius: 100,
    height: scale(30),
    width: scale(30),
  },
});
