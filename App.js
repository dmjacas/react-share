import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import { downloadAsync, documentDirectory } from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing";
const productos = [
  {
    id: 1,
    name: "Colchón Imperial Tradicional Beige 27 cm de altura",
    price: "S/ 1.500",
    description: "Colchón Imperial Tradicional Beige 27 cm de altura",
    image: "https://chaide-y-chaide.s3.amazonaws.com/IMPERIALBEIGE.jpg",
  },
  {
    id: 2,
    name: "Colchón Imperial Tradicional 27 cm de altura",
    price: "S/ 1000",
    description: "Colchón Imperial Tradicional 27 cm de altura",
    image: "https://chaide-y-chaide.s3.amazonaws.com/IMPERIALFRANJAAZUL.jpg",
  },
];

const ShareApp = () => {
  const sharedImg = async (img, name) => {
    if (!(await isAvailableAsync())) {
      alert(`La plataforma no soporta compartir`);
      return;
    }
    const uri = await downloadAsync(img, `${documentDirectory}${name}.jpg`);
    await shareAsync(uri.uri, {
      mimeType: "image/jpeg",
      dialogTitle: "Compartir producto",
    });
  };
  const Item = ({ id, image, name, price, description }) => (
    <View style={styles.item} key={`item_${id}`}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.thumbnail}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.instructions}>{description}</Text>

      <TouchableOpacity
        onPress={() => sharedImg(image, name)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Compartir</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => <Item {...item} />;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};
export default ShareApp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },
  instructions: {
    color: "#808080",
    fontSize: 14,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  price: {
    color: "#00549e",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  name: {
    color: "#00549e",
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "stretch",
    alignItems: "center",
  },
});
