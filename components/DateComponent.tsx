import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import BottomSheet from "./BottomSheet";
import ButtonComponent from "./ButtonComponent";

type Props = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

export default function DateComponent({ visible, setVisible }: Props) {
  const defaultStyles = useDefaultStyles();
  const [startDate, setStartDate] = useState<DateType>();
  const [endDate, setEndDate] = useState<DateType>();

  return (
    <BottomSheet visible={visible} setVisible={setVisible}>
      <View style={styles.container}>
        <DateTimePicker
          mode="range"
          startDate={startDate}
          endDate={endDate}
          styles={defaultStyles}
          onChange={({ startDate: s, endDate: e }) => {
            setStartDate(s);
            setEndDate(e);
          }}
        />
        <View style={styles.buttonContainer}>
          <ButtonComponent
            onPress={() => setVisible(false)}
            text="Cancel"
            buttonStyles={styles.outlineBtn}
            textStyles={styles.outlineText}
          />
          <ButtonComponent
            onPress={() => setVisible(false)}
            text="Done"
            buttonStyles={styles.btn}
          />
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    backgroundColor: colors.white,
    paddingTop: scale(12),
    borderTopRightRadius: scale(12),
    borderTopLeftRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: scale(18),
  },
  btn: {
    flex: 0.5,
    paddingVertical: scale(12),
  },
  outlineBtn: {
    flex: 0.4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black,
    paddingVertical: scale(12),
  },
  outlineText: {
    color: colors.black,
  },
});
