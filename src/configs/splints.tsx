const materialMap = {
  CopraDur: "Whitepeaks CopraDur SPLINT",
  Polyflex: "Whitepeaks CopraPoly FLEX",
};

export const splintsConfig = {
  title: "Splints",
  keys: [
    "jobnumber",
    "priority",
    "client",
    "patient",
    "material",
    "units",
    "notes",
    "due",
    "loading",
    "status",
    "depth",
    "holder",
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
                SP
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
    { key: "jobnumber", value: (ident, details) => ident },
    {
      key: "material",
      value: (ident, details) =>
        materialMap[ident] ? materialMap[ident] : ident,
    },
    { key: "units", value: (ident, details) => ident },
    {
      key: "jobname",
      value: (ident, details) =>
        `${details.jobnumber}-${details.holder}-${details.depth}`,
    },
    { key: "manufacture", value: (ident, details) => ident },
  ],
};
