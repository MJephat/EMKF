import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Triage } from "../models/triage";

interface TriageState {

    records: Triage[];

}

const initialState: TriageState = {

    records: [],

};

const triageSlice = createSlice({

    name: "triage",

    initialState,

    reducers: {

        addRecord: (state, action: PayloadAction<Triage>) => {

            state.records.push(action.payload);

        },

        setRecords: (state, action: PayloadAction<Triage[]>) => {

            state.records = action.payload;

        },

    },

});

export const { addRecord, setRecords } = triageSlice.actions;

export default triageSlice.reducer;