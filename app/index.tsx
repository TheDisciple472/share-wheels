import imagesPaths from "@/assets/imagesPath";
import Button from "@/components/ButtonComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { whiteCar, logo, overlayBg } = imagesPaths;
  const router  = useRouter();
  const goToScreenTwo = () => {
    router.push("/onBoardingTwo");
  }
  return (
    <ImageBackground style={styles.container} source={whiteCar} resizeMode="cover">
      <ImageBackground
        style={styles.overlay}
        source={overlayBg}
        resizeMode="cover"
      >
        <View>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome To</Text>
            <Text style={styles.title}>Share-Wheels</Text>
          </View>
        </View>
        <Button text="Get Started" buttonStyles={styles.buttonStyle}  onPress={goToScreenTwo}/>
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    backgroundColor: colors.white,
    alignSelf: "flex-start",
    margin: scale(12),
    marginTop: scale(32),
    padding: scale(12),
    borderRadius: 100,
  },
  logo: {
    height: scale(36),
    width: scale(34),
  },
  overlay: {
    flex: 1,
    paddingHorizontal: scale(18),
    justifyContent: "space-between",
    overflow : "hidden"
  },
  title: {
    fontSize: FontSize.FONT_40Px,
    color: colors.white,
  },
  textContainer: {
    marginTop: scale(30),
  },
  buttonStyle : {
    marginBottom : scale(40)
  }
});
