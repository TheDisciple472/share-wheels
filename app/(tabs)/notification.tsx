import HeaderComponent from "@/components/HeaderComponent";
import { colors } from "@/theme/colors";
import { renderMarginBottom } from "@/utils/ui-utils";
import React from "react";
import { View, StyleSheet, Pressable, Image, FlatList } from "react-native";
import NotificationSingleItem from "@/components/NotificationSingleItem";

export default function Notification () {
    return (
    <View style={styles.container}>
      <HeaderComponent title="Notification" hasBack />
      <View style={styles.main}>
        <FlatList
            showsVerticalScrollIndicator = {false}
          data={[1, 2, 3, 3, 3, 4, 3]}
          renderItem={({item}) => <NotificationSingleItem unRead={item % 2 === 0} />}
        />
        {renderMarginBottom(80)}
      </View>
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
    },
})