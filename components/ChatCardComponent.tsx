import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderMarginBottom } from "@/utils/ui-utils";
import { View,StyleSheet, Text } from "react-native";

type Props = {
    isSelf: boolean;
    message? :string;
    time? : string
}

export default function ChatCardComponent ({isSelf, time, message} : Props) {
    const styles = createStyles(isSelf);
    return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>{message}</Text>
      </View>
      {renderMarginBottom(2)}
      <Text style={styles.timeStamp}>{time}</Text>
    </View>
  );
}

const createStyles = (isSelf : boolean) => StyleSheet.create({
    container: {
      marginBottom: scale(18),
    },
    card: {
      backgroundColor: colors.white,
      paddingVertical: scale(12),
      paddingHorizontal: scale(12),
      borderRadius: scale(10),
      borderBottomRightRadius: isSelf ? 0 : scale(10),
      borderBottomLeftRadius: !isSelf ? 0 : scale(10),
    },
    text: {
      color: colors.black,
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
    },
    timeStamp: {
      fontSize: FontSize.FONT_12Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
      textAlign: isSelf ? 'left' : 'right',
    },
})