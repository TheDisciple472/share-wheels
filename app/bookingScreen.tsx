import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import {
  View,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  Switch,
  Text,
  Alert,
} from "react-native";
import VisaComponent from "@/components/VisaCardComponent";
import StepperComponent from "@/components/StepperComponent";
import DateComponent from "@/components/DateComponent";
import ButtonComponent from "@/components/ButtonComponent";
import Header from "@/components/HeaderComponent";
import TabSwitcher from "@/components/TabSwitcher";
import HeaderComponent from "@/components/HeaderComponent";
import InputComponent from "@/components/InputComponent";
import { rentalData } from "@/utils/filter.data";
import { renderMarginBottom } from "@/utils/ui-utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useEffect } from "react"; // Added useEffect import
import { genderData } from "../utils/filter.data";
import { router } from "expo-router";
import { DateType } from "react-native-ui-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInDays, startOfDay } from "date-fns";

export default function BookingScreen() {
  const [carPrice, setCarPrice] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS;

  // Corrected usage of useEffect for fetching car price
  useEffect(() => {
    const fetchCarPrice = async () => {
      const priceString = await AsyncStorage.getItem("carPrice");
      const userName = await AsyncStorage.getItem("name");
      setName(userName);
      const userEmail = await AsyncStorage.getItem("email");
      setEmail(userEmail);
      const userPhone = await AsyncStorage.getItem("phone");
      setPhone(userPhone);
      console.log("User Name:", userName);
      console.log("User Email:", userEmail);
      console.log("User Phone:", userPhone);
      const price = priceString ? parseInt(priceString) : null;
      setCarPrice(price);
      console.log("Car Price:", price);
    };
    fetchCarPrice();
  }, []); // Empty dependency array ensures it runs once on mount

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<DateType>();
  const [selectedEndDate, setSelectedEndDate] = useState<DateType | undefined>(
    undefined
  );

  const handleDatesSelected = (
    start: DateType | undefined,
    end: DateType | undefined
  ) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    console.log("Dates received in parent - Start:", start);
    console.log("Dates received in parent - End:", end);
    // You can now use these dates, e.g., to make an API call
  };

  // FIX STARTS HERE
  // Safely create Date objects only if selectedStartDate/EndDate are not undefined
  // and assert their type to be compatible with Date constructor
  const startDate =
    selectedStartDate instanceof Date ||
    typeof selectedStartDate === "string" ||
    typeof selectedStartDate === "number"
      ? new Date(selectedStartDate)
      : undefined; // Or handle other cases if necessary

  const endDate =
    selectedEndDate instanceof Date ||
    typeof selectedEndDate === "string" ||
    typeof selectedEndDate === "number"
      ? new Date(selectedEndDate)
      : undefined; // Or handle other cases if necessary
  // FIX ENDS HERE
  const daysDifference =
    startDate && endDate
      ? differenceInDays(
          startOfDay(endDate), // Get the start of the end day
          startOfDay(startDate) // Get the start of the start day
        ) + 1
      : 0;

  const totalPrice = carPrice ? carPrice * daysDifference : 0;
  console.log("total price:", totalPrice);

  // Add Booking Function
  const handleAddBooking = async () => {
    try {
      const carId = await AsyncStorage.getItem("carId");
      if (!carId) {
        Alert.alert("Error", "Car ID not found.");
        return;
      }
      if (!startDate || !endDate) {
        Alert.alert("Error", "Please select pick up and drop dates.");
        return;
      }
      const bookingData = {
        carId,
        pickUpDate: startDate.toISOString(),
        dropDate: endDate.toISOString(),
        paymentStatus: "PENDING",
        bookingStatus: "PENDING",
        totalPrice,
        userName: name,
        userEmail: email,
        userPhone: phone,
      };
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${phoneAdress}:3000/api/bookings/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Booking failed");
      }

      await AsyncStorage.setItem("totalPrice", totalPrice.toString());
      Alert.alert("Success", "Booking added successfully!");

      // Optionally navigate to another screen
      // router.push("/somewhere");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Booking Details" hasBack />
      <ScrollView style={styles.main}>
        <StepperComponent active={1} />
        {renderMarginBottom(6)}

        {renderMarginBottom(12)}
        <InputComponent
        value={name || ""}
          leftAction={
            <MaterialIcons
              name="person-outline"
              size={scale(22)}
              color={colors.placeholder}
            />
          }
          containerStyle={styles.inputContainer}
          placeholder="Full Name*"
          onChangeInput={(e) => console.log(e)}
        />
        <InputComponent
          value={email || ""}
          leftAction={
            <MaterialCommunityIcons
              name="email-outline"
              size={scale(22)}
              color={colors.placeholder}
            />
          }
          containerStyle={styles.inputContainer}
          placeholder="Email Address*"
          onChangeInput={(e) => console.log(e)}
        />
        <InputComponent
          value={phone || ""}
          leftAction={
            <MaterialCommunityIcons
              name="phone-outline"
              size={scale(22)}
              color={colors.placeholder}
            />
          }
          containerStyle={styles.inputContainer}
          placeholder="Contact*"
          onChangeInput={(e) => console.log(e)}
        />

        {renderMarginBottom(12)}

        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.dateContainer}
        >
          <View>
            <Text style={styles.dateText}>Pick up Date</Text>
            {/* Display selected start date if available, otherwise default text */}
            <Text style={styles.date}>
              {startDate ? startDate.toLocaleDateString() : "Select Date"}
            </Text>
          </View>
          <View>
            <Text style={styles.dateText}>Return Date</Text>
            {/* Display selected end date if available, otherwise default text */}
            <Text style={styles.date}>
              {endDate ? endDate.toLocaleDateString() : "Select Date"}
            </Text>
          </View>
        </Pressable>
        {renderMarginBottom(12)}
      </ScrollView>
      <ButtonComponent
        text="Reserve Now"
        buttonStyles={styles.buttonStyle}
        onPress={handleAddBooking} // <-- Call booking function here
      />
      <DateComponent
        visible={showDatePicker}
        setVisible={setShowDatePicker}
        onDatesSelected={handleDatesSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  main: {
    flex: 1,
    paddingHorizontal: scale(18),
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingVertical: scale(12),
    paddingHorizontal: scale(12),
    elevation: 10,
    overflow: "hidden",
    borderRadius: scale(10),
  },
  bookTitle: {
    fontFamily: typography.semiBold,
    color: colors.black,
  },
  bookText: {
    color: colors.placeholder,
  },
  inputContainer: {
    columnGap: scale(4),
  },
  tabContainerStyle: {
    borderWidth: 0,
  },
  tabStyle: {
    borderWidth: 1,
    borderColor: colors.btnBorder,
    flexDirection: "row",
    paddingRight: scale(16),
    paddingLeft: scale(12),
    columnGap: scale(4),
  },
  ph: {
    paddingRight: scale(18),
    paddingLeft: scale(18),
  },
  tabTextStyle: {
    color: colors.placeholder,
    fontFamily: typography.regular,
    fontSize: FontSize.FONT_12Px,
  },
  dateContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(34),
    paddingVertical: scale(12),
    borderRadius: scale(30),
    borderWidth: 1,
    borderColor: colors.btnBorder,
  },
  locationText: {
    fontSize: FontSize.FONT_16Px,
    fontFamily: typography.semiBold,
  },
  dateText: {
    fontFamily: typography.regular,
    color: colors.black,
  },
  date: {
    color: colors.placeholder,
  },
  buttonStyle: {
    marginHorizontal: scale(18),
    marginBottom: scale(18),
  },
});
