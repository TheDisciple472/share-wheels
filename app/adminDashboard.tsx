import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import ButtonComponent from "@/components/ButtonComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "@/components/HeaderComponent";

export default function AdminDashboard() {
  const route = useRouter();
  const [cars, setCars] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const localAddress = "10.0.2.2";
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "You need to log in first.");
        route.push("/signIn");
        return;
      }
      try {
        // Fetch vendor's cars
        const carsRes = await fetch(`http://${phoneAdress}:3000/api/cars/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (carsRes.ok) {
          const res = await carsRes.json();
          setCars(res.data || []);
        }
        // Fetch brands
        const brandsRes = await fetch(`http://${phoneAdress}:3000/api/brands/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (brandsRes.ok) {
          const res = await brandsRes.json();
          console.log(res.data);
          
          setBrands(res.data || []);
        }
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    };
    fetchData();
  }, []);

  const handleDeleteCar = async (carId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`http://${phoneAdress}:3000/api/vendor/cars/${carId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setCars(cars.filter((car) => car.id !== carId));
        Alert.alert("Success", "Car deleted");
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete car");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`http://${phoneAdress}:3000/api/brands/delete/${brandId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBrands(brands.filter((brand) => brand.id !== brandId));
        Alert.alert("Success", "Brand deleted");
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete brand");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
        <HeaderComponent title="Admin Dashboard" hasBack />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Brands</Text>
        <ButtonComponent
          text="Add Brand"
          buttonStyles={styles.addButton}
          textStyles={styles.addButtonText}
          onPress={() => route.push("/addBrand")}
        />
        <FlatList
          data={brands}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <View style={styles.actions}>
                <Pressable
                  style={styles.iconBtn}
                //   onPress={() => route.push({ pathname: "/editBrand", params: { brandId: item.id } })}
                >
                  <MaterialIcons name="edit" size={scale(20)} color={colors.blue} />
                </Pressable>
                <Pressable
                  style={styles.iconBtn}
                  onPress={() => handleDeleteBrand(item.id)}
                >
                  <AntDesign name="delete" size={scale(20)} color={colors.red} />
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: scale(16),
  },
  header: {
    fontSize: FontSize.FONT_24Px,
    fontFamily: typography.bold,
    marginBottom: scale(18),
    color: colors.primary,
  },
  section: {
    marginBottom: scale(28),
  },
  sectionTitle: {
    fontSize: FontSize.FONT_18Px,
    fontFamily: typography.semiBold,
    marginBottom: scale(10),
    color: colors.black,
    marginTop : scale(10)
  },
  addButton: {
    backgroundColor: colors.primary,
    marginBottom: scale(10),
    alignSelf: "flex-start",
    paddingHorizontal: scale(16),
    paddingVertical: scale(6),
    borderRadius: scale(6),
  },
  addButtonText: {
    color: colors.white,
    fontFamily: typography.semiBold,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: scale(12),
    borderRadius: scale(8),
    marginBottom: scale(8),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemTitle: {
    fontSize: FontSize.FONT_16Px,
    fontFamily: typography.regular,
    color: colors.black,
  },
  actions: {
    flexDirection: "row",
    columnGap: scale(10),
  },
  iconBtn: {
    padding: scale(4),
  },
});