import imagesPaths from "@/assets/imagesPath";
import HeaderComponent from "@/components/HeaderComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderBoderBottom, renderMarginBottom } from "@/utils/ui-utils";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import ButtonComponent from "@/components/ButtonComponent";

const  {success} = imagesPaths

export default function BookingStatus() {
     return (
    <View style={styles.container}>
      <HeaderComponent title="Payment Status" hasBack />
      <ScrollView style={styles.main}>
        <View style={styles.successContainer}>
          <Image
            resizeMode="contain"
            source={success}
            style={styles.successImage}
          />
          {renderBoderBottom(18)}
          <Text style={styles.title}>Payment Successful</Text>
          {renderBoderBottom(4)}
          <Text style={styles.infoText}>
            Your car rent Booking has been successfully
          </Text>
        </View>
        {renderMarginBottom(18)}
        <View style={styles.bookingInfo}>
          <Text style={[styles.title, styles.f14]}>Booking Information</Text>
          {renderMarginBottom(12)}
          {renderBoderBottom(1)}
          {renderMarginBottom(12)}
          <View style={styles.horizontalContainer}>
            <Text style={[styles.value]}>Car Model</Text>
            <Text style={[styles.value, styles.bl]}>Tesla Model 3</Text>
          </View>
          <View style={styles.horizontalContainer}>
            <Text style={[styles.value]}>Rental Date</Text>
            <Text style={[styles.value, styles.bl]}>19 Jan24 - 22 Jan 24</Text>
          </View>
          <View style={styles.horizontalContainer}>
            <Text style={[styles.value]}>Name</Text>
            <Text style={[styles.value, styles.bl]}>John Doe</Text>
          </View>
        </View>
        {renderMarginBottom(18)}
        {renderBoderBottom(1)}
        {renderMarginBottom(18)}
        <Text style={[styles.title, styles.f14]}>Booking Information</Text>
        {renderMarginBottom(8)}
        <View style={styles.horizontalContainer}>
          <Text style={[styles.value]}>Transaction ID</Text>
          <Text style={[styles.value, styles.bl]}>#T000123B0J1</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.value]}>Transaction Date</Text>
          <Text style={[styles.value, styles.bl]}>19 Jan24 - 22 Jan 24</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={[styles.value]}>Payment Method</Text>
          <Text style={[styles.value, styles.bl]}>Cash</Text>
        </View>
        {renderMarginBottom(4)}
        {renderBoderBottom(1)}
        {renderMarginBottom(18)}
        <View style={styles.horizontalContainer}>
          <Text style={[styles.value, styles.bold, styles.bl]}>
            Total Amount
          </Text>
          <Text style={[styles.value, styles.bold, styles.bl]}>$1415</Text>
        </View>
        {renderMarginBottom(8)}
        <ButtonComponent
          text="Download Receipt"
          textStyles={styles.outlineButtonText}
          buttonStyles={styles.downloadBtn}
          children={
            <Feather name="download" size={scale(20)} color={colors.gray} />
          }
        />
        {renderMarginBottom(14)}
        <ButtonComponent
          text="Share Your Receipt"
          textStyles={styles.outlineButtonText}
          buttonStyles={styles.shareBtn}
          children={
            <EvilIcons
              name="share-google"
              size={scale(30)}
              color={colors.gray}
            />
          }
        />
        {renderMarginBottom(14)}
      </ScrollView>
      <ButtonComponent
        // onPress={() => navigate('BookingStatusScreen')}
        text="Confirm"
        buttonStyles={styles.btn}
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
    successImage: {
      height: scale(125),
      width: scale(125),
    },
    title: {
      fontSize: FontSize.FONT_16Px,
      color: colors.black,
      fontFamily: typography.semiBold,
    },
    f14: {
      fontSize: FontSize.FONT_14Px,
    },
    infoText: {
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
    successContainer: {
      alignItems: 'center',
      paddingTop: scale(12),
    },
    bookingInfo: {
      backgroundColor: colors.white,
      paddingVertical: scale(12),
      paddingHorizontal: scale(12),
      borderRadius: scale(8),
      borderWidth: 1,
      borderColor: colors.btnBorder,
    },
    key: {
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      fontFamily: typography.semiBold,
    },
    value: {
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: scale(12),
    },
    bold: {
      fontFamily: typography.semiBold,
    },
    bl: {
      color: colors.black,
    },
    btn: {
      marginHorizontal: scale(18),
    },
    downloadBtn: {
      backgroundColor: colors.btnBorder,
      borderWidth: 1,
      borderColor: colors.btnBorder,
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(8),
      paddingVertical: scale(10),
    },
    shareBtn: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.btnBorder,
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(8),
      paddingVertical: scale(10),
    },
    outlineButtonText: {
      color: colors.placeholder,
      fontFamily: typography.regular,
      fontSize: FontSize.FONT_14Px,
    },
})