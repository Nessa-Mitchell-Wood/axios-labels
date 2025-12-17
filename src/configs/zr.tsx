import { title } from "process";
import { PatientTitle } from "./patient-title";

export const zrConfig = {
  title: "Zr",
  keys: [
    "jobnumber",
    "priority",
    "client",
    "patient",
    "shade",
    "units",
    "notes",
    "due",
    "loading",
    "finishing",
    "machine",
    "holder",
    "pos1",
    "pos2",
    "pos3",
    "pos4",
    "pos5",
    "pos6",
    "jobname",
    "status",
    "manufacture",
  ],
  mappings: [
    {
      key: "patient",
      value: (patient) => ({
        html: <PatientTitle patient={patient} label="ZR" />,
        value: patient,
      }),
    },
    { key: "jobnumber", value: (ident) => ident },
    { key: "material", value: () => "Zr" },
    { key: "units", value: (ident) => ident },
    { key: "jobname", value: (ident) => ident },
    {
      key: "manufacture",
      value: (ident) => ident,
    },
  ],
  labelKeys: [
    ["Job", "jobnumber"],
    ["Material", "material"],
    ["Units", "units"],
    ["Job Name", "jobname"],
    ["Manufacture", "manufacture"],
  ],
};
