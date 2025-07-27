import imagesPaths from "@/assets/imagesPath";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { View, StyleSheet, Text, Image, ScrollView, Alert } from "react-native";
import InputComponent from "@/components/InputComponent";
import CheckBoxComponent from "@/components/CheckBoxComponent";
import ButtonComponent from "@/components/ButtonComponent";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { typography } from "@/theme/typography";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const route = useRouter();
const { logoBlack } = imagesPaths;
export default function SignIn() {
  const { isSecure, setIsSecure } = useSignin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        route.push("/(tabs)/homeScreen");
      }
    }
    checkLoginStatus(); // Check login status on component mount
  },
    []);

  const handleLogin = async () => {
    try {
      const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS
      const localAddress = "10.0.2.2";
      const response = await fetch(`http://${phoneAdress}:3000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const res = await response.json();
      const token = res.data.token;
      const role = res.data.user.role;
      const name = res.data.user.fullName;
      console.log("name : ", name);
      console.log(typeof role);
      
      await AsyncStorage.setItem("token", token); // Store the token for future requests
      await AsyncStorage.setItem("role", role); // Store the token for future requests
      await AsyncStorage.setItem("name", res.data.user.fullName); // Store the token for future requests
      await AsyncStorage.setItem("email", res.data.user.email); // Store the token for future requests
      await AsyncStorage.setItem("phone", res.data.user.phone); // Store the token for future requests
      
      Alert.alert("Success", "Login successful!");
      route.push("/(tabs)/homeScreen");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

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
        <InputComponent
          placeholder="Email"
          value={email}
          onChangeInput={setEmail}
        />
        <InputComponent
          isSecured
          placeholder="Password"
          value={password}
          onChangeInput={setPassword}
          secureTextEntry={!isSecure}
          onPress={() => setIsSecure(!isSecure)}
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
        <Text onPress={() => route.push("/resetPassword")}>
          Forgot Password
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          text="Login"
          textStyles={styles.buttonText}
          onPress={handleLogin} // <-- Use your login handler
        />
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
        {/* <ButtonComponent
          text="Apple"
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