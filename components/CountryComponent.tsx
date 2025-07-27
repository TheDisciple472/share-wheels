import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import React from "react";
import { View, StyleSheet, FlatList, Pressable, Text } from "react-native";
import BottomSheet from "./BottomSheet";

interface Props {
    onPress : (e : any) => void
}

const roles = [
  {name : "User", flag: "👤"},
  {name : "Vendor", flag: "🛒"},
];


export default function CountryComponent ({onPress} : Props){
    const [isVisible, setIsVisible] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(roles[0]);

   return (
    <View>
      <Pressable
        onPress={() => setIsVisible(!isVisible)}
        style={styles.container}>
        <Text style={styles.text}>
          {selectedCountry?.flag}
          {'\t\t'}
          {selectedCountry?.name}
        </Text>
      </Pressable>
      <BottomSheet visible={isVisible} setVisible={setIsVisible}>
        <View style={styles.bottomSheet}>
          <FlatList
            data={roles}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setSelectedCountry(item);
                  setIsVisible(false);
                  onPress(item);
                }}
                style={styles.itemContainer}>
                <Text style={styles.text}>
                  {item?.flag} {'\t\t'}
                  {item?.name}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: scale(10),
      backgroundColor: colors.white,
      paddingVertical: scale(2),
      marginTop: scale(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: scale(10),
      height: scale(50),
    },
    text: {
      fontSize: FontSize.FONT_14Px,
      color: colors.placeholder,
      paddingHorizontal: scale(12),
      fontFamily: typography.regular,
      paddingVertical: scale(12),
      flex: 1,
      marginLeft: scale(10),
    },
    bottomSheet: {
      backgroundColor: colors.white,
      flex: 0.35,
      borderRadius: scale(12),
      paddingTop: scale(12),
    },
    itemContainer: {
      paddingVertical: scale(2),
      paddingHorizontal: scale(12),
    },
    eye: {
      height: scale(22),
      width: scale(22),
    },
})