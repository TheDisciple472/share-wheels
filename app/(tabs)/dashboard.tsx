import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import ButtonComponent from "@/components/ButtonComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "@/components/HeaderComponent";
import Account from "../account";
import VendorDashboard from "../vendorDashboard";
import ClientDashboard from "../clientDashboard";
import AdminDashboard from "../adminDashboard";

export default function Dashboard() {
const [userRole, setUserRole] = useState<string | null>();

  useEffect(() => {
    const chechUserRole = async () => {
      const role = await AsyncStorage.getItem("role");
      console.log(role);
      setUserRole(role);
    };
    chechUserRole(); // Check login status on component mount
  }, []);

  if (userRole === "USER") {
    return <ClientDashboard />;
  } else if (userRole === "ADMIN") {
    return <AdminDashboard />;
  } else if (userRole === "VENDOR") {
    return <VendorDashboard />;
  }
}
