import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const {width} = Dimensions.get('window');

export default function VisaCardComponent ({
  cardNumber = '2323 1223 2323 1234',
  name = 'JOHN DOE',
  expiry = '12/26',
}){
    return (
    <LinearGradient
      colors={[
        colors.visaCard.primary,
        colors.visaCard.secondary,
        colors.visaCard.gray,
        colors.visaCard.gray2,
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.card}>
      <Text style={styles.visaText}>VISA</Text>
      <View style={styles.rowG20}>
        <View style={styles.bottomRow}>
          <View style={styles.nameRow}>
            <Text style={styles.info}>{name}</Text>
            <View style={styles.expireRow}>
              <Text style={styles.label}>Expire</Text>
              <Text style={styles.info}>{expiry}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    card: {
      width: width * 0.9,
      height: scale(190),
      borderRadius: scale(20),
      padding: scale(20),
      justifyContent: 'space-between',
      shadowColor: colors.black,
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8,
    },
    rowG20: {
      rowGap: scale(20),
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(36),
    },
    expireRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(10),
    },
    visaText: {
      color: colors.white,
      fontSize: FontSize.FONT_24Px,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
    },
    cardNumber: {
      color: colors.white,
      fontSize: FontSize.FONT_18Px,
      letterSpacing: 2,
      marginBottom: scale(4),
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: FontSize.FONT_12Px,
      color: colors.white,
    },
    info: {
      color: colors.white,
      fontSize: FontSize.FONT_16Px,
      fontFamily: typography.medium,
    },
})