import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  value?: string;
  onChange: (value: "Pending" | "In-Transit") => void;
}

export default function StatusSelector({
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {["Pending", "In-Transit"].map((status) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.button,
            value === status && styles.selected,
          ]}
          onPress={() =>
            onChange(status as "Pending" | "In-Transit")
          }
        >
          <Text>{status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },

  selected: {
    backgroundColor: "#E8F2FF",
    borderColor: "#0D6EFD",
  },
});