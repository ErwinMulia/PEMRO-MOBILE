import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useShoppingStore } from "../../store/useShoppingStore";
import { useThemeStore } from "../../store/useThemeStore";
import { lightColors, darkColors } from "../utils/theme";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const darkMode = useThemeStore((state) => state.darkMode);
  const colors = darkMode ? darkColors : lightColors;

  const items = useShoppingStore((state) => state.items);
  const editItem = useShoppingStore((state) => state.editItem);

  const item = items.find((i) => i.id === id);
  const [nama, setNama] = useState(item?.nama || "");
  const [quantity, setQuantity] = useState(item?.quantity.toString() || "");
  const [kategori, setKategori] = useState(item?.kategori || "");

  if (!item) return <Text style={{ color: colors.text }}>Item tidak ditemukan</Text>;

 const handleSave = () => {
  const qty = parseInt(quantity);
  if (!nama || !kategori || isNaN(qty)) {
    Alert.alert("Error", "Semua field wajib diisi dan quantity harus angka");
    return;
  }

  editItem(item.id, { nama, quantity: qty, kategori, purchased: item.purchased }); 
  Alert.alert("Berhasil", "Item berhasil diperbarui");
  router.back();
};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Detail Item</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]}
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]}
        value={kategori}
        onChangeText={setKategori}
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={handleSave}>
        <Text style={styles.btnText}>Simpan Perubahan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 12 },
  btn: { padding: 14, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});