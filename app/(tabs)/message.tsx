import HeaderActionComponent from "@/components/HeaderActionComponent";
import HeaderComponent from "@/components/HeaderComponent";
import InputComponent from "@/components/InputComponent";
import MessageSingleItem from "@/components/MessageSingleItem";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderBoderBottom } from "@/utils/ui-utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

export default function Message () {
    return (
     <View style={styles.container}>
      <HeaderComponent hasBack actionComponent={<HeaderActionComponent />} />
      <View style={styles.main}>
        <InputComponent
          onChangeInput={e => console.log(e)}
          leftAction={
            <MaterialIcons color={colors.gray} name="search" size={scale(22)} />
          }
          placeholder="Search...."
          containerStyle={styles.input}
        />
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({item}) => (
            <MessageSingleItem
              onPress={() =>
                alert("fdfd")
              }
              isHighlighted={[1, 2, 3, 6].includes(item)}
              name={''}
              message={''}
              time={''}
              badge={0}
            />
          )}
        />
        {renderBoderBottom(90)}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerAction: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: scale(10),
    },
    person: {
      height: scale(40),
      width: scale(40),
      borderRadius: 100,
    },
    title: {
      fontSize: FontSize.FONT_20Px,
      fontFamily: typography.bold,
      color: colors.black,
    },
    input: {
      marginHorizontal: scale(18),
    },
    main: {
      flex: 1,
      //   paddingHorizontal: scale(18),
    },
    messageContainer: {
      flex: 1,
      rowGap: scale(4),
    },
    name: {
      fontSize: FontSize.FONT_15Px,
      fontFamily: typography.bold,
      color: colors.black,
    },
    message: {
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
      color: colors.gray,
    },
    time: {
      fontSize: FontSize.FONT_12Px,
      fontFamily: typography.regular,
      color: colors.placeholder,
    },
    timeContainer: {
      columnGap: scale(10),
      alignItems: 'center',
      rowGap: scale(4),
    },
    badge: {
      backgroundColor: colors.badgeBg,
      height: scale(20),
      width: scale(20),
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontFamily: typography.medium,
      fontSize: FontSize.FONT_12Px,
      color: colors.white,
    },
})