import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Triage } from "../models/triage";

interface Props {
  record: Triage;
    onDelete: (id: string) => void;

}

export default function TriageCard({ record, onDelete }: Props) {
  const priorityColor = {
    1: "#8B0000",
    2: "#FF6B00",
    3: "#FFD600",
    4: "#2E7D32",
    5: "#1565C0",
  };



  return (
    <View style={styles.card}>
      <View
        style={[
          styles.priorityBar,
          {
            backgroundColor:
              priorityColor[
                record.priority as keyof typeof priorityColor
              ],
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.name}>{record.patientName}</Text>

        <Text>{record.description}</Text>

        <Text>Priority: {record.priority}</Text>

        <Text>Status: {record.status}</Text>

        <Text
          style={{
            color: record.synced ? "green" : "orange",
            marginTop: 6,
            fontWeight: "bold",
          }}
        >
          {record.synced ? "✓ Synced" : "Pending Sync"}
        </Text>

          <TouchableOpacity
  style={styles.deleteButton}
  onPress={() => onDelete(record.id)}
>
  <Text style={styles.deleteText}>
    Delete
  </Text>
</TouchableOpacity>
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    overflow: "hidden",
  },

  priorityBar: {
    width: 8,
  },

  content: {
    flex: 1,
    padding: 15,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },

  deleteButton: {
  marginTop: 12,
  backgroundColor: "#DC3545",
  paddingVertical: 10,
  borderRadius: 8,
  alignItems: "center",
},

deleteText: {
  color: "white",
  fontWeight: "bold",
},
});