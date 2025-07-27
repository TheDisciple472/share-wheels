import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import { FontSize } from "@/theme/font-size";
import { typography } from "@/theme/typography";

export default function EditBrand() {
  const route = useRouter();
  const { brandId } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/api/brands/${brandId}`);
        if (!response.ok) throw new Error("Failed to fetch brand");
        const res = await response.json();
        const brand = res.data;
        setName(brand.name || "");
        setImage(brand.image || "");
      } catch (err: any) {
        Alert.alert("Error", err.message);
      }
    };
    if (brandId) fetchBrand();
  }, [brandId]);

  const handleEditBrand = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/brands/${brandId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          image,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update brand");
      }
      Alert.alert("Success", "Brand updated successfully!");
      route.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Brand</Text>
      <InputComponent placeholder="Brand Name" value={name} onChangeInput={setName} />
      <InputComponent placeholder="Image URL" value={image} onChangeInput={setImage} />
      <ButtonComponent text="Update Brand" onPress={handleEditBrand} buttonStyles={styles.button} />
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