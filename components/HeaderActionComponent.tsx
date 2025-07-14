import { View, StyleSheet, Image, Text } from "react-native";
import imagesPaths from "@/assets/imagesPath";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";

const  {person} = imagesPaths

export default function HeaderActionComponent () {
     return (
    <View style={styles.headerAction}>
      <Image source={person} style={styles.person} />
      <Text style={styles.title}>Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    headerAction: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(10),
    },
    person: {
      height: scale(40),
      width: scale(40),
      borderRadius: 100,
    },
    title: {
      fontSize: FontSize.FONT_20Px,
      fontFamily: typography.bold,
      color: colors.black,
    }
})