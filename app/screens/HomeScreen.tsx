import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useShoppingStore } from "../../store/useShoppingStore";
import ShoppingCard from "../components/ShoppingCard";
import { useThemeStore } from "../../store/useThemeStore";
import { lightColors, darkColors } from "../utils/theme";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const router = useRouter();
  const items = useShoppingStore((state) => state.items);
  const deleteItem = useShoppingStore((state) => state.deleteItem);
  const togglePurchased = useShoppingStore((state) => state.togglePurchased);
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const colors = darkMode ? darkColors : lightColors;

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredItems(
      items.filter(
        (item) => item.nama.toLowerCase().includes(lower) || item.kategori.toLowerCase().includes(lower)
      )
    );
  }, [search, items]);

  const handleDelete = (id: string) => {
    deleteItem(id);
    Toast.show({ type: "success", text1: "Item dihapus" });
  };

  const handleToggle = (id: string) => {
    togglePurchased(id);
    Toast.show({ type: "success", text1: "Status diperbarui" });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Dark Mode Toggle */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 12 }}>
        <Text style={{ color: colors.text, marginRight: 8 }}>{darkMode ? "Dark Mode" : "Light Mode"}</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <TextInput
        style={[styles.search, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]}
        placeholder="Cari nama atau kategori..."
        placeholderTextColor={colors.placeholder}
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={() => router.push("/add")}>
        <Text style={styles.addText}>+ Tambah Item</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShoppingCard
            item={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onPress={() => router.push(`/detail/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20, color: colors.text }}>Belum ada item.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 12 },
  addBtn: { padding: 14, borderRadius: 10, alignItems: "center", marginBottom: 12 },
  addText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});