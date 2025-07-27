import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import { FontSize } from "@/theme/font-size";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function AddCar() {
  const route = useRouter();
  const [name, setName] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS;



  // Image Picker Handler
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please grant camera roll permissions."
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1, // You can adjust the limit
    });

    if (!result.canceled) {
      // For multiple selection, result.assets is an array
      const uris = result.assets
        ? (result.assets as Array<{ uri: string }>).map((asset) => asset.uri)
        : [];
      setImages([...images, ...uris]);
    }
  };

  const handleAddBrand = async () => {
    const token = await AsyncStorage.getItem("token");

    try {

      // If you want to upload images to your server, you should use FormData and handle file uploads on backend.
      // For now, we'll just send the local URIs as an array.
      const formData = new FormData();
      formData.append("name", name);

      // Append each image as a file
      images.forEach((img, idx) => {
        formData.append(
          "image",
          {
            uri: img, // local file URI from ImagePicker
            name: `image_${idx}.jpg`, // or extract from img if available
            type: "image/jpeg", // or the correct mime type
          } as any // Cast to any to satisfy TypeScript
        );
      });

      const response = await fetch(`http://${phoneAdress}:3000/api/brands/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set 'Content-Type' manually for FormData!
        },
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add brand");
      }
      Alert.alert("Success", "Brand added successfully!");
      route.back();
    } 
    catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Car</Text>
      <InputComponent placeholder="Name" value={name} onChangeInput={setName} />
      
      <Text style={styles.label}>Image</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: scale(8),
        }}
      >
        {images.map((uri, idx) => (
          <Image
            key={idx}
            source={{ uri }}
            style={{
              width: scale(60),
              height: scale(60),
              marginRight: scale(8),
              borderRadius: scale(6),
            }}
          />
        ))}
        <Pressable style={styles.imagePickerBtn} onPress={pickImages}>
          <Text style={{ color: colors.primary, fontSize: FontSize.FONT_24Px }}>
            +
          </Text>
        </Pressable>
      </View>
      <ButtonComponent
        text="Add Brand"
        onPress={handleAddBrand}
        buttonStyles={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: scale(16),
  },
  header: {
    fontSize: FontSize.FONT_22Px,
    fontFamily: typography.bold,
    marginBottom: scale(18),
    color: colors.primary,
  },
  button: {
    marginTop: scale(16),
    marginBottom: scale(24),
  },
  label: {
    fontSize: FontSize.FONT_16Px,
    fontFamily: typography.medium,
    marginTop: scale(12),
    marginBottom: scale(8),
    color: colors.black,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(8),
    overflow: "hidden",
  },
  imagePickerBtn: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
