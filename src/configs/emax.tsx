import { PatientTitle } from "./patient-title";

export const emaxConfig = {
  title: "Emax",
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
    "position",
    "jobname",
    "status",
    "manufacture",
  ],
  mappings: [
    { key: "client", value: (i) => i },
    {
      key: "patient",
      value: (patient) => ({
        html: <PatientTitle patient={patient} label="EM" />,
        value: patient,
      }),
    },
    { key: "jobnumber", value: (ident) => ident },
    { key: "material", value: () => "Ivoclar IPS Emax C14" },
    { key: "units", value: (ident) => ident },
    { key: "jobname", value: (ident) => ident },
    {
      key: "manufacture",
      value: (ident) => ident,
    },
    { key: "shade", value: (ident) => ident },
    { key: "position", value: (ident) => ident },
  ],
  labelKeys: [
    ["Job", "jobnumber"],
    ["Material", "material"],
    ["Units", "units"],
    ["Job Name", "jobname"],
    ["Manufacture", "manufacture"],
    ["Shade", "shade"],
    ["Position", "position"],
  ],
};
