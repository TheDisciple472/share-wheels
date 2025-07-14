import ChatCardComponent from "@/components/ChatCardComponent";
import HeaderActionComponent from "@/components/HeaderActionComponent";
import HeaderComponent from "@/components/HeaderComponent";
import InputComponent from "@/components/InputComponent";
import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <HeaderComponent hasBack actionComponent={<HeaderActionComponent />} />
      <View style={styles.main}>
        <FlatList
          showsVerticalScrollIndicator={false}
          inverted
          renderItem={({ item }) => (
            <ChatCardComponent
              message={item.message}
              time={item.time}
              isSelf={item.isSelf}
            />
          )}
          data={[
            {
              isSelf: false,
              message: "okay fine ",
              time: "10:00 AM",
            },
            {
              isSelf: true,
              message: "yes i am fine thank you",
              time: "9:00 AM",
            },
            {
              isSelf: false,
              message: "Hello, how are you?",
              time: "8:00 AM",
            },
            {
              isSelf: true,
              message: "Good morning!",
              time: "7:00 AM",
            },
          ]}
        />
        <View style={styles.sendMessageContainer}>
          <InputComponent
            containerStyle={styles.sendInput}
            onChangeInput={(e) => console.log(e)}
            placeholder={"Send a message..."}
          />
          <MaterialIcons
            onPress={() => console.log("send")}
            name="send"
            color={colors.placeholder}
            size={scale(24)}
          />
        </View>
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
    paddingHorizontal: scale(18),
    paddingVertical: scale(8),
  },
  sendInput: {
    flex: 1,
    marginTop: 0,
  },
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(8),
    columnGap: scale(10),
  },
});
