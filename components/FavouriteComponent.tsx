import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";

type Props = {
    favStyles : ViewStyle
}

export default function FavouriteComponent({favStyles}:Props){
    return (
    <Pressable style={[styles.favContainer, favStyles]}>
      <MaterialCommunityIcons name={'cards-heart-outline'} size={scale(18)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
     favContainer: {
      borderWidth: 1,
      borderColor: colors.gray,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 999,
      right: scale(4),
      top: scale(4),
      borderRadius: 100,
      height: scale(30),
      width: scale(30),
    },
})