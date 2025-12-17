export const pmmaConfig = {
  title: "PMMA",
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
    "machine",
    "jobname",
    "status",
    "manufacture",
  ],
  mappings: [
    {
      key: "patient",
      value: (patient, details) => {
        return {
          html: (
            <h2 className="leading-none text-[4mm] font-medium m-0 p-0">
              {patient}
            </h2>
          ),
          value: patient,
        };
      },
    },
    { key: "jobnumber", value: (ident) => ident },
    { key: "material", value: (ident) => "PMMA" },
    { key: "units", value: (ident) => ident },
    { key: "jobname", value: (ident) => ident },
    {
      key: "manufacture",
      value: (ident) => ident,
    },
  ],
};
