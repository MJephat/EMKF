import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  rules?: any;
  multiline?: boolean;
}

export default function InputField({
  control,
  name,
  label,
  placeholder,
  rules,
  multiline = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                styles.input,
                multiline && styles.multiline,
                error && styles.errorBorder,
              ]}
              placeholder={placeholder}
              value={value}
              multiline={multiline}
              onChangeText={onChange}
            />

            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },

  multiline: {
    height: 100,
    textAlignVertical: "top",
  },

  errorBorder: {
    borderColor: "red",
  },

  error: {
    color: "red",
    marginTop: 5,
  },
});