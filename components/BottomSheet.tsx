import { View, StyleSheet, Pressable, Modal } from "react-native";
import { JSX } from "react";
type Props = {
  visible: boolean;
  setVisible: (e: any) => void;
  children: JSX.Element;
};

export default function BottomSheet({visible, setVisible, children}:Props) {
    return (
        <Modal
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <Pressable onPress={() => setVisible(false)} style={styles.dim} />
      <View style={styles.modalOverlay}>{children}</View>
    </Modal>
    )


}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dim: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
