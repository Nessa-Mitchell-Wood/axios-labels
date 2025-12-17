import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Child, FC, PropsWithChildren } from "hono/jsx";
import { LabelTemplate } from "./components/label-template";
import { Config } from "./config";
import { createHash } from "node:crypto";
import { Barcode } from "./components/barcode";
import { pngurlQR } from "./components/dataQr";

const { signature } = process.env;
const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

function Page({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <html lang="en" className="bg-slate-950">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/static/css/material-icons.css" />
        <link rel="stylesheet" href="/static/css/main.css" />
        <script src="/static/js/htmx.js" defer></script>
        <script src="/static/js/alpine.js" defer></script>
        <script src="/static/js/fluid.js" defer></script>
      </head>
      <body className="min-h-dvh  text-white text-opacity-80 relativ bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="h-dvh w-full absolute z-0 opacity-50 blur-3xl">
          <canvas id="fluid" className="w-full h-full"></canvas>
        </div>
        <div className="hidden">
          <div className="col-span-1"></div>
          <div className="col-span-2"></div>
          <div className="col-span-3"></div>
          <div className="col-span-4"></div>
          <div className="col-span-5"></div>
          <div className="col-span-6"></div>
          <div className="col-span-7"></div>
          <div className="col-span-8"></div>
          <div className="col-span-9"></div>
          <div className="col-span-10"></div>
          <div className="col-span-11"></div>
          <div className="col-span-12"></div>
        </div>
        <div className="relative z-10">
          <header className="bg-slate-950 bg-opacity-40 py-12 shadow print:hidden">
            <div className="container max-w-xl m-auto px-4 flex flex-row gap-4 justify-between items-center">
              <h1 className="font-thin text-2xl leading-none">Label Maker</h1>
              <img
                className="h-8 brightness-0 invert"
                src="/static/assets/axios-logo.svg"
                alt=""
                srcset=""
              />
            </div>
          </header>
          <div className="container max-w-xl m-auto py-12 px-4 print:p-0 print:m-0 print:max-w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

app.get("/", (c) => {
  const processes = [
    "Asiga",
    "Splints",
    "Projet",
    "Emax",
    "Zr",
    "Wax",
    "PMMA",
    "Sintec",
    "CoCr",
    "Ti",
  ];
  return c.html(
    <Page title="Label Maker">
      <div className="flex flex-wrap justify-center gap-2 print:hidden">
        {processes.map((process) => {
          return (
            <button
              hx-get={`/label/${process.toLowerCase()}`}
              hx-target="#label-app-container"
              hx-swap="innerHTML"
              className="transition-all border border-transparent bg-purple-500 hover:bg-purple-600 active:bg-white active:text-purple-500 active:border-purple-500 px-4 py-2 min-w-24 rounded-full leading-none"
            >
              {process}
            </button>
          );
        })}
      </div>
      <div id="label-app-container" className="py-8 print:p-0"></div>
    </Page>
  );
});

const labelMap = new Map([
  ["asiga", <LabelTemplate {...Config.asiga} />],
  ["splints", <LabelTemplate {...Config.splints} />],
  ["projet", <LabelTemplate {...Config.projet} />],
  ["emax", <LabelTemplate {...Config.emax} />],
  ["zr", <LabelTemplate {...Config.zr} />],
  ["wax", <LabelTemplate {...Config.wax} />],
  ["sintec", <LabelTemplate {...Config.sintec} />],
  ["pmma", <LabelTemplate {...Config.pmma} />],
  ["cocr", <LabelTemplate {...Config.cocr} />],
  ["ti", <LabelTemplate {...Config.ti} />],
]);

app.get("/label/:process", (c) => {
  const process = c.req.param("process");
  return c.html(
    <>
      {labelMap.has(process) ? (
        labelMap.get(process)
      ) : (
        <p className="text-red-500 border-red-500 bg-red-200 rounded-full border shadow py-2 px-8">{`Error: Whoops! Looks like ${process} isn't a thing...`}</p>
      )}
    </>
  );
});

const JobQR: FC<{
  jobnumber: string;
  patient: {
    html: Child;
    value: string;
  };
  material: string;
  units: string;
  jobname: string;
  manufacture: string;
}> = async ({
  jobnumber,
  patient,
  material,
  units,
  jobname,
  manufacture,
}: {
  jobnumber: string;
  patient: {
    html: Child;
    value: string;
  };
  material: string;
  units: string;
  jobname: string;
  manufacture: string;
}) => {
  const data = [
    jobnumber,
    patient.value,
    material,
    units,
    jobname,
    manufacture,
  ].map((d) => d.replace(/,/gi, ""));
  const hash = createHash("md5")
    .update(JSON.stringify(data))
    .update(signature)
    .digest("hex");
  const payload = [...data, hash].join(",");
  const url = await pngurlQR({ data: payload });
  return <img src={url} className="h-[18mm] w-auto" />;
};

const Logo: FC = () => (
  <img
    className="h-[4mm] mb-[0.5mm]"
    src="/static/assets/axios-logo.svg"
    alt=""
  />
);

app.post("/:process/labels", async (c) => {
  const process = c.req.param("process");
  const body = await c.req.formData();
  const jobs = (body.get("labelData") as string).split("\n");
  const { keys, mappings, ordering, labelKeys } = Config[process];
  const label_keys = labelKeys || [
    ["Job", "jobnumber"],
    ["Material", "material"],
    ["Units", "units"],
    ["Job Name", "jobname"],
    ["Manufacture", "manufacture"],
  ];
  const mappedJobs = jobs
    .map((job) => {
      const jobFields = job.split("\t");
      return keys.reduce((j, key, index) => {
        j[key] = jobFields[index] || "";
        return j;
      }, {});
    })
    .map((job) => {
      return mappings.reduce((acc, mapping) => {
        acc[mapping.key] = mapping.value(job[mapping.key], job);
        return acc;
      }, {});
    })
    .sort(ordering);

  return c.html(
    <div className="">
      {mappedJobs.map(async (mappedJob) => {
        const { patient, jobnumber, material, units, jobname, manufacture } =
          mappedJob;
        return (
          <div className="bg-white w-[69mm] h-[48mm] rounded text-black p-[3mm] text-[3mm] flex flex-col justify-between mb-4">
            <div className="flex justify-between gap-[2mm] items-start">
              <div className="">
                <Logo />
                <div className="mt-[2mm]">{patient.html}</div>
              </div>
              <JobQR
                {...{
                  patient,
                  jobnumber,
                  material,
                  units,
                  jobname,
                  manufacture,
                }}
              />
            </div>
            <div className="mt-auto">
              <div className="flex gap-[1.5mm] flex-wrap justify-start">
                {label_keys.map((key, index) => {
                  if (key[0] === "id") {
                    return <Barcode data={mappedJob[key[0]]} />;
                  } else {
                    return (
                      <div className="min-w-[8mm] leading-none">
                        <h3 className="uppercase text-[2mm] mb-[0.5mm]">
                          {key[0]}
                        </h3>
                        <p className="capitalize text-[2.5mm]">
                          {mappedJob[key[1]]}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

const server = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => console.log(`Running Axios Labels on port ${info.port}...`)
);

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
