import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ShoppingItem } from "../../store/useShoppingStore";

interface Props {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: () => void;
}

const ShoppingCard: React.FC<Props> = ({ item, onToggle, onDelete, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, item.purchased && { textDecorationLine: "line-through" }]}>
          {item.nama}
        </Text>
        <Text style={styles.details}>
          {item.quantity} - {item.kategori}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.btn}>
        <Text>{item.purchased ? "✔" : "❌"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.btn}>
        <Text>🗑</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ShoppingCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  name: { fontSize: 16, fontWeight: "600" },
  details: { fontSize: 14, color: "#555" },
  btn: { marginLeft: 12 },
});