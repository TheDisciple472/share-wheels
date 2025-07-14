import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderMarginBottom } from "@/utils/ui-utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Pressable, Text } from "react-native";

type Props = {
  unRead: boolean;
};

export default function NotificationSingleItem({ unRead = true }: Props) {
    const styles = createStyles(unRead);
  return (
    <Pressable style={styles.notificationContainer}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="archive-cancel-outline"
          size={scale(24)}
          color={colors.gray}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>Car Booking Lorem ipsum</Text>
          <Text style={styles.notificationTime}>
            12:54 am {"\t"} {unRead && <View style={styles.badge} />}
          </Text>
        </View>
        {renderMarginBottom(4)}
        <Text
          style={styles.notificationText}
          ellipsizeMode="tail"
          numberOfLines={5}
        >
          Car Booking Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Labore temporibus consectetur, obcaecati expedita laudantium Labore
          temporibus
        </Text>
      </View>
    </Pressable>
  );
}

const createStyles = (unRead: boolean) =>
  StyleSheet.create({
    notificationContainer: {
      marginBottom: scale(12),
      paddingHorizontal: scale(18),
      paddingVertical: scale(12),
      flexDirection: "row",
      alignItems: "center",
      columnGap: scale(12),
      flex: 1,
      backgroundColor: unRead ? colors.white : colors.background,
    },
    notificationTitle: {
      fontSize: FontSize.FONT_14Px,
      color: colors.black,
      fontFamily: typography.medium,
    },
    notificationText: {
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
    textContainer: {
      flexShrink: 1,
    },
    iconContainer: {
      height: scale(40),
      width: scale(40),
      borderWidth: 1,
      borderColor: colors.btnBorder,
      borderRadius: scale(100),
      alignItems: "center",
      justifyContent: "center",
    },
    notificationHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    notificationTime: {
      fontSize: FontSize.FONT_12Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
    badge: {
      height: scale(7),
      width: scale(7),
      backgroundColor: colors.badgeBg,
      borderRadius: scale(100),
    },
  });
