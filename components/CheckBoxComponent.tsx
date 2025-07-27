import { View, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { scale } from "@/theme/scale";
import { colors } from "@/theme/colors";
import { useState } from "react";


type Props = {
  onPress: (e : boolean) => void;
  isChecked: boolean;
};

export default function CheckBoxComponent({ onPress, isChecked = false }: Props) {
    const [checked , setChecked] = useState<boolean>(isChecked)
  return (
    <Pressable style={styles.container} onPress={()=>{
      
        setChecked(!checked);
        onPress(!checked) 
        }}>
      {checked && ( 
        <MaterialIcons
          name="check"
          style={styles.checkIcon}
          size={scale(15)}
          color={colors.white}
        /> 
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.checkBoxBackground,
    alignSelf: "flex-start",
    height: scale(22),
    width: scale(22),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(4),
  },
  checkIcon: {},
});
