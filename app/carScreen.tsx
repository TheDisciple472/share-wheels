import HeaderComponent from "@/components/HeaderComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import {
  renderMarginTop,
  renderMarginBottom,
  renderBoderBottom,
} from "@/utils/ui-utils";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import imagesPaths from "@/assets/imagesPath";
import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  Pressable,
  ScrollView,
  Image,
  ImageSourcePropType,
  Alert,
} from "react-native";
import ButtonComponent from "@/components/ButtonComponent";
import FeatureComponent from "@/components/FeatureComponent";
import ReviewComponent from "@/components/ReviewComponent";
import ImageSlider from "@/components/ImageSlider";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { car7, car8, car9 } = imagesPaths;

export default function CarScreen() {
  const route = useRouter()
  const { person } = imagesPaths;
  const data = [car7, car8, car9];
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS;
  const [cars, setCars] = useState<any>([]);
  const [images, setImages] = useState<any[]>([]);
  const [seats, setSeats] =useState<number>();
  const [price, setPrice] = useState<number>();
  const [name, setName] = useState<string>("")
  const localAddress = "10.0.2.2";
  useEffect(() => {
      const fetchCars = async () => {
        const token = await AsyncStorage.getItem("token");
        const carId = await AsyncStorage.getItem("carId");
        if (!token) {
          Alert.alert("Error", "You need to log in first.");
          route.push("/signIn");
          return;
        }
        try {
          console.log(carId);
          
          const carResponse = await fetch(
            `http://${phoneAdress}:3000/api/cars/car/${carId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ); // Update with your actual endpoint
          if (!carResponse.ok) {
            const error = await carResponse.json();
            throw new Error(error.message || "Could not fetch car successfully");
          }
          const res = await carResponse.json();
          console.log(res.data.price);
          setPrice(res.data.price);
          setName(res.data.owner.fullName);
          const data = res.data || [];
          console.log(data.media.thumbnail.small);
          const images =[data.media.thumbnail.medium, data.media.thumbnail.small, data.media.thumbnail.large];
          const features = JSON.parse(data.features);
          setSeats(features.seats);
          // Adjust based on your API response structure
          setImages(images);
          setCars(data);
        } catch (error: any) {
          Alert.alert("Error", error.message);
        }
      };
  
      fetchCars();
    }, []);
  
  return (
    <View style={styles.container}>
      <HeaderComponent title="Car Details" hasBack />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.flex}>
        <ImageSlider images={images} />
        {renderMarginTop(12)}
        <View style={styles.main}>
          <View>
            <View style={styles.titleContainer}>
              <View style={styles.flex}>
                <Text style={styles.title}>{cars?.name || cars[0]?.name || "Car Name"}</Text>
                <Text style={styles.text}>
                  {cars.subInfo}
                </Text>
              </View>
              <View>
                <View style={styles.reviewContainer}>
                  <Text style={styles.textBold}>5.0</Text>
                  <FontAwesome
                    name="star"
                    size={scale(18)}
                    color={colors.star}
                  />
                </View>
                <Text style={[styles.text]}>(100+ Reviews)</Text>
              </View>
            </View>
            {renderMarginBottom(12)}
            {renderBoderBottom(2)}
            {renderMarginTop(18)}
            <View style={styles.profile}>
              <View style={styles.cg14}>
                <Image source={person} style={styles.person} />
                <Text style={styles.ownerName}>{name}</Text>
              </View>
              <View style={styles.cg14}>
                <Pressable style={styles.iconBorder}>
                  <Feather name="phone" size={scale(22)} color={colors.gray} />
                </Pressable>
                <Pressable style={styles.iconBorder}>
                  <AntDesign
                    name="message1"
                    size={scale(20)}
                    color={colors.gray}
                  />
                </Pressable>
              </View>
            </View>
            {renderMarginTop(18)}
            <View>
              <Text style={styles.title}>Car Features</Text>
              {renderMarginTop(12)}
              <View style={styles.cg14}>
                <FeatureComponent 
                  seats={seats}
                />
                {/* <FeatureComponent />
                <FeatureComponent /> */}
              </View>
              {/* {renderMarginTop(12)}
              <View style={styles.cg14}>
                <FeatureComponent />
                <FeatureComponent />
                <FeatureComponent />
              </View> */}
            </View>
            {renderMarginTop(18)}
            <View style={styles.profile}>
              <Text style={styles.title}>Review (125)</Text>
              <Text
               onPress={()=> route.push("/reviewScreen")}
                style={styles.text}
              >
                See All
              </Text>
            </View>
            {renderMarginTop(12)}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3]}
              renderItem={() => <ReviewComponent />}
            />
          </View>
        </View>
      </ScrollView>
      <ButtonComponent
        // onPress={() => navigate('BookingScreen')}
        onPress={() => route.push("/bookingScreen")}
        text="Book Now"
        buttonStyles={styles.btn}
      />
      {renderBoderBottom(6)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    paddingHorizontal: scale(18),
    paddingVertical: scale(18),
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: scale(12),
  },
  title: {
    fontSize: FontSize.FONT_16Px,
    fontFamily: typography.semiBold,
  },

  textBox: {
    backgroundColor: "green",
  },
  text: {
    fontSize: FontSize.FONT_12Px,
    color: colors.placeholder,
    fontFamily: typography.regular,
  },
  textBold: {
    fontFamily: typography.bold,
    fontSize: FontSize.FONT_14Px,
  },
  f12: {
    fontSize: FontSize.FONT_12Px,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(4),
  },
  person: {
    height: scale(42),
    width: scale(42),
  },
  ownerName: {
    fontSize: FontSize.FONT_14Px,
    color: colors.black,
    fontFamily: typography.semiBold,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(12),
    justifyContent: "space-between",
  },
  cg14: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(14),
  },
  iconBorder: {
    borderWidth: 1,
    borderColor: colors.btnBorder,
    borderRadius: scale(100),
    height: scale(40),
    width: scale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginHorizontal: scale(18),
  },
});
