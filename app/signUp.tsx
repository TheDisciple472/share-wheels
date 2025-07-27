import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import imagesPaths from "@/assets/imagesPath";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import InputComponent from "@/components/InputComponent";
import CountryComponent from "@/components/CountryComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { typography } from "@/theme/typography";
import { useState } from "react";
import { Alert } from "react-native"; // Add this for error/success messages
import { renderMarginTop } from "../utils/ui-utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // Import Picker

const { logoBlack } = imagesPaths;
const route = useRouter();

export default function SignUp() {
  const { isSecure, setIsSecure } = useSignup();

  // 1. State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState(""); // <-- Add phone state
  const [role, setRole] = useState<"USER" | "VENDOR">("USER");
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS
  // 2. Function to handle sign up
  const handleSignUp = async () => {
    try {
      const response = await fetch(`http://${phoneAdress}:3000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, location, phone, role }), // <-- Add phone here
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Signup failed");
      }

      // Success: navigate or show success message
      Alert.alert("Success", "Account created successfully!");
      route.push("/signIn"); // Optionally navigate to login
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexRow}>
        <Image source={logoBlack} style={styles.carLogo} />
        <Text style={styles.titleStyle}>Share-Wheels</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.textStyle, styles.textCenter]}>Sign Up</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputComponent
          placeholder={"Full Name"}
          value={fullName}
          onChangeInput={setFullName}
        />
        <InputComponent
          placeholder={"Email Address"}
          value={email}
          onChangeInput={setEmail}
        />
        <InputComponent
          isSecured
          secureTextEntry={!isSecure}
          placeholder={"Password"}
          value={password}
          onChangeInput={setPassword}
          onPress={() => setIsSecure(!isSecure)}
        />
        <InputComponent
          placeholder={"Location"}
          value={location}
          onChangeInput={setLocation}
        />
        <InputComponent
          placeholder={"Phone Number"} // <-- Add phone input
          value={phone}
          onChangeInput={setPhone}
          keyboardType="phone-pad"
        />
        {/* Add a Picker for role selection */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Role:</Text>
            <Picker
            selectedValue={role}
            onValueChange={(itemValue: "USER" | "VENDOR") => setRole(itemValue)}
            style={styles.picker}
            >
            <Picker.Item label="User" value="USER" />
            <Picker.Item label="Vendor" value="VENDOR" />
            </Picker>
        </View>
      </View>
      {renderMarginTop(5)}
      <View style={styles.buttonContainer}>
        <ButtonComponent
          text="Sign Up"
          textStyles={styles.buttonText}
          onPress={handleSignUp} // <-- Call your handler
        />
        <ButtonComponent
          text="Login"
          buttonStyles={styles.outlineButton}
          textStyles={styles.outlineButtonText}
          onPress={() => route.push("/signIn")}
        />
      </View>
      <View style={styles.borderContainer}>
        <View style={styles.orBorder} />
        <Text>Or</Text>
        <View style={styles.orBorder} />
      </View>
      <View style={styles.buttonContainer}>
        {/* <ButtonComponent
          text="Apple pay"
          buttonStyles={styles.outlineButton}
          textStyles={styles.appleText}
          children={<MaterialIcons name="apple" size={scale(20)} />}
        /> */}
        <ButtonComponent
          text="Google"
          buttonStyles={styles.outlineButton}
          textStyles={styles.outlineButtonText}
          children={<AntDesign name="google" size={scale(20)} />}
        />
      </View>
      <View style={styles.haveAccountContainer}>
        <Text style={styles.dontHaveText}>
          Already have an account ? {"\t"}
          <Text style={styles.dontHaveText}>Login</Text>
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
  textCenter: {
    textAlign: "center",
  },
  textContainer: {
    paddingTop: scale(15),
    marginBottom: scale(8),
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
    rowGap: scale(1),
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
  pickerContainer: {
    marginTop: scale(10),
  },
  label: {
    fontSize: FontSize.FONT_14Px,
    color: colors.placeholder,
    marginBottom: scale(8),
  },
  picker: {
    height: scale(50),
    width: "100%",
  },
});

interface ISiginUpProps {
  isSecure: boolean;
  setIsSecure: (e: boolean) => void;
}

const useSignup = (): ISiginUpProps => {
  const [isSecure, setIsSecure] = useState(false);
  return {
    isSecure,
    setIsSecure,
  };
};

