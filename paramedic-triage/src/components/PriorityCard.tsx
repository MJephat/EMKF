import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  value?: number;
  onChange: (value: number) => void;
}

const colors = {
  1: "#8B0000",
  2: "#FF6B00",
  3: "#FFD600",
  4: "#2E7D32",
  5: "#1565C0",
};

export default function PrioritySelector({
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((priority) => (
        <TouchableOpacity
          key={priority}
          style={[
            styles.circle,
            { backgroundColor: colors[priority as keyof typeof colors] },
            value === priority && styles.selected,
          ]}
          onPress={() => onChange(priority)}
        >
          <Text style={styles.text}>{priority}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  selected: {
    borderWidth: 3,
    borderColor: "black",
  },

  text: {
    color: "white",
    fontWeight: "bold",
  },
});