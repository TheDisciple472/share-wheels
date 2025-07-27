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
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ImageSourcePropType,
  Dimensions,
} from "react-native";

type Props = {
  bottomActions?: React.ReactNode;
  imageSource: string;
  onPress?: () => void;
  location? : string;
  rating?: number;
  seats?: number;
  price?: string;
  name? : string
};

export default function CarComponent({
  bottomActions,
  imageSource,
  onPress,
  location,
  rating,
  seats,
  price,
  name,
}: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* <Pressable style={styles.favContainer}>
        <MaterialCommunityIcons name={"cards-heart-outline"} size={scale(18)} />
      </Pressable> */}
      <View style={styles.carBackground}>
        <Image
          source={{uri : imageSource}}
          resizeMode="contain"
          style={styles.carImage}
        />
      </View>
      <View style={styles.textContainer}>
        {renderMarginBottom(4)}
        <Text style={styles.title}>{name}</Text>
        {/* {renderMarginBottom(4)}
        <View style={styles.flex}>
          <Text style={styles.title}>{rating}</Text>
          <MaterialIcons name="star" size={scale(20)} color={colors.star} />
        </View> */}
        {renderMarginBottom(4)}
        <View style={[styles.flex]}>
          <MaterialIcons
            name="location-pin"
            size={scale(16)}
            color={colors.gray}
          />
          <Text style={styles.text}>{location}</Text>
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
              <Text style={[styles.text, styles.textBold]}>{seats} Seats</Text>
            </View>
            <View style={[styles.flex]}>
              
              <Text style={[styles.text, styles.textBold, styles.price]}>
                {price} XAF/D
              </Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const { width: screenWidth } = Dimensions.get('window');
const SCREEN_HORIZONTAL_PADDING = scale(16); // Adjust this if your overall screen has different padding
const COLUMN_GAP = scale(14);
const calculatedCarComponentWidth = (screenWidth - (2 * SCREEN_HORIZONTAL_PADDING) - COLUMN_GAP) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(16),
    width: calculatedCarComponentWidth,
    paddingBottom: scale(10),
  },
  carImage: {
    height: scale(100),
    width: scale(160),
    maxWidth: "100%",
    maxHeight: "100%",
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
