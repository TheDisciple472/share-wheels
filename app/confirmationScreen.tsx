import ButtonComponent from "@/components/ButtonComponent";
import HeaderComponent from "@/components/HeaderComponent";
import StepperComponent from "@/components/StepperComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderMarginBottom, renderBoderBottom } from "@/utils/ui-utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { View, StyleSheet, Dimensions, Button, ScrollView, Text, Image } from "react-native";
const {width} = Dimensions.get('window');

export default function ConfirmationScreen () {
    return (
    <View style={styles.container}>
      <HeaderComponent title="Confirmation" hasBack />
      <ScrollView style={styles.main}>
        <StepperComponent active={3} />
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          resizeMode="cover"
          style={styles.image}
        />
        {renderMarginBottom(12)}
        <View style={styles.titleContainer}>
          <View style={styles.flex}>
            <Text style={styles.title}>Tesla Model S</Text>
            {renderMarginBottom(4)}
            <Text style={styles.text}>
              A car with high specs that are rented ot an affordable price
            </Text>
          </View>
          <View>
            <View style={styles.reviewContainer}>
              <Text style={styles.textBold}>5.0</Text>
              <FontAwesome name="star" size={scale(18)} color={colors.star} />
            </View>
            <Text style={[styles.text]}>(100+ Reviews)</Text>
          </View>
        </View>
        {renderMarginBottom(12)}
        {renderBoderBottom(1)}
        {renderMarginBottom(12)}
        <Text style={styles.title}>Booking Information</Text>
        {renderMarginBottom(12)}
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Booking ID</Text>
          <Text style={styles.value}>Booking ID</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Name</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Pickup Date</Text>
          <Text style={styles.value}>19 Jan 2024 10:00am</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Return Date</Text>
          <Text style={styles.value}>21 Jan 2024 12:00pm</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Location</Text>
          <Text style={styles.value}>Shore Dr, Chicago 0062 Usa</Text>
        </View>
        {renderBoderBottom(1)}
        {renderMarginBottom(12)}

        <Text style={styles.title}>Payment</Text>
        {renderMarginBottom(12)}
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Txt ID</Text>
          <Text style={[styles.value, styles.bold]}>#141mtslv5854d58</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Amount</Text>
          <Text style={[styles.value, styles.bold]}>$1400</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Service Fee</Text>
          <Text style={[styles.value, styles.bold]}>15$</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Return Date</Text>
          <Text style={[styles.value, styles.bold]}>21 Jan 2024 12:00pm</Text>
        </View>
        {renderBoderBottom(1)}
        {renderMarginBottom(12)}
        <View style={styles.horizontalContainer}>
          <Text style={[styles.value, styles.bold]}>Total Amount</Text>
          <Text style={[styles.value, styles.bold]}>$1415</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.key}>Payment With</Text>
          <Text style={styles.value}>Cash</Text>
        </View>
      </ScrollView>
      <ButtonComponent
        onPress={() => router.push("/bookingStatus")}
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
    image: {width: width - scale(40), height: scale(180)},
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: scale(12),
      flex: 1,
    },
    flex: {
      width: '70%',
    },
    title: {
      fontSize: FontSize.FONT_16Px,
      fontFamily: typography.semiBold,
    },
    reviewContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      columnGap: scale(4),
    },
    textBox: {},
    text: {
      fontSize: FontSize.FONT_12Px,
      color: colors.placeholder,
      fontFamily: typography.regular,
    },
    textBold: {
      fontFamily: typography.bold,
      fontSize: FontSize.FONT_14Px,
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
      color: colors.black,
    },
    btn: {
      marginHorizontal: scale(18),
    },
})