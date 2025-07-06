import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { View, StyleSheet, Pressable, Text, ViewStyle, TextStyle } from "react-native";

type Props = {
    onPress? : () => void,
    text : string,
    buttonStyles? : ViewStyle,
    textStyles? : TextStyle
}

export default function ({onPress, text, textStyles,buttonStyles} : Props) {
    return (
        <Pressable style={[styles.container, buttonStyles]} onPress={onPress}>
            <Text style={[styles.content, textStyles]}>{text}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container : {
        borderRadius : scale(30),
        backgroundColor : colors.button,
        alignItems : "center",
        justifyContent : "center",
        paddingVertical : scale(14)
    },
    content : {
        color : colors.white,
        fontSize : FontSize.FONT_16Px,
        fontWeight : "500"
    }
})