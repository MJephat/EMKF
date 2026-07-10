import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import { useForm } from "react-hook-form";

import InputField from "../components/InputField";
import PrioritySelector from "../components/PriorityCard";
import StatusSelector from "../components/StatusPicker";
import SubmitButton from "../components/submitButton";
import { TriageRepository } from "../database/triageRepository";
// import { v4 as uuid } from "uuid";
import uuid from "react-native-uuid";
import { Triage } from "../models/triage";
import TriageCard from "../components/TriageCard";
import useSync from "../hooks/useSync";


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
  reset,
} = useForm<FormData>({
  defaultValues: {
    patientName: "",
    description: "",
    priority: undefined,
    status: undefined,
  },
});

//   const repository = new TriageRepository();
  const repository = useMemo(() => new TriageRepository(), []);
  const [records, setRecords] = useState<Triage[]>([]);

  //load existing Records
useEffect(() => {
    loadRecords();
}, []);

const loadRecords = () => {
    const data = repository.getAll();
      console.log("Records from SQLite:", data);

    setRecords(data);
};

    useSync(loadRecords); // Custom hook to handle syncing when online

//   const onSubmit = (data: FormData) => {
//     Alert.alert("Success", JSON.stringify(data, null, 2));
//   };

const deleteRecord = (id: string) => {
  Alert.alert(
    "Delete Record",
    "Are you sure you want to delete this triage record?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          repository.delete(id);
          loadRecords();
        },
      },
    ]
  );
};

const onSubmit = (data: FormData) => {

    repository.save({

        id: uuid.v4().toString(),
        patientName: data.patientName,
        description: data.description,
        priority: data.priority,
        status: data.status,
        synced: false,
        createdAt: new Date().toISOString()

    });


    loadRecords();
    reset(); // Reset the form fields after submission

    Alert.alert("Saved locally");
};



  return (
  <FlatList
    data={records}
    keyExtractor={(item) => item.id}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}
    ListHeaderComponent={
      <>
        <Text style={styles.title}>
          Triage Submission Intake Form
        </Text>

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

        <SubmitButton
          onPress={handleSubmit(onSubmit)}
        />

        <Text style={styles.heading}>
          Saved Records
        </Text>
      </>
    }
    renderItem={({ item }) => (
      <TriageCard record={item} onDelete={deleteRecord}/>
    )}
    ListEmptyComponent={
      <Text style={styles.emptyText}>
        No records saved yet.
      </Text>
    }
  />
);
}

const styles = StyleSheet.create({
container: {
  padding: 20,
  paddingTop: 60,
  paddingBottom: 40,
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
  heading: {
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 30,
  marginBottom: 15,
},
 emptyText: {
  textAlign: "center",
  color: "gray",
  marginTop: 20,
},



});