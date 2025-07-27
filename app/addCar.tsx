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
  const [subInfo, setSubInfo] = useState("");
  const [features, setFeatures] = useState(""); // JSON string
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [brands, setBrands] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const phoneAdress = process.env.EXPO_PUBLIC_IP_ADDRESS;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // Fetch brands created by this user
        const brandsRes = await fetch(
          `http://${phoneAdress}:3000/api/brands/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (brandsRes.ok) {
          const res = await brandsRes.json();
          setBrands(res.data || []);
        }
        // Fetch locations created by this user
        const locationsRes = await fetch(
          `http://${phoneAdress}:3000/api/locations/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (locationsRes.ok) {
          const res = await locationsRes.json();
          setLocations(res.data || []);
        }
      } catch (err: any) {
        Alert.alert("Error", err.message);
      }
    };
    fetchOptions();
  }, []);

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

  const handleAddCar = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      // Validate features is valid JSON
      let featuresObj;
      let realFeatures = {
        "seats":Number(features)
      }
      try {
        featuresObj = realFeatures;
        console.log("image features", typeof JSON.stringify(featuresObj));
        
      } catch {
        Alert.alert("Error", "Features must be valid JSON");
        return;
      }
      try {
        const response = await fetch(`http://${phoneAdress}:3000/api/brands/${brand}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Update with your actual endpoint
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Login failed");
        }
        const res = await response.json();
        const data = res.data || [];
        console.log("brand :",brand);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
      try {
        const response = await fetch(`http://${phoneAdress}:3000/api/locations/${location}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Update with your actual endpoint
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Login failed");
        }
        const res = await response.json();
        const data = res.data || [];
        console.log("location :",location);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }


      // If you want to upload images to your server, you should use FormData and handle file uploads on backend.
      // For now, we'll just send the local URIs as an array.
      const formData = new FormData();
      formData.append("name", name);
      formData.append("subInfo", subInfo);
      formData.append("features", JSON.stringify(featuresObj));
      formData.append("price", String(Number(price)));
      formData.append("brandId", brand);
      formData.append("locationId", location);

      // Append each image as a file
      images.forEach((img, idx) => {
        formData.append(
          "images",
          {
            uri: img, // local file URI from ImagePicker
            name: `image_${idx}.jpg`, // or extract from img if available
            type: "image/jpeg", // or the correct mime type
          } as any // Cast to any to satisfy TypeScript
        );
      });

      const response = await fetch(`http://${phoneAdress}:3000/api/cars/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set 'Content-Type' manually for FormData!
        },
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add car");
      }
      Alert.alert("Success", "Car added successfully!");
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
      <InputComponent
        placeholder="Sub Info"
        value={subInfo}
        onChangeInput={setSubInfo}
      />
      <InputComponent
        placeholder="Car Features"
        value={features}
        onChangeInput={setFeatures}
      />
      <InputComponent
        placeholder="Price"
        value={price}
        onChangeInput={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Images</Text>
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
      <Text style={styles.label}>Brand</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={brand}
          onValueChange={(itemValue) => setBrand(itemValue)}
        >
          <Picker.Item label="Select Brand" value="" />
          {brands.map((b: any) => (
            <Picker.Item key={b.id} label={b.name} value={b.id} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Location</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Select Location" value="" />
          {locations.map((l: any) => (
            <Picker.Item key={l.id} label={l.city} value={l.id} />
          ))}
        </Picker>
      </View>
      <ButtonComponent
        text="Add Car"
        onPress={handleAddCar}
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
