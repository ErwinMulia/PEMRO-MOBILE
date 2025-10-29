import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useShoppingStore } from "../../store/useShoppingStore";
import Toast from "react-native-toast-message";
import { useThemeStore } from "../../store/useThemeStore";
import { lightColors, darkColors } from "../utils/theme";

interface FormData { nama: string; quantity: string; kategori: string; }

export default function AddItemScreen() {
  const router = useRouter();
  const addItem = useShoppingStore((state) => state.addItem);
  const darkMode = useThemeStore((state) => state.darkMode);
  const colors = darkMode ? darkColors : lightColors;

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { nama: "", quantity: "", kategori: "" },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!data.nama || !data.quantity || !data.kategori) {
      Toast.show({ type: "error", text1: "Semua field wajib diisi" });
      return;
    }
    const qty = parseInt(data.quantity);
    if (isNaN(qty) || qty <= 0) {
      Toast.show({ type: "error", text1: "Quantity harus angka > 0" });
      return;
    }
    addItem({ nama: data.nama, quantity: qty, kategori: data.kategori, purchased: false });
    Toast.show({ type: "success", text1: "Item berhasil ditambahkan" });
    reset();
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Tambah Item Belanja</Text>

      <Controller
        control={control}
        name="nama"
        render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]} placeholder="Nama item" value={value} onChangeText={onChange} />
        )}
      />
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]} placeholder="Quantity" keyboardType="numeric" value={value} onChangeText={onChange} />
        )}
      />
      <Controller
        control={control}
        name="kategori"
        render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.placeholder }]} placeholder="Kategori" value={value} onChangeText={onChange} />
        )}
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 12 },
  btn: { padding: 14, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});