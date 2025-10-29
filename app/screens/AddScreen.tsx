import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useShoppingStore } from "../../store/useShoppingStore";
import { useThemeStore } from "../../store/useThemeStore";
import { lightColors, darkColors } from "../utils/theme";

export default function AddScreen() {
  const router = useRouter();
  const darkMode = useThemeStore((state) => state.darkMode);
  const colors = darkMode ? darkColors : lightColors;
  const addItem = useShoppingStore((state) => state.addItem);

  const [nama, setNama] = useState("");
  const [quantity, setQuantity] = useState("");
  const [kategori, setKategori] = useState("");

  const handleSave = () => {
    const qty = parseInt(quantity);
    if (!nama || !kategori || isNaN(qty)) {
      Alert.alert("Error", "Semua field wajib diisi dan quantity harus angka");
      return;
    }
   addItem({ nama, quantity: qty, kategori, purchased: false });
    Alert.alert("Berhasil", "Item berhasil ditambahkan");
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Tambah Item</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]}
        placeholder="Nama Item"
        placeholderTextColor={colors.placeholder}
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]}
        placeholder="Quantity"
        placeholderTextColor={colors.placeholder}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]}
        placeholder="Kategori"
        placeholderTextColor={colors.placeholder}
        value={kategori}
        onChangeText={setKategori}
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={handleSave}>
        <Text style={styles.btnText}>Simpan</Text>
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