import imagesPaths from '@/assets/imagesPath';
import { colors } from '@/theme/colors';
import { FontSize } from '@/theme/font-size';
import { scale } from '@/theme/scale';
import { typography } from '@/theme/typography';
import { useState } from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

type Props = {
    isHighlighted? : boolean;
    name: string;
    message : string;
    time : string;
    badge : number;
    onPress : () => void;
}

export default function MessageSingleItem ({isHighlighted, name, time, message, badge, onPress} : Props){
    const styles = createStyles(isHighlighted);
    return (
    <Pressable onPress={onPress} style={styles.singleItem}>
      <Image source={imagesPaths.person} style={styles.person} />
      <View style={styles.messageContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
          Hello, how are you? Hello,
        </Text>
      </View>
      <View style={styles.timeContainer}>
        {isHighlighted && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        )}
        <Text style={styles.time}>12:00 PM</Text>
      </View>
    </Pressable>
  );
}




const createStyles = (isHighlighted? : boolean) => StyleSheet.create({
    singleItem: {
          backgroundColor: isHighlighted ? colors.white : 'tranparent',
          paddingVertical: scale(10),
          marginVertical: scale(10),
          flexDirection: 'row',
          alignItems: 'flex-end',
          columnGap: scale(10),
          paddingHorizontal: scale(18),
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
        person: {
      height: scale(40),
      width: scale(40),
      borderRadius: 100,
    },
})