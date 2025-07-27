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
import CarDashboardComponent from "@/components/CarDashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "@/components/HeaderComponent";

export default function VendorDashboard() {
  const route = useRouter();
  const [cars, setCars] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const localAddress = "10.0.2.2";
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS;
  const [pickupDate, setPickupDate] = useState<string>("");
  const [dropDate, setDropDate] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  function convertIsoToDdmmyy(isoString: string): string {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const paddedDay = day.toString().padStart(2, "0");
    const paddedMonth = month.toString().padStart(2, "0");
    const twoDigitYear = year.toString().slice(-2);

    return `${paddedDay}/${paddedMonth}/${twoDigitYear}`;
  }
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const storedPhone = await AsyncStorage.getItem("phone");
    setPhone(storedPhone ?? "");
    // console.log("phone : ", storedPhone ?? "");
    
    const storedAmount = await AsyncStorage.getItem("totalPrice");
    setAmount(storedAmount ?? "");
    if (!token) {
      Alert.alert("Error", "You need to log in first.");
      route.push("/signIn");
      return;
    }
    try {
      // Fetch vendor's cars
      const carsRes = await fetch(
        `http://${phoneAdress}:3000/api/bookings/status/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (carsRes.ok) {
        const res = await carsRes.json();
        //   console.log( typeof res.data);
        setCars(res.data || []);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteCar = async (carId: string) => {
    try {
      console.log(refresh);

      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        `http://${phoneAdress}:3000/api/vendor/cars/${carId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

  const confirmBooking = async (bookingStatus: string, bookingId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://${phoneAdress}:3000/api/bookings/update-booking/${bookingId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure backend parses JSON
          },
          body: JSON.stringify({
            bookingStatus: bookingStatus,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Booking Confirmation failed");
      }

      // Update local state to reflect the new status
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === bookingId ? { ...car, bookingStatus: bookingStatus } : car
        )
      );

      Alert.alert("Success", "Booking Confirmed Successfully!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const withdraw = async (
    amount: string,
    to: string,
    description: string,
    external_reference: string = ""
  ) => {
    try {
      const response = await fetch("https://demo.campay.net/api/withdraw/", {
        method: "POST",
        headers: {
          Authorization:
            "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInVpZCI6NTkwMn0.eyJpYXQiOjE3NTM1ODQ0MjIsIm5iZiI6MTc1MzU4NDQyMiwiZXhwIjoxNzUzNTg4MDIyfQ.GZhqRBrDyOtLqOKG2eU_HKuCuf1Xu68VnDk6GAhK-YY",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          to,
          description,
          external_reference,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Payment initiation failed");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderComponent
        title="Dashboard"
        hasBack
        onPress={() => {
          fetchData;
        }}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Cars</Text>
        <ButtonComponent
          text="Add New Car"
          buttonStyles={styles.addButton}
          textStyles={styles.addButtonText}
          onPress={() => route.push("/addCar")}
        />
        {cars.length > 0 ? (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => {
              const features = JSON.parse(item.features);
              return (
                <CarDashboardComponent
                  onButtonPress={() => {
                    confirmBooking("RESERVED", item.id);
                  }}
                  onConfirm={() => {
                    withdraw(
                      item.totalPrice.toString(),
                      `237${phone}`,
                      `Payment for booking ${item.id}`,
                      item.id
                    );
                  }}
                  vendor={true}
                  pickUpDate={convertIsoToDdmmyy(item.pickUpDate)}
                  dropDate={convertIsoToDdmmyy(item.dropDate)}
                  status={item.bookingStatus}
                  imageSource={item.media.thumbnail.small}
                  name={item.name}
                  onUpdatePress={() => {
                    route.push({
                      pathname: "/editCar",
                      params: { carId: item.id },
                    });
                  }}
                  price={item.totalPrice || item.price}
                  onPress={async () => {
                    await AsyncStorage.setItem("carId", item.id);
                    await AsyncStorage.setItem(
                      "carPrice",
                      item.price.toString()
                    );
                    route.push("/carScreen");
                  }}
                />
              );
            }}
          />
        ) : (
          <View>
            <Text style={styles.itemTitle}>You have not yet added a car</Text>
          </View>
        )}
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
    marginTop: scale(10),
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
