import imagesPaths from "@/assets/imagesPath";
import Button from "@/components/ButtonComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { carBg, logo, overlayBg } = imagesPaths;
  const router  = useRouter();
  const goToSignIn = () => {
    router.push("/signIn");
  }
  return (
    <ImageBackground style={styles.container} source={carBg} resizeMode="cover">
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
            <Text style={styles.title}>Lets Start</Text>
            <Text style={styles.title}>A New Experience</Text>
            <Text style={styles.title}>With Car Rental</Text>
          </View>
        </View>
        <View>
            <View style={styles.infoTextConatiner}>
                <Text style={styles.infoText}>
                Discover your next adventure with Share-wheel. 
            </Text>
            <Text style={styles.infoText}>
                we're here to provide you with a seamless car rental experience.
            </Text>
            <Text style={styles.infoText}>
                Let's get started on your journey
            </Text>
            </View>
        <Button text="Get Started" buttonStyles={styles.buttonStyle}  onPress={goToSignIn}/>
        </View>
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
  },
  infoText : {
    color : colors.white,
    fontSize : FontSize.FONT_14Px,
    fontWeight : "400"
  },
  infoTextConatiner :{
    marginBottom : scale(42)
  },

});
