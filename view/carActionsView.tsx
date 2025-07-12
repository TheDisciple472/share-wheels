import { View, Text, Pressable, Button, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import Fontisto from "@expo/vector-icons/Fontisto";
import { FontSize } from "@/theme/font-size";
import { typography } from "@/theme/typography";
import ButtonComponent from "@/components/ButtonComponent";

export default function CarActionView() {
  return (
    <View style={[styles.flex, styles.priceContainer]}>
      <View style={[styles.flex]}>
        <Pressable style={styles.dollarContainer}>
          <Fontisto name="dollar" size={scale(8)} color={colors.gray} />
        </Pressable>
        <Text style={[styles.text, styles.textBold, styles.price]}>
          $200/Day
        </Text>
      </View>
      <ButtonComponent
        text="Book now"
        buttonStyles={styles.buttonStyles}
        textStyles={styles.textStyles}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.FONT_16Px,
    color: colors.black,
    fontFamily: typography.bold,
  },
  textContainer: {
    paddingHorizontal: scale(12),
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
  textBold: {
    fontFamily: typography.semiBold,
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
  flex: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(2),
  },
  buttonStyles: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(8),
  },
  textStyles: {
    fontSize: FontSize.FONT_12Px,
  },
});
