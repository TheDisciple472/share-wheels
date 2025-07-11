import CarBrandComponent from "@/components/CarBrandComponent";
import CarComponent from "@/components/CarComponent";
import HeaderComponent from "@/components/HeaderComponent";
import SearchComponent from "@/components/SearchComponent";
import { colors } from "@/theme/colors";
import { FontSize } from "@/theme/font-size";
import { scale } from "@/theme/scale";
import { typography } from "@/theme/typography";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <HeaderComponent title="Share-wheels" />
      <View style={styles.main}>
        <SearchComponent />
        <View style={[styles.showCase, styles.p18]}>
          <Text style={styles.text}>Brands</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item }) => <CarBrandComponent text="Tesla" isSelected={1}/>}
          />
        </View>
        <View style={[styles.showCaseCars, styles.p18]}>
          <View style={styles.viewContainer}>
            <Text style={styles.text}>Best Cars</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View style={styles.flexRow}>
            <CarComponent />
            <CarComponent />
          </View>
          <View style={styles.flexRow}>
            <CarComponent />
            <CarComponent />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  main: {
    flex: 1,
  },
  p18: {
    paddingHorizontal: scale(18),
  },
  carLogo: {
    height: scale(38),
    width: scale(38),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(14),
    paddingVertical: scale(12),
  },
  titleStyle: {
    fontSize: FontSize.FONT_24Px,
    color: colors.black,
    fontFamily: typography.bold,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: scale(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderRound: {
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    height: scale(40),
    width: scale(40),
    borderRadius: scale(100),
  },
  wh: {
    backgroundColor: colors.white,
  },
  person: {
    height: scale(40),
    width: scale(40),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
  inputContainer: {
    flex: 1,
    marginTop: 0,
    height: scale(45),
    paddingVertical: 0,
  },
  text: {
    fontSize: FontSize.FONT_16Px,
    color: colors.black,
    fontFamily: typography.semiBold,
  },
  showCase: {
    rowGap: scale(12),
    marginTop: scale(12),
  },

  showCaseCars: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    marginTop: scale(24),
    paddingTop: scale(20),
  },
  viewAll: {
    color: colors.placeholder,
    fontSize: FontSize.FONT_12Px,
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
