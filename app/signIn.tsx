import imagesPaths from "@/assets/imagesPath";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import InputComponent from "@/components/InputComponent";
import CheckBoxComponent from "@/components/CheckBoxComponent";
import ButtonComponent from "@/components/ButtonComponent";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { typography } from "@/theme/typography";
import { useRouter } from "expo-router";
import { useState } from "react";


const route = useRouter();
const { logoBlack } = imagesPaths;
export default function SignIn() {
  const {isSecure, setIsSecure} = useSignin();
  const handleChangeInput = (event: string) => {
    console.log(event);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexRow}>
        <Image source={logoBlack} style={styles.carLogo} />
        <Text style={styles.titleStyle}>Share-Wheels</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Welcome Back</Text>
        <Text style={styles.textStyle}>Ready to hit the road</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputComponent placeholder="Email" onChangeInput={handleChangeInput} />
        <InputComponent
          isSecured
          placeholder="Password"
          onChangeInput={handleChangeInput}
          secureTextEntry={!isSecure}
          onPress={()=> setIsSecure(!isSecure)}
        />
      </View>
      <View style={styles.colG2}>
        <View style={styles.flexRow}>
          <CheckBoxComponent
            isChecked={false}
            onPress={(e) => {
              console.log("item", e);
            }}
          />

          <Text style={styles.textRemember}>Remember Me</Text>
        </View>
        <Text>Forgot Password</Text>
      </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent text="Login" textStyles={styles.buttonText} />
          <ButtonComponent
            text="Sign Up"
            buttonStyles={styles.outlineButton}
            textStyles={styles.outlineButtonText}
            onPress={() => route.push("/signUp")}
          />
        </View>
      <View style={styles.borderContainer}>
        <View style={styles.orBorder} />
        <Text>Or</Text>
        <View style={styles.orBorder} />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          text="Apple pay"
          buttonStyles={styles.outlineButton}
          textStyles={styles.appleText}
          children={<MaterialIcons name="apple" size={scale(20)} />}
        />
        <ButtonComponent
          text="Google pay"
          buttonStyles={styles.outlineButton}
          textStyles={styles.outlineButtonText}
          children={<AntDesign name="google" size={scale(20)} />}
        />
      </View>
      <View style={styles.haveAccountContainer}>
        <Text style={styles.dontHaveText}>
          Don't have an account ? {"\t"}
          <Text style={styles.dontHaveText}>Sign Up</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(12),
    marginTop: scale(26),
    backgroundColor: colors.background,
  },
  carLogo: {
    height: scale(38),
    width: scale(38),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(14),
    paddingVertical: scale(12),
  },
  titleStyle: {
    fontSize: FontSize.FONT_24Px,
    color: colors.black,
    fontWeight: "500",
  },
  textContainer: {
    paddingTop: scale(45),
    marginBottom: scale(12),
  },
  textStyle: {
    fontSize: FontSize.FONT_26Px,
    color: colors.black,
  },
  textRemember: {
    color: colors.placeholder,
    fontSize: FontSize.FONT_12Px,
    fontWeight: "500",
  },
  forgotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colG2: {
    columnGap: scale(2),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(16),
  },
  inputContainer: {
    rowGap: scale(6),
  },
  outlineButton: {
    backgroundColor: colors.outlineButtonBg,
    borderWidth: 1,
    borderColor: colors.button,
  },
  outlineButtonText: {
    color: colors.black,
  },
  buttonContainer: {
    rowGap: scale(16),
    marginTop: scale(10),
    fontWeight: "600",
  },
  buttonText: {
    fontWeight: "600",
  },
  appleText: {
    color: colors.black,
  },
  borderContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: scale(12),
    marginTop: scale(18),
  },
  orText: {
    fontSize: FontSize.FONT_12Px,
    width: scale(15),
    color: colors.placeholder,
  },
  orBorder: {
    height: 1.5,
    flex: 1,
    backgroundColor: colors.border,
  },
  haveAccountContainer: {
    alignItems: "center",
    marginTop: scale(28),
    paddingBottom: scale(28),
  },
  dontHaveText: {
    color: colors.placeholder,
    fontFamily: typography.regular,
  },
});



interface ISiginInProps {
  isSecure: boolean;
  setIsSecure: (e: boolean) => void;
}

const useSignin = (): ISiginInProps => {
  const [isSecure, setIsSecure] = useState(false);
  return {
    isSecure,
    setIsSecure,
  };
};