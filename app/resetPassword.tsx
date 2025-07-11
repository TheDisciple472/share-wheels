import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import imagesPaths from "@/assets/imagesPath";
import { renderMarginBottom, renderMarginTop } from "@/utils/ui-utils";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { useRouter } from "expo-router"; 

const { logoBlack } = imagesPaths;
const route = useRouter();
export default function ResetPassword() {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.flexRow}>
          <Image source={logoBlack} style={styles.carLogo} />
          <Text style={styles.titleStyle}>Share-Wheels</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.textContainer}>
            <Text style={[styles.textStyle, styles.textCenter]}>
              Reset your password
            </Text>
            {renderMarginTop(12)}
            <Text style={styles.infoText}>
              Enter the email address associated with your account and
            </Text>
            <Text style={styles.infoText}>
              we'll send you a link to reset your password.
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputComponent placeholder={"Email"} />
          </View>
          {renderMarginTop(28)}
          <ButtonComponent 
          text="Continue" 
          textStyles={styles.buttonText} 
          onPress={()=> route.push("/otpScreen")}
          />
          {renderMarginTop(28)}
          <Text
            onPress={() => route.push("/signIn")}
            style={[styles.dontHaveText, styles.textCenter]}
          >
            Return to sign in
          </Text>
        </View>
      </View>
      <Text  
      onPress={()=> route.push("/signUp")}
      style={[styles.dontHaveText, styles.textCenter]}>
        Create a New account{' '}
      </Text>
      {renderMarginBottom(32)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: scale(18),
    paddingTop: scale(28),
  },
  main: {
    flex: 0.8,
    justifyContent: "center",
  },
  flex: {
    flex: 1,
  },
  carLogo: {
    height: scale(38),
    width: scale(38),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(12),
    paddingVertical: scale(12),
  },
  titleStyle: {
    fontSize: FontSize.FONT_24Px,
    color: colors.black,
    flex: 1,
    fontFamily: typography.bold,
  },
  textContainer: {
    paddingTop: scale(38),
    marginBottom: scale(12),
  },
  infoText: {
    color: colors.placeholder,
    fontFamily: typography.regular,
    textAlign: "center",
  },
  textStyle: {
    color: colors.black,
    fontSize: FontSize.FONT_26Px,
    fontFamily: typography.semiBold,
  },
  textCenter: {
    textAlign: "center",
  },
  textRemember: {
    fontSize: FontSize.FONT_12Px,
    color: colors.placeholder,
    fontFamily: typography.regular,
  },
  inputContainer: {
    rowGap: scale(6),
  },
  colG2: {
    columnGap: scale(2),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(16),
  },
  forgotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  outlineButton: {
    backgroundColor: colors.outlineButtonBg,
    borderWidth: 1,
    borderColor: colors.button,
  },
  outlineButtonSignUpText: {
    color: colors.black,
    fontFamily: typography.bold,
    fontSize: FontSize.FONT_18Px,
  },
  outlineButtonText: {
    color: colors.black,
    fontFamily: typography.bold,
    fontSize: FontSize.FONT_14Px,
  },
  buttonText: {
    fontFamily: typography.bold,
    fontSize: FontSize.FONT_18Px,
  },
  buttonContainer: {
    rowGap: scale(14),
    marginTop: scale(12),
  },
  borderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: scale(12),
    marginTop: scale(18),
  },
  orText: {
    fontSize: FontSize.FONT_12Px,
    width: scale(15),
    fontFamily: typography.regular,
    color: colors.placeholder,
  },
  orBorder: {
    height: 1,
    flex: 1,
    backgroundColor: colors.divider,
    marginVertical: scale(18),
  },
  buttonStyle: {
    flexDirection: "row",
    columnGap: scale(12),
  },
  iconButtonStyle: {
    backgroundColor: colors.outlineButtonBg,
    borderWidth: 1,
    borderColor: colors.btnBorder,
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(8),
    paddingVertical: scale(10),
  },
  mt14: {
    marginTop: scale(14),
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
