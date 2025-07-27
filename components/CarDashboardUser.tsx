import imagesPaths from "@/assets/imagesPath";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { renderMarginBottom } from "@/utils/ui-utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ButtonComponent from "./ButtonComponent";
import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";

type Props = {
  bottomActions?: React.ReactNode;
  imageSource: string;
  onPress?: () => void;
  status: string;
  price?: string;
  name?: string;
  onUpdatePress?: () => void;
  onDeletePress?: () => void;
  onButtonPress?: () => void;
  buttonText?: string;
  pickUpDate?: string;
  dropDate?: string;
  vendor?: boolean;
};

export default function CarDashboardUserComponent({
  bottomActions,
  imageSource,
  onPress,
  status,
  price,
  name,
  onUpdatePress,
  onDeletePress,
  onButtonPress,
  buttonText = "Pay Now",
  pickUpDate,
  dropDate,
  vendor,
}: Props) {
  const unavailableStatuses = ["RESERVED", "PENDING", "CONFIRMED"];
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {/* Top right action buttons */}
      {vendor && (
        <View style={styles.actionIconsContainer}>
          <Pressable onPress={onUpdatePress} style={styles.iconPressable}>
            <MaterialIcons name="edit" size={scale(18)} color={colors.blue} />
          </Pressable>
          <Pressable onPress={onDeletePress} style={styles.iconPressable}>
            <MaterialIcons name="delete" size={scale(18)} color={colors.red} />
          </Pressable>
        </View>
      )}

      <View style={styles.contentWrapper}>
        {/* Car Image on the left */}
        <View style={styles.carImageWrapper}>
          <Image
            source={{ uri: imageSource }}
            resizeMode="contain"
            style={styles.carImage}
          />
        </View>

        {/* Car details on the right */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{name}</Text>
          {renderMarginBottom(2)}
          <View style={styles.flex}>
            {/* <MaterialIcons name="star" size={scale(16)} color={colors.star} /> */}
            {unavailableStatuses.includes(status) ? (
              <Text style={[styles.text, styles.textBold]}>
                Status : <Text>{status}</Text>
              </Text>
            ) : (
              <Text style={[styles.text, styles.textBold]}>
                Status :{" "}
                <Text
                  style={[
                    styles.text,
                    styles.textBold,
                    { color: colors.green },
                  ]}
                >
                  Available
                </Text>
              </Text>
            )}
            {/* <Text style={[styles.text, styles.textBold, { color: colors.black }]}></Text> */}
          </View>
          {renderMarginBottom(4)}
          <View style={[styles.flex, { columnGap: scale(4) }]}>
            {unavailableStatuses.includes(status) ? (
              <Text style={[styles.text, styles.textBold]}>
                Pick Up Date : <Text>{pickUpDate}</Text>
              </Text>
            ) : (
              <Text style={[styles.text, styles.textBold]}>
                Price :{" "}
                <Text style={[styles.text, styles.textBold]}>200 XAF</Text>
              </Text>
            )}
          </View>
          {renderMarginBottom(4)}
          <View style={[styles.flex, { columnGap: scale(4) }]}>
            {unavailableStatuses.includes(status) ? (
              <Text style={[styles.text, styles.textBold]}>
                Return Date : <Text>{dropDate}</Text>
              </Text>
            ) : (
              <Text style={[styles.text, styles.textBold]}>
                Capacity :{" "}
                <Text style={[styles.text, styles.textBold]}>4 Seats</Text>
              </Text>
            )}
          </View>
          {renderMarginBottom(4)}
          <View style={[styles.flex, { columnGap: scale(4) }]}>
            {unavailableStatuses.includes(status) ? (
              <Text style={[styles.text, styles.textBold]}>
                Total Price : <Text>{price} XAF</Text>
              </Text>
            ) : (
              <Text style={[styles.text, styles.textBold]}>
                Price :{" "}
                <Text style={[styles.text, styles.textBold]}>40 XAF</Text>
              </Text>
            )}
          </View>

          {/* Bottom right button */}
          {status == "RESERVED" &&  (
            <Pressable style={styles.button} onPress={onButtonPress}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
          )
          //  :
          // (
          //   <Pressable style={styles.button} onPress={onButtonPress}>
          //     <Text style={styles.buttonText}>
          //       Pay Now
          //     </Text>
          //   </Pressable>
          // )
        }

        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(16),
    marginBottom: scale(14), // Added margin to separate components in a list
    padding: scale(10),
    position: "relative", // Needed for absolute positioning of action icons
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  carImageWrapper: {
    width: scale(130), // Fixed width for the image container
    height: scale(110), // Fixed height
    borderRadius: scale(12),
    overflow: "hidden", // Ensures the image respects the border radius
    backgroundColor: colors.carBg,
    alignItems: "center",
    justifyContent: "center",
  },
  carImage: {
    width: "90%",
    height: "90%",
  },
  detailsContainer: {
    flex: 1, // Takes up the remaining space
    paddingLeft: scale(12),
    justifyContent: "space-between",
  },
  title: {
    fontFamily: typography.semiBold,
    fontSize: FontSize.FONT_16Px,
    color: colors.black,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(2),
  },
  horizontalFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  textBold: {
    fontFamily: typography.semiBold,
  },
  text: {
    fontSize: FontSize.FONT_12Px,
    color: colors.placeholder,
    fontFamily: typography.regular,
  },
  price: {
    fontSize: FontSize.FONT_14Px,
    color: colors.primary,
    fontFamily: typography.semiBold,
  },
  actionIconsContainer: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    flexDirection: "row",
    columnGap: scale(8),
    zIndex: 1,
  },
  iconPressable: {
    padding: scale(4),
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    alignSelf: "flex-end", // Align to the bottom right
    marginTop: scale(8),
  },
  buttonText: {
    color: colors.white,
    fontFamily: typography.semiBold,
    fontSize: FontSize.FONT_12Px,
  },
});
