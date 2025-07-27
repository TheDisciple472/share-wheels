import imagesPaths from "@/assets/imagesPath";
import CarBrandComponent from "@/components/CarBrandComponent";
import CarComponent from "@/components/CarComponent";
import HeaderComponent from "@/components/HeaderComponent";
import SearchComponent from "@/components/SearchComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { car1, car2, car3, car4 } = imagesPaths;

export default function HomeScreen() {
  const route = useRouter();
  const [brands, setBrands] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS;
  const localAddress = "10.0.2.2";
  useEffect(() => {
    const fetchBrands = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        route.push("/signIn");
        return;
      }
      try {
        const response = await fetch(`http://${phoneAdress}:3000/api/brands/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Update with your actual endpoint
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Could not fetch brands successfully");
        }
        const res = await response.json();
        const data = res.data || [];
        // console.log(data[0].media.thumbnail.small);
        // Adjust based on your API response structure
        setBrands(data);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        route.push("/signIn");
        return;
      }
      try {
        const carResponse = await fetch(
          `http://${phoneAdress}:3000/api/cars/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Update with your actual endpoint
        if (!carResponse.ok) {
          const error = await carResponse.json();
          throw new Error(error.message || "Login failed");
        }
        const res = await carResponse.json();
        const data = res.data || [];
        console.log(data[0].media.thumbnail.small);
        // Adjust based on your API response structure
        setCars(data);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    };

    fetchCars();
  }, []);

  

  return (
    <ScrollView style={styles.container}>
      <HeaderComponent title="Share-wheels" />
      <View style={styles.main}>
        {/* <SearchComponent /> */}
        <View style={[styles.showCase, styles.p18]}>
          <Text style={styles.text}>Brands</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={brands}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => {
              // const features = JSON.stringify(item.features);
              return (
                <CarBrandComponent
                  text={item.name}
                  isSelected={1}
                  image={item.media.thumbnail.small}
                  // seats = {features.hp}
                />
              );
            }}
          />
        </View>
        <View style={[styles.showCaseCars, styles.p18]}>
          <View style={styles.viewContainer}>
            <Text style={styles.text}>Best Cars</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View style={styles.flexRow}>
            <FlatList
              data={cars}
              keyExtractor={(item) => item.id?.toString() || item.name}
              renderItem={({ item }) => {
                const features = JSON.parse(item.features);
                return (
                  <CarComponent
                    imageSource={item.media.thumbnail.small}
                    name={item.name}
                    location={item.location.city}
                    seats={features.seats}
                    price={item.price}
                    onPress={async ()=>{
                      await AsyncStorage.setItem("carId", item.id);
                      await AsyncStorage.setItem("carPrice", item.price.toString());
                      route.push("/carScreen");
                    }}
                  />
                );
              }}
              numColumns={2}
              columnWrapperStyle={styles.flatListContentContainer}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  main: {
    flex: 1,
  },
  p18: {
    paddingHorizontal: scale(18),
  },
  carLogo: {
    height: scale(38),
    width: scale(38),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: scale(14),
    rowGap: scale(14), // Add vertical gap between rows
    paddingVertical: scale(12),
    flexWrap: "wrap",
  },
  titleStyle: {
    fontSize: FontSize.FONT_24Px,
    color: colors.black,
    fontFamily: typography.bold,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: scale(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  person: {
    height: scale(40),
    width: scale(40),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
  inputContainer: {
    flex: 1,
    marginTop: 0,
    height: scale(45),
    paddingVertical: 0,
  },
  text: {
    fontSize: FontSize.FONT_16Px,
    color: colors.black,
    fontFamily: typography.semiBold,
  },
  showCase: {
    rowGap: scale(12),
    marginTop: scale(12),
  },

  showCaseCars: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    marginTop: scale(24),
    paddingTop: scale(20),
  },
  viewAll: {
    color: colors.placeholder,
    fontSize: FontSize.FONT_12Px,
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flatListContentContainer: {
    justifyContent: "space-between",
    marginBottom: scale(20), // Add bottom margin to avoid overlap with the next section
  },
});
