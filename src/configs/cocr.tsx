export const cocrConfig = {
  title: "CoCr",
  keys: [
    "jobnumber",
    "priority",
    "client",
    "patient",
    "units",
    "notes",
    "due",
    "loading",
    "finishing",
    "jobname",
    "position",
    "status",
    "manufacture",
  ],
  mappings: [
    {
      key: "patient",
      value: (patient, details) => {
        return {
          html: (
            <h2 className="leading-none text-[4mm] font-medium m-0 p-0 capitalize">
              {patient}
            </h2>
          ),
          value: patient,
        };
      },
    },
    { key: "jobnumber", value: (ident) => ident },
    { key: "material", value: () => "CoCr" },
    { key: "units", value: (ident) => ident },
    { key: "jobname", value: (ident) => ident },
    {
      key: "manufacture",
      value: (ident) => ident,
    },
    { key: "notes", value: (note) => (note ? note : "") },
  ],
  labelKeys: [
    ["Job", "jobnumber"],
    ["Material", "material"],
    ["Units", "units"],
    ["Job Name", "jobname"],
    ["Manufacture", "manufacture"],
    ["Notes", "notes"],
  ],
};
