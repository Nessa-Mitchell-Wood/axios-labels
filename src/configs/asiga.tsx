import { PatientTitle } from "./patient-title";

const patientMap = {
  "3DX Model": (patient) => <PatientTitle patient={patient} label="3D" />,
  KeyGuide: (patient) => <PatientTitle patient={patient} label="3D" />,
  "GIO Comfort": (patient) => <PatientTitle patient={patient} label="SP" />,
  "Study Model": (patient) => <PatientTitle patient={patient} label="ST" />,
  "CrownBridge Model": (patient) => (
    <PatientTitle patient={patient} label="CB" />
  ),
  "CrownBridge Model HeyGears": (patient) => (
    <PatientTitle patient={patient} label="CB" />
  ),
  "MouthGuard Model": (patient) => (
    <PatientTitle patient={patient} label="MG" />
  ),
  "Implant Gum": (patient) => <PatientTitle patient={patient} label="IM" />,
  "Implant Model": (patient) => <PatientTitle patient={patient} label="IM" />,
  "Pros Model": (patient) => <PatientTitle patient={patient} label="PR" />,
  "Splint Model": (patient) => <PatientTitle patient={patient} label="SP" />,
  Tray: (patient) => <PatientTitle patient={patient} label="TR" />,
};

const materialMap = {
  "3DX Model": "Model HP 2.0 UV Sand 50µm",
  "Study Model": "Model HP 2.0 UV Sand 100µm",
  "CrownBridge Model": "Model HP 2.0 UV Sand 50µm",
  "CrownBridge Model HeyGears": "Model HP 2.0 UV Sand 50µm",
  "Implant Gum": "Gingiva 2.0 UV 50µm",
  "Implant Model": "Model HP 2.0 UV Sand 50µm",
  "Pros Model": "Model HP 2.0 UV Sand 100µm",
  "Splint Model": "Model HP 2.0 UV Sand 100µm",
  KeyGuide: "Keystone KeyGuide 25µm",
  Tray: "Tray 3.0 UV Green 100µm",
  "GIO Comfort": "Voco Splint Comfort 100µm",
  biomodel: "3D Systems Visijet M2R-TN",
};

export const asigaConfig = {
  title: "Asiga",
  keys: [
    "jobnumber",
    "priority",
    "client",
    "patient",
    "units",
    "material",
    "notes",
    "due",
    "loading",
    "postprocessing",
    "status",
    "printer",
    "jobname",
    "plate",
    "manufacture",
    "id",
  ],
  mappings: [
    {
      key: "client",
      value: (i) => i,
    },
    {
      key: "notes",
      value: (i) => i,
    },
    {
      key: "patient",
      value: (patient, job) => {
        const pat = patient.replace(/_+/gi, " ");
        if (patientMap[job.material]) {
          return { html: patientMap[job.material](pat), value: pat };
        }
        return {
          html: (
            <h2 className="leading-none text-[4mm] font-medium m-0 p-0 capitalize">
              {pat}
            </h2>
          ),
          value: pat,
        };
      },
    },
    { key: "jobnumber", value: (ident) => ident },
    {
      key: "material",
      value: (material, job) => {
        console.log(job.jobname.split("-")[0]);
        if (job.printer === "Projet") {
          return materialMap["biomodel"];
        }
        return materialMap[material] ? materialMap[material] : material;
      },
    },
    { key: "units", value: (ident) => ident },
    {
      key: "jobname",
      value: (jobname, job) =>
        job.plate === "" ? jobname : `${jobname}-${job.plate}`,
    },
    {
      key: "manufacture",
      value: (ident) => ident,
    },
    {
      key: "id",
      value: (i) => i,
    },
  ],
  ordering: (a, b) => {
    return b.patient.value.localeCompare(a.patient.value);
  },
  labelKeys: [
    ["Client", "client"],
    ["Job", "jobnumber"],
    ["Material", "material"],
    ["Units", "units"],
    ["Job Name", "jobname"],
    ["Manufacture", "manufacture"],
    ["Notes", "notes"],
    ["id", "id"],
  ],
};
