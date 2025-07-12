import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { View, StyleSheet, Text, ViewStyle, Pressable, Image } from "react-native";
import imagesPaths from "@/assets/imagesPath";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props ={
    containerStyle? : ViewStyle;
    fromReview? : boolean;
    ratingCount? : number
}
const {person} = imagesPaths

export default function ReviewComponent ({containerStyle, fromReview, ratingCount}:Props) {
    return (
        <Pressable style={[styles.card, containerStyle]}>
      <View style={styles.frsb}>
        <View style={styles.frcg}>
          <Image source={person} style={styles.person} resizeMode="contain" />
          <Text style={styles.reviewTitle}>John Doe</Text>
        </View>
        <View style={[styles.frcg, styles.dayContainer]}>
          {!fromReview && <Text style={styles.textBold}>5.0</Text>}
          {fromReview && <Text style={styles.dayText}>Today</Text>}
          {!fromReview && (
            <FontAwesome name="star" size={scale(18)} color={colors.star} />
          )}
        </View>
      </View>
      {fromReview && (
        <View style={styles.starsContainer}>
          {Array.from({length: 5}).map((_, index) => (
            <FontAwesome
              name="star"
              size={scale(14)}
              color={ratingCount && index < ratingCount ? colors.star : colors.unFilledStar}
            />
          ))}
        </View>
      )}
      <Text style={styles.text}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum alias
        accusantium qui rerum iste perferendis consectetur non voluptatibus,
      </Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: scale(10),
      paddingHorizontal: scale(12),
      paddingVertical: scale(12),
      width: scale(240),
      marginRight: scale(18),
    },
    person: {
      width: scale(32),
      height: scale(32),
    },
    dayText: {
      color: colors.placeholder,
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
    },
    reviewTitle: {
      fontSize: FontSize.FONT_14Px,
      color: colors.black,
      fontFamily: typography.semiBold,
    },
    frcg: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(10),
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(3),
      marginTop: scale(8),
      marginBottom: scale(8),
    },
    dayContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    frsb: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textBold: {
      fontFamily: typography.bold,
      fontSize: FontSize.FONT_14Px,
    },
    text: {
      fontSize: FontSize.FONT_12Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
})