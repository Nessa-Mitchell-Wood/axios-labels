export const tiConfig = {
  title: "Ti",
  keys: [
    "jobnumber",
    "priority",
    "client",
    "patient",
    "classification",
    "units",
    "notes",
    "due",
    "loading",
    "finishing",
    "jobfile",
    "status",
    "manufacturedate",
  ],
  mappings: [
    { key: "patient", value: (ident) => ident },
    { key: "jobnumber", value: (ident) => ident },
    { key: "classification", value: (ident) => ident },
    { key: "units", value: (ident) => ident },
    { key: "jobfile", value: (ident) => ident },
    {
      key: "manufacturedate",
      value: (ident) => ident,
    },
  ],
};
