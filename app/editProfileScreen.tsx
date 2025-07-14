import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { View, StyleSheet, Image, Button, Pressable, ScrollView, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Edge } from "react-native-safe-area-context";
import imagesPaths from "@/assets/imagesPath";
import HeaderComponent from "@/components/HeaderComponent";
import InputComponent from "@/components/InputComponent";
import { renderMarginBottom } from "@/utils/ui-utils";
import Feather from "@expo/vector-icons/Feather";
import ButtonComponent from "@/components/ButtonComponent";

interface EditProfileProps {
    selectImage : () => void;
    photo : string  | undefined;
}

const {person} = imagesPaths;

export default function EditProfileScreen () {
    const  {photo, selectImage} = useEdit();
    const source = photo || person;
    return (
    <View style={styles.container}>
      <HeaderComponent title="Edit Profile" hasBack />
      <ScrollView style={styles.main}>
        <Pressable onPress={selectImage} style={styles.profileContainer}>
          <Image source={source} style={styles.profileImage} />
          <View style={styles.editContainer}>
            <Feather name="edit-3" size={scale(12)} color={colors.gray} />
          </View>
          {renderMarginBottom(6)}
          <Text style={styles.title}>John Doe</Text>
        </Pressable>
        <InputComponent placeholder="John" onChangeInput={e => console.log(e)} />
        <InputComponent placeholder="Doe" onChangeInput={e => console.log(e)} />
        <InputComponent
          placeholder="john@example.com"
          onChangeInput={e => console.log(e)}
        />
        <InputComponent
          placeholder="+0000"
          onChangeInput={e => console.log(e)}
        />
        {renderMarginBottom(28)}
        <ButtonComponent text="Save" />
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
      paddingHorizontal: scale(18),
    },
    profileImage: {
      height: scale(70),
      width: scale(70),
      borderWidth: 1,
      borderRadius: scale(100),
      borderColor: colors.gray,
    },
    title: {
      fontSize: FontSize.FONT_16Px,
      color: colors.black,
      fontFamily: typography.semiBold,
    },
    profileContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale(28),
      position: 'relative',
      alignSelf: 'center',
      paddingHorizontal: scale(20),
    },
    editContainer: {
      backgroundColor: colors.white,
      height: scale(22),
      width: scale(22),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(100),
      position: 'absolute',
      bottom: scale(60),
      right: scale(18),
      borderWidth: 1,
      borderColor: colors.gray,
    },
})


// hook 

const useEdit = () : EditProfileProps => {
    const [photo, setPhoto] = useState < string | undefined>();

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("You didn't choose an image");
    } else {
      console.log(result);
      setPhoto(result.assets[0].uri);
    }
    }

    return {
        selectImage,
        photo
    }
}