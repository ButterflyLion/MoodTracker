import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [selectedImage]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#fff" />}
      <Image
        source={imageSource}
        style={styles.image}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    position: "absolute",
  },
});
