import imagesPaths from "@/assets/imagesPath";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { View, StyleSheet, TextInput, Image, Pressable } from "react-native";
import { useState } from "react";

export type Props = {
  onChangeInput?: (e: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  onPress? : () => void,
  isSecured? : boolean
};
const { eye } = imagesPaths;






export default function InputComponent({
  onChangeInput,
  placeholder,
  secureTextEntry,
  onPress,
  isSecured
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeInput}
      />
      {isSecured && (
        <Pressable onPress={onPress}>
          <Image source={eye} style={styles.eye} resizeMode="contain" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(12),
    backgroundColor: colors.white,
    paddingVertical: scale(12),
    marginTop: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: scale(12),
    columnGap: scale(5),
  },
  input: {
    fontSize: FontSize.FONT_17Px,
    color: colors.black,
    fontWeight: "300",
    paddingHorizontal: scale(11),
    paddingVertical: scale(4),
    // backgroundColor: "red",
    flex: 1,
    marginLeft: scale(10),
  },
  eye: {
    height: scale(22),
    width: scale(22),
  },
});
