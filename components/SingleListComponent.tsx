import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Text } from "react-native";

interface SingleListProps {
    children : React.ReactNode;
    text : string
}

export default function SingleListComponent ({children, text} : SingleListProps) {
     return (
    <View style={styles.container}>
      <View style={styles.frcg}>
        <View style={styles.iconContainer}>{children}</View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        color={colors.gray}
        size={scale(24)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
     container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scale(8),
    },
    frcg: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(12),
    },
    iconContainer: {
      height: scale(40),
      width: scale(40),
      borderRadius: scale(100),
      borderWidth: 1,
      borderColor: colors.btnBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: FontSize.FONT_14Px,
      color: colors.primary,
      fontFamily: typography.regular,
    },
})