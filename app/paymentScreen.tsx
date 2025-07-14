import BottomSheet from "@/components/BottomSheet";
import ButtonComponent from "@/components/ButtonComponent";
import CheckBoxComponent from "@/components/CheckBoxComponent";
import CountryComponent from "@/components/CountryComponent";
import HeaderComponent from "@/components/HeaderComponent";
import InputComponent from "@/components/InputComponent";
import StepperComponent from "@/components/StepperComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderMarginBottom } from "@/utils/ui-utils";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Pressable, ScrollView } from "react-native";
import VisaCardComponent from "@/components/VisaCardComponent";

export default function PaymentScreen () {
    const [showPayment, setShowPayment] = useState(false);

    return (
    <View style={styles.container}>
      <HeaderComponent title="Payment Methods" hasBack />
      <ScrollView style={styles.main}>
        <StepperComponent active={2} />
        {renderMarginBottom(6)}
        <VisaCardComponent />
        {renderMarginBottom(6)}
        <View style={styles.inputContainer}>
          <Text style={styles.lableText}>select payment method</Text>
          <Pressable style={styles.selectPayment}>
            <View style={styles.rg}>
              <FontAwesome name="money" size={scale(18)} color={colors.gray} />
              <Text style={styles.selectPaymentText}>Credit Card</Text>
            </View>
            <ButtonComponent
              text="DEFAULT"
              buttonStyles={styles.butonStyles}
              textStyles={styles.buttonText}
              onPress={() => setShowPayment(true)}
            />
          </Pressable>
          {renderMarginBottom(22)}
          <Text style={styles.lableText}>Card information</Text>
          <InputComponent
            onChangeInput={e => console.log(e)}
            placeholder="Full Name"
          />
          <InputComponent
            onChangeInput={e => console.log(e)}
            placeholder="Email Address"
          />
          <InputComponent
            onChangeInput={e => console.log(e)}
            placeholder="Number"
          />
          <View style={styles.rg}>
            <InputComponent
              containerStyle={styles.inputStyle}
              onChangeInput={e => console.log(e)}
              placeholder="MM/YY"
            />
            <InputComponent
              containerStyle={styles.inputStyle}
              onChangeInput={e => console.log(e)}
              placeholder="CVV"
            />
          </View>
          {renderMarginBottom(22)}
          <Text style={styles.lableText}>Country or region</Text>
          <CountryComponent onPress={e => console.log(e)} />
          <InputComponent
            onChangeInput={e => console.log(e)}
            placeholder="ZIP"
          />
          {renderMarginBottom(12)}
          <View style={styles.flexRow}>
            <CheckBoxComponent
              onPress={e => {
                console.log('item', e);
              }}
              isChecked={false}
            />
            <Text style={styles.checkBoxText}>Terms & Continue</Text>
          </View>
          <View style={styles.borderContainer}>
            <View style={styles.orBorder} />
            <Text style={styles.orText}>Pay with card Or</Text>
            <View style={styles.orBorder} />
          </View>
          {renderMarginBottom(12)}
          <ButtonComponent
            text="Apple Pay"
            textStyles={styles.outlineButtonText}
            buttonStyles={styles.iconButtonStyle}
            children={<MaterialIcons name="apple" size={scale(26)} />}
          />
          {renderMarginBottom(14)}
          <ButtonComponent
            text="Google Pay"
            textStyles={styles.outlineButtonText}
            buttonStyles={styles.iconButtonStyle}
            children={<AntDesign name="google" size={scale(20)} />}
          />
          {renderMarginBottom(24)}
          <ButtonComponent
            // onPress={() => navigate('BookingConfirmationScreen')}
            text="Pay Now"
          />
        </View>
        <BottomSheet visible={showPayment} setVisible={setShowPayment}>
          <View style={styles.paymentContainer}>
            <Text
              onPress={() => setShowPayment(false)}
              style={styles.paymentText}>
              Credit Card
            </Text>
            <Text
              onPress={() => setShowPayment(false)}
              style={styles.paymentText}>
              Cash Payment
            </Text>
          </View>
        </BottomSheet>
      </ScrollView>
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
    inputContainer: {
      paddingVertical: scale(12),
    },
    lableText: {
      fontSize: FontSize.FONT_16Px,
      fontFamily: typography.semiBold,
    },
    selectPayment: {
      borderRadius: scale(10),
      padding: scale(12),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.white,
      paddingVertical: scale(2),
      marginTop: scale(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: scale(10),
      height: scale(50),
      paddingHorizontal: scale(14),
    },
    selectPaymentText: {
      fontSize: FontSize.FONT_13Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
      paddingVertical: scale(12),
    },
    butonStyles: {
      backgroundColor: colors.btnBorder,
      borderRadius: scale(8),
      paddingHorizontal: scale(12),
      paddingVertical: scale(8),
      borderWidth: 1,
      borderColor: colors.btnBorder,
    },
    buttonText: {
      fontSize: FontSize.FONT_12Px,
      color: colors.placeholder,
    },
    rg: {
      flexDirection: 'row',
      columnGap: scale(8),
      alignItems: 'center',
    },
    paymentContainer: {
      flex: 0.3,
      backgroundColor: colors.white,
      borderTopRightRadius: scale(10),
      borderTopLeftRadius: scale(10),
      paddingHorizontal: scale(12),
      paddingVertical: scale(12),
    },
    paymentText: {
      fontSize: FontSize.FONT_15Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
      paddingVertical: scale(12),
      textAlign: 'center',
    },
    inputStyle: {
      flex: 1,
    },
    checkBoxText: {
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(10),
    },
    borderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: scale(12),
      marginTop: scale(18),
    },
    orText: {
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
      color: colors.placeholder,
    },
    orBorder: {
      height: 1,
      flex: 1,
      backgroundColor: colors.divider,
      marginVertical: scale(18),
    },
    outlineButtonText: {
      color: colors.black,
      fontFamily: typography.bold,
      fontSize: FontSize.FONT_14Px,
    },
    iconButtonStyle: {
      backgroundColor: colors.outlineButtonBg,
      borderWidth: 1,
      borderColor: colors.btnBorder,
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(8),
      paddingVertical: scale(10),
    },
})