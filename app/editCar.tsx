import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import { FontSize } from "@/theme/font-size";
import { typography } from "@/theme/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditCar() {
  const route = useRouter();
  const { carId } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [subInfo, setSubInfo] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS;
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // console.log(carId);
        const response = await fetch(`http://${phoneAdress}:3000/api/cars/car/${carId}`,
          {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        if (!response.ok) throw new Error("Failed to fetch car");
        const res = await response.json();
        const car = res.data;
        setName(car.name || "");
        setSubInfo(car.subInfo || "");
        setFeatures(car.features || "");
        setPrice(car.price ? String(car.price) : "");
        setImages(car.media?.gallery?.join(",") || "");
        setBrand(car.brand?.id || "");
        setLocation(car.location?.city || "");
      } catch (err: any) {
        Alert.alert("Error", err.message);
      }
    };
    if (carId) fetchCar();
  }, [carId]);

  const handleEditCar = async () => {
    try {
        const token = await AsyncStorage.getItem("token");

      let featuresObj;
      try {
        featuresObj = JSON.parse(features);
      } catch {
        Alert.alert("Error", "Features must be valid JSON");
        return;
      }
      const response = await fetch(`http://${phoneAdress}:3000/api/cars/update/${carId}`, {
        method: "PUT",
        headers: {
                Authorization: `Bearer ${token}`,
              },
        body: JSON.stringify({
          name,
          subInfo,
          features: JSON.stringify(featuresObj),
          price: Number(price),
          images: images.split(",").map((img) => img.trim()),
          brand,
          location,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update car");
      }
      Alert.alert("Success", "Car updated successfully!");
      route.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Car</Text>
      <InputComponent placeholder="Name" value={name} onChangeInput={setName} />
      <InputComponent placeholder="Sub Info" value={subInfo} onChangeInput={setSubInfo} />
      <InputComponent
        placeholder='Features '
        value={features}
        onChangeInput={setFeatures}
      />
      <InputComponent
        placeholder="Price"
        value={price}
        onChangeInput={setPrice}
        keyboardType="numeric"
      />
      <InputComponent
        placeholder="Images"
        value={images}
        onChangeInput={setImages}
      />
      <InputComponent placeholder="Brand ID" value={brand} onChangeInput={setBrand} />
      <InputComponent placeholder="Location" value={location} onChangeInput={setLocation} />
      <ButtonComponent text="Update Car" onPress={handleEditCar} buttonStyles={styles.button} />
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
  },
});