import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { View, TextInput, StyleSheet } from "react-native";
import { useRef, useState } from "react";

type Props = {
  onOTPChange?: (otp: string) => void;
};

export default function OtpComponent({ onOTPChange }: Props) {
  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      onOTPChange?.(newOtp.join(""));

      if (text && index < length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);

      onOTPChange?.(newOtp.join(""));

      inputRef.current[index - 1]?.focus();
    }
  };

  const length = 4;
  const inputRef = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          ref={(instance) => {
            inputRef.current[index] = instance;
          }}
          maxLength={1}
          keyboardType="numeric"
          value={otp[index]}
          style={styles.input}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          autoFocus={index === 0}
          importantForAutofill="no"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: scale(12),
  },
  input: {
    width: scale(55),
    height: scale(55),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.btnBorder,
    textAlign: "center",
    fontSize: FontSize.FONT_20Px,
    borderRadius: scale(4),
    marginHorizontal: scale(4),
    fontFamily: typography.regular,
  },
});
