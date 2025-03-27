import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSource[]>([
    // emoji by Anggrek Lore from <a href="https://thenounproject.com/browse/icons/term/emoji/" target="_blank" title="emoji Icons">Noun Project</a> (CC BY 3.0)
    require("../assets/images/emoji1.png"),
    // emoji by Anggrek Lore from <a href="https://thenounproject.com/browse/icons/term/emoji/" target="_blank" title="emoji Icons">Noun Project</a> (CC BY 3.0)
    require("../assets/images/emoji2.png"),
    // emoticon by Anggrek Lore from <a href="https://thenounproject.com/browse/icons/term/emoticon/" target="_blank" title="emoticon Icons">Noun Project</a> (CC BY 3.0)
    require("../assets/images/emoji3.png"),
    // emoticon by Anggrek Lore from <a href="https://thenounproject.com/browse/icons/term/emoticon/" target="_blank" title="emoticon Icons">Noun Project</a> (CC BY 3.0)
    require("../assets/images/emoji4.png"),
    // emoticon by Anggrek Lore from <a href="https://thenounproject.com/browse/icons/term/emoticon/" target="_blank" title="emoticon Icons">Noun Project</a> (CC BY 3.0)
    require("../assets/images/emoji5.png"),
    // emoticon by Anggrek Lore from <a href="https://thenounproject.com/browse/icons/term/emoticon/" target="_blank" title="emoticon Icons">Noun Project</a> (CC BY 3.0)
    require("../assets/images/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
