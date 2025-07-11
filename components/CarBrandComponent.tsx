import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import imagesPaths from "@/assets/imagesPath";
import { renderMarginTop } from "@/utils/ui-utils";

type Props = {
  text: string;
  image?: string;
  onPress?: () => void;
  isSelected?: number;
  isHorizontal?: boolean;
  item?: number;
};

const { tesla } = imagesPaths;

export default function CarBrandComponent({
  text,
  image,
  onPress,
  isSelected,
  isHorizontal,
  item,
}: Props) {
  const styles = createStyles(isHorizontal, isSelected === item);
  return (
    <Pressable style={styles.brandContainer}>
      {/* <View style={[styles.brand]}> */}
        <View style={styles.brand}>
          <Image
            resizeMode="contain"
            source={tesla}
            style={styles.brandImage}
          />
        </View>
        {/* {renderMarginTop(4)} / */}
      {/* </View> */}
      <Text style={styles.brandText}>{text}</Text>
    </Pressable>
  );
}

const createStyles = (
  isHorizontal: boolean | undefined,
  isSelected: boolean | undefined
) =>
  StyleSheet.create({
    brandContainer: {
      marginRight: isHorizontal ? scale(12) : scale(30),
      alignItems: "center",
      flexDirection: isHorizontal ? "row" : "column",
      columnGap: isHorizontal ? scale(4) : 0,
    //   backgroundColor: isSelected ? colors.bgTab : colors.background,
    // backgroundColor : "red",
      paddingHorizontal: scale(4),
      paddingVertical: scale(4),
      borderRadius: scale(30),
    },
    brand: {
      backgroundColor: colors.black,
      borderRadius: scale(100),
      height: isHorizontal ? scale(32) : scale(50),
      width: isHorizontal ? scale(32) : scale(50),
      alignItems: "center",
      justifyContent: "center",
    },
    brandText: {
      color: isSelected ? colors.white : colors.placeholder,
      fontSize: FontSize.FONT_12Px,
      fontFamily: isHorizontal ? typography.semiBold : typography.regular,
      marginRight: isHorizontal ? scale(6) : 0,
    },
    brandImage: {
      height: isHorizontal ? scale(18) : scale(28),
      width: isHorizontal ? scale(18) : scale(28),
      textAlign: "center",
    },
  });
