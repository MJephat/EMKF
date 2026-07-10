import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useForm } from "react-hook-form";

import InputField from "../components/InputField";
import PrioritySelector from "../components/PriorityCard";
import StatusSelector from "../components/StatusPicker";
import SubmitButton from "../components/submitButton";


type FormData = {
  patientName: string;
  description: string;
  priority: number;
  status: "Pending" | "In-Transit";
};

export default function TriageScreen() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert("Success", JSON.stringify(data, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Triage Submission Intake Form</Text>

      <InputField
        control={control}
        name="patientName"
        label="Patient Name"
        placeholder="Enter patient name"
        rules={{
          required: "Patient name is required",
        }}
      />

      <InputField
        control={control}
        name="description"
        label="Condition Description"
        placeholder="Describe the patient's condition"
        multiline
        rules={{
          required: "Condition description is required",
        }}
      />

      <Text style={styles.label}>Priority</Text>

      <PrioritySelector
        value={watch("priority")}
        onChange={(value) => setValue("priority", value)}
      />

      <Text style={styles.label}>Status</Text>

      <StatusSelector
        value={watch("status")}
        onChange={(value) => setValue("status", value)}
      />

      <SubmitButton onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
    alignSelf: "center",
  },

  label: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 16,
  },
});