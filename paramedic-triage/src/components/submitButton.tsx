import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

export default function SubmitButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>SUBMIT </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0D6EFD",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});