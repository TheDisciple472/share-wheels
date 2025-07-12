import React, {useState} from 'react';
import {FlatList, Pressable, Text, TextStyle, View, ViewStyle, StyleSheet, StyleProp} from 'react-native';
import {renderMarginBottom} from '../utils/ui-utils';
import { colors } from '@/theme/colors';
import { FontSize } from '@/theme/font-size';
import { scale } from '@/theme/scale';
import { typography } from '@/theme/typography';


type Props = {
    title ? : string;
    data : ITab[];
    onPress : (e : ITab) => void;
    tabContainerStyle? : ViewStyle;
    tabStyle? : StyleProp<ViewStyle>;
    tabTextStyle? : TextStyle
}

export interface ITab {
    id : number;
    label : string
    value : string
}

export default function TabSwitcher ({title, data, onPress, tabContainerStyle, tabStyle,tabTextStyle} : Props) {
    const [active, setActive] = useState(data[0]);
    return (
        <View style={styles.typeView}>
      {title && <Text style={styles.filterTypeText}>{title}</Text>}
      {renderMarginBottom(16)}
      <View style={[styles.tabContainer, tabContainerStyle]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={data}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                onPress(item);
                setActive(item);
              }}
              style={[
                styles.tab,
                tabStyle,
                item.id === active.id && styles.activeTab,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  tabTextStyle,
                  item.id === active.id && styles.tabTextActive,
                ]}>
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    typeView: {
      paddingVertical: scale(12),
    },
    contentContainerStyle: {
      justifyContent: 'space-between',
      flex: 1,
    },
    tabContainer: {
      flexDirection: 'row',
      columnGap: scale(12),
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.btnBorder,
      borderRadius: scale(30),
    },
    filterTypeText: {
      fontSize: FontSize.FONT_16Px,
      fontFamily: typography.semiBold,
    },
    tab: {
      paddingHorizontal: scale(20),
      paddingVertical: scale(12),
      borderRadius: scale(30),
    },
    activeTab: {
      backgroundColor: colors.black,
    },
    tabText: {
      fontSize: FontSize.FONT_14Px,
      color: colors.black,
      fontFamily: typography.medium,
    },
    tabTextActive: {
      color: colors.white,
    },
})