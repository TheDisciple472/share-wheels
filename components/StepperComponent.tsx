import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, Text } from "react-native";

type Props = {
    active : number
}

export default function StepperComponent({active}: Props) {
  return (
    <View style={styles.checkMarkContainer}>
      <View style={styles.line} />
      <View style={styles.checkMark}>
        <View style={styles.check}>
          {active > 1 && (
            <MaterialCommunityIcons
              name="check"
              color={colors.white}
              size={scale(16)}
            />
          )}
          {active === 1 && <View style={styles.active} />}
        </View>
        <Text
          style={[styles.checkMarkText, active !== 1 && styles.inActiveText]}
        >
          Booking details
        </Text>
      </View>
      <View style={styles.checkMark}>
        <View style={styles.check}>
          {active > 2 && (
            <MaterialCommunityIcons
              name="check"
              color={colors.white}
              size={scale(16)}
            />
          )}
          {active === 2 && <View style={styles.active} />}
        </View>
        <Text
          style={[styles.checkMarkText, active !== 2 && styles.inActiveText]}
        >
          Payment methods
        </Text>
      </View>
      <View style={styles.checkMark}>
        <View style={styles.check}>
          {active > 3 && (
            <MaterialCommunityIcons
              name="check"
              color={colors.white}
              size={scale(16)}
            />
          )}
          {active === 3 && <View style={styles.active} />}
        </View>
        <Text
          style={[styles.checkMarkText, active !== 3 && styles.inActiveText]}
        >
          confirmation
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkMarkContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(12),
    justifyContent: "space-between",
    paddingVertical: scale(12),
  },
  checkMark: {
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  checkMarkText: {
    marginTop: scale(6),
    fontSize: FontSize.FONT_12Px,
    fontFamily: typography.semiBold,
  },
  inActiveText: {
    color: colors.placeholder,
  },
  check: {
    height: scale(20),
    width: scale(20),
    backgroundColor: colors.black,
    borderRadius: scale(100),
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: scale(1),
    width: "80%",
    backgroundColor: colors.black,
    top: "50%",
    left: "10%",
    position: "absolute",
  },
  active: {
    height: scale(10),
    width: scale(10),
    backgroundColor: colors.background,
    borderRadius: scale(100),
  },
});
