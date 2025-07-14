import { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import FavouriteComponent from "./FavouriteComponent";
import { scale } from "@/theme/scale";

const { width } = Dimensions.get("window");

export default function ImageSlider({ images }: { images: ImageSourcePropType[] }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      <FavouriteComponent favStyles={{ right: scale(18), top: scale(12) }} />
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{ width, height: scale(220) }}
            resizeMode="cover"
          />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
      />

      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              [
                {
                  backgroundColor: index === currentIndex ? "#333" : "#bbb",
                },
                styles.dot,
              ],
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dots: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
