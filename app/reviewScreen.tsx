import ButtonComponent from "@/components/ButtonComponent";
import HeaderComponent from "@/components/HeaderComponent";
import InputComponent from "@/components/InputComponent";
import ReviewComponent from "@/components/ReviewComponent";
import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import { renderMarginTop, renderMarginBottom } from "@/utils/ui-utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { navigate } from "expo-router/build/global-state/routing";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { useRouter } from "expo-router";

export default function ReviewScreen (){
    const route = useRouter()
    return (
    <View style={styles.container}>
      <HeaderComponent title="Reviews" hasBack />
      <View style={styles.main}>
        <InputComponent
          onChangeInput={e => console.log(e)}
          leftAction={
            <MaterialIcons color={colors.gray} name="search" size={scale(22)} />
          }
          placeholder="Find Reviews ......"
        />
        <View style={styles.flatListContainer}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            showsVerticalScrollIndicator={false}
            renderItem={( index) => (
              <ReviewComponent containerStyle={styles.reviewCard} fromReview  key={index.toString()}/>
            )}
          />
        </View>
        {renderMarginTop(8)}
        <ButtonComponent onPress={()=> route.push("/bookingScreen")} text="Book Now" />
        {renderMarginBottom(8)}
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
    },
    flatListContainer: {
      flex: 1,
    },
    reviewCard: {
      width: '100%',
      marginRight: 0,
      marginTop: scale(14),
    },
})