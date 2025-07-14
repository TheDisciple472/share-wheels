import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { View, StyleSheet, Button, Pressable, ScrollView, Switch, Text } from "react-native";
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
import { useState } from "react";
import { genderData } from "../utils/filter.data"
import { router } from "expo-router";

export default function BookingScreen () {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
    return (
    <View style={styles.container}>
      <HeaderComponent title="Booking Details" hasBack />
      <ScrollView style={styles.main}>
        <StepperComponent active={3} />
        {renderMarginBottom(6)}
        <View style={styles.switchContainer}>
          <View>
            <Text style={styles.bookTitle}>Book with driver</Text>
            <Text style={styles.bookText}>
              Don't have a driver? book with driver.
            </Text>
          </View>
          <Switch
            value={isSwitchOn}
            onValueChange={setIsSwitchOn}
            thumbColor={colors.black}
            trackColor={{
              false: colors.placeholder,
              true: colors.gray,
            }}
          />
        </View>
        {renderMarginBottom(12)}
        <InputComponent
          leftAction={
            <MaterialIcons
              name="person-outline"
              size={scale(22)}
              color={colors.placeholder}
            />
          }
          containerStyle={styles.inputContainer}
          placeholder="Full Name*"
          onChangeInput={e => console.log(e)}
        />
        <InputComponent
          leftAction={
            <MaterialCommunityIcons
              name="email-outline"
              size={scale(22)}
              color={colors.placeholder}
            />
          }
          containerStyle={styles.inputContainer}
          placeholder="Email Address*"
          onChangeInput={e => console.log(e)}
        />
        <InputComponent
          leftAction={
            <MaterialCommunityIcons
              name="phone-outline"
              size={scale(22)}
              color={colors.placeholder}
            />
          }
          containerStyle={styles.inputContainer}
          placeholder="Contact*"
          onChangeInput={e => console.log(e)}
        />
        {renderMarginBottom(12)}
        <TabSwitcher
          title="Gender"
          data={genderData}
          onPress={e => console.log(e)}
          tabContainerStyle={styles.tabContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
        />
        {renderMarginBottom(12)}
        <TabSwitcher
          title="Rental Date & Time"
          data={rentalData}
          onPress={e => console.log(e)}
          tabContainerStyle={styles.tabContainerStyle}
          tabStyle={[styles.tabStyle, styles.ph]}
          tabTextStyle={styles.tabTextStyle}
        />
        {renderMarginBottom(12)}
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.dateContainer}>
          <View>
            <Text style={styles.dateText}>Pick up Date</Text>
            <Text style={styles.date}>19/Jan/2024</Text>
          </View>
          <View>
            <Text style={styles.dateText}>Return Date</Text>
            <Text style={styles.date}>19/Jan/2024</Text>
          </View>
        </Pressable>
        {renderMarginBottom(12)}
        <Text style={styles.locationText}>Car Location</Text>
        <InputComponent
          onChangeInput={() => console.log('')}
          placeholder="Enter Location"
        />
        {renderMarginBottom(12)}
      </ScrollView>
      <ButtonComponent text="Pay Now" buttonStyles={styles.buttonStyle} onPress={()=> router.push("/paymentScreen")}/>
      <DateComponent visible={showDatePicker} setVisible={setShowDatePicker} />
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      paddingVertical: scale(12),
      paddingHorizontal: scale(12),
      elevation: 10,
      overflow: 'hidden',
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
      flexDirection: 'row',
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    },
})