import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import InputComponent from "./InputComponent";

type Props = {
  onFilterPress?: () => void;
};

export default function SearchComponent({ onFilterPress }: Props) {
  return (
    <View style={[styles.flexRow]}>
      <InputComponent
        onChangeInput={(e) => console.log(e)}
        leftAction={
          <MaterialIcons color={colors.gray} name="search" size={scale(24)} />
        }
        containerStyle={styles.inputContainer}
        placeholder="Search your dream car....."
      />
      <Pressable
        onPress={onFilterPress}
        style={[styles.borderRound, styles.wh]}
      >
        <MaterialCommunityIcons
          name="filter-outline"
          size={scale(26)}
          color={colors.gray}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(14),
    paddingVertical: scale(12),
    paddingHorizontal: scale(18),
    backgroundColor: colors.background,
  },
  inputContainer: {
    flex: 1,
    marginTop: 0,
    height: scale(50),
    paddingVertical: 0,
  },
  borderRound: {
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    height: scale(40),
    width: scale(40),
    borderRadius: scale(100),
  },
  wh: {
    backgroundColor: colors.white,
  },
});
