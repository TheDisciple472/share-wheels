import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Pressable, Text } from "react-native";
export default function FeatureComponent() {
  return (
    <Pressable style={styles.featureContainer}>
      <Pressable style={styles.featureBorder}>
        <MaterialCommunityIcons
          name="sofa-single-outline"
          color={colors.gray}
          size={scale(20)}
        />
      </Pressable>
      <View>
        <Text style={styles.featureTitle}>Capacity</Text>
        <Text style={styles.featureInfo}>5 Seats</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  featureContainer: {
    backgroundColor: colors.outlineButtonBg,
    height: scale(118),
    flex: 1,
    borderRadius: scale(10),
    padding: scale(8),
    paddingBottom: scale(12),
    justifyContent: "space-between",
  },
  featureTitle: {
    color: colors.placeholder,
    fontSize: FontSize.FONT_12Px,
    fontFamily: typography.semiBold,
  },
  featureInfo: {
    color: colors.black,
    fontSize: FontSize.FONT_14Px,
    fontFamily: typography.semiBold,
  },
  featureBorder: {
    backgroundColor: colors.white,
    height: scale(34),
    width: scale(34),
    borderRadius: scale(100),
    alignItems: "center",
    justifyContent: "center",
  },
});
