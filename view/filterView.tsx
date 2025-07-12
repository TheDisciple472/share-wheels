import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import Slider from "@react-native-community/slider";
import TabSwitcher from "@/components/TabSwitcher";
import BottomSheet from "@/components/BottomSheet";
import {colors} from '../theme/colors';
import {scale} from '../theme/scale';
import {data, FuelType, rentalData, sitingCapacity} from "../utils/filter.data"
import {
  renderBoderBottom,
  renderMarginBottom,
  renderMarginTop,
} from '../utils/ui-utils';
import { FontSize } from "@/theme/font-size";
import { typography } from "@/theme/typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
    visible : boolean;
    setVisible : (e : boolean) => void
}

export default function FilterView({visible, setVisible} : Props) {
  const [value, setValue] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

return(
        <BottomSheet visible={visible} setVisible={setVisible}>
      <View style={styles.filterView}>
        <View style={styles.header}>
          <Pressable>
            <MaterialIcons
              name="close"
              size={scale(22)}
              color={colors.crossBg}
              onPress={() => setVisible(false)}
            />
          </Pressable>
          <Text style={styles.text}>Filters</Text>
          <View style={styles._f08} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            <TabSwitcher
              title="Type of Cars"
              data={data}
              onPress={e => console.log(e)}
            />
            {renderBoderBottom(10)}
            {renderMarginBottom(16)}
            <View style={styles.frsb}>
              <Text style={styles.filterTypeText}>Price Range</Text>
              <Text style={styles.filterTypeText}>{value}$</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={min}
              maximumValue={max}
              step={1}
              minimumTrackTintColor={colors.black}
              maximumTrackTintColor={colors.black}
              thumbTintColor={colors.black}
              value={value}
              onValueChange={e => setValue(e)}
            />
            <View style={styles.frsb}>
              <InputComponent
                keyboardType="numeric"
                onChangeInput={e => setMin(Number(e))}
                placeholder="Min"
                containerStyle={styles.inputContainer}
              />
              <InputComponent
                keyboardType="numeric"
                onChangeInput={e => setMax(Number(e))}
                placeholder="Max"
                containerStyle={styles.inputContainer}
              />
            </View>
            {renderMarginTop(16)}
            {renderBoderBottom(10)}
            {renderMarginBottom(16)}
            <TabSwitcher
              title="Rental Time"
              data={rentalData}
              onPress={e => console.log(e)}
              tabContainerStyle={styles.tabContainerStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
            />
            {renderMarginTop(8)}
            <View style={styles.frsb}>
              <Text style={styles.placeHolder}>Pick up and Drop Date</Text>
              <Text style={styles.placeHolder}>05 June 2025</Text>
            </View>
            {renderMarginTop(8)}
            <InputComponent
              onChangeInput={e => setMin(Number(e))}
              placeholder="Car Location"
            />
            {renderMarginTop(16)}
            {renderBoderBottom(10)}
            {renderMarginBottom(16)}
            <TabSwitcher
              title="Siting Capacity"
              data={sitingCapacity}
              onPress={e => console.log(e)}
              tabContainerStyle={styles.tabContainerStyle}
              tabStyle={[styles.tabStyle, styles.sitingCapTab]}
              tabTextStyle={styles.tabTextStyle}
            />
            <TabSwitcher
              title="Fuel Type"
              data={FuelType}
              onPress={e => console.log(e)}
              tabContainerStyle={styles.tabContainerStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
            />
            {renderBoderBottom(10)}
            {renderMarginBottom(16)}
            <View style={styles.frsb}>
              <Text style={styles.clearAll}>Clear All</Text>
              <ButtonComponent
                text="Show 100+ cars"
                textStyles={styles.btnTextStyle}
                buttonStyles={styles.btnContainerStyle}
              />
            </View>
            {renderMarginBottom(16)}
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
)

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
    showCase: {
      rowGap: scale(12),
      marginTop: scale(8),
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(14),
      paddingVertical: scale(12),
    },
    text: {
      fontSize: FontSize.FONT_16Px,
      color: colors.black,
      fontFamily: typography.bold,
    },
    textContainer: {
      paddingHorizontal: scale(12),
    },
    dollarContainer: {
      borderColor: colors.gray,
      borderWidth: scale(1),
      height: scale(14),
      width: scale(14),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
    textBold: {
      fontFamily: typography.semiBold,
    },
    priceContainer: {
      paddingVertical: scale(4),
      alignItems: 'center',
      columnGap: scale(8),
    },
    price: {
      fontSize: FontSize.FONT_11Px,
      color: colors.black,
    },
    flex: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(2),
    },
    buttonStyles: {
      paddingVertical: scale(6),
      paddingHorizontal: scale(8),
    },
    textStyles: {
      fontSize: FontSize.FONT_12Px,
    },
    filterView: {
      flex: 0.97,
      backgroundColor: colors.white,
      borderTopRightRadius: scale(15),
      borderTopLeftRadius: scale(15),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: scale(12),
      paddingHorizontal: scale(18),
      borderBottomColor: colors.btnBorder,
      borderBottomWidth: 0.5,
    },
    _f08: {
      flex: 0.08,
    },
    filterContainer: {
      paddingHorizontal: scale(18),
      flex: 1,
    },
    filterTypeText: {
      fontSize: FontSize.FONT_16Px,
      fontFamily: typography.semiBold,
    },
    slider: {
      width: '100%',
      height: scale(40),
    },
    frsb: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: scale(12),
    },
    inputContainer: {
      flex: 1,
    },
    tabContainerStyle: {
      borderWidth: 0,
    },
    sitingCapTab: {
      paddingHorizontal: scale(32),
    },
    tabStyle: {
      borderWidth: 1,
      borderColor: colors.btnBorder,
    },
    tabTextStyle: {
      color: colors.placeholder,
      fontFamily: typography.regular,
      fontSize: FontSize.FONT_12Px,
    },
    placeHolder: {
      color: colors.placeholder,
    },
    clearAll: {
      color: colors.black,
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
    },
    btnContainerStyle: {
      paddingVertical: scale(10),
      paddingHorizontal: scale(12),
      backgroundColor: colors.black,
    },
    btnTextStyle: {
      fontSize: FontSize.FONT_12Px,
    },
})
