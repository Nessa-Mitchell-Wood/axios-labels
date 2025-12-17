export const projetConfig = {
  title: "projet",
  keys: [
    "jobnumber",
    "priority",
    "client",
    "patient",
    "units",
    "notes",
    "due",
    "loading",
    "post",
    "status",
    "models",
    "dies",
    "machine",
    "jobname",
    "manufacture",
  ],
  mappings: [
    {
      key: "patient",
      value: (patient, details) => {
        return {
          html: (
            <div className="flex justify-center items-center gap-[2mm] h-[auto]">
              <div className="leading-none tracking-wide p-[1mm] border-[1mm] border-black rounded text-[6mm] font-black inline-block">
                CB
              </div>
              <h2 className="leading-none text-[4mm] font-medium m-0 p-0">
                {patient}
              </h2>
            </div>
          ),
          value: patient,
        };
      },
    },
    { key: "jobnumber", value: (ident) => ident },
    { key: "material", value: () => "3D Systems Visijet M2R-TN" },
    { key: "units", value: (ident) => ident },
    { key: "jobname", value: (jobname, job) => `${job.machine}-${jobname}` },
    {
      key: "manufacture",
      value: (ident) => ident,
    },
  ],
  ordering: (a, b) => {
    return b.patient.value.localeCompare(a.patient.value);
  },
  labelKeys: [
    ["Job", "jobnumber"],
    ["Material", "material"],
    ["Units", "units"],
    ["Job Name", "jobname"],
    ["Manufacture", "manufacture"],
  ],
};
