import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { FC, PropsWithChildren } from 'hono/jsx';
import { LabelTemplate } from './components/label-template';
import { Config } from './config';
import { toDataURL } from 'qrcode';
import { randomUUID } from 'node:crypto';
// import { MaterialLabel, Label } from './components/material-label';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));

const Page: FC<{ title: string }> = (
  props: PropsWithChildren<{ title: string }>
) => {
  return (
    <html lang="en" className="bg-slate-950">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
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
            {props.children}
          </div>
        </div>
      </body>
    </html>
  );
};

app.get('/', (c) => {
  const processes = [
    'Asiga',
    'Splints',
    'Projet',
    'Emax',
    'Zr',
    'Wax',
    'PMMA',
    'Sintec',
    'CoCr',
    'Ti',
    'Material',
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
  ['asiga', <LabelTemplate {...Config.asiga} />],
  ['splints', <LabelTemplate {...Config.splints} />],
  ['projet', <LabelTemplate {...Config.projet} />],
  ['emax', <LabelTemplate {...Config.emax} />],
  ['zr', <LabelTemplate {...Config.zr} />],
  ['wax', <LabelTemplate {...Config.wax} />],
  ['sintec', <LabelTemplate {...Config.sintec} />],
  ['pmma', <LabelTemplate {...Config.pmma} />],
  ['cocr', <LabelTemplate {...Config.cocr} />],
  ['ti', <LabelTemplate {...Config.ti} />],
  // ['material', <MaterialLabel />],
]);

app.get('/label/:process', (c) => {
  const process = c.req.param('process');
  console.log({ process });
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

app.post('/:process/labels', async (c) => {
  const process = c.req.param('process');
  const body = await c.req.formData();
  console.log(body);
  const jobs = body.get('labelData').split('\n');
  const jobObjects = jobs.map((job) => {
    const jobFields = job.split('\t');
    return Config[process].keys.reduce((j, key, index) => {
      j[key] = jobFields[index];
      return j;
    }, {});
  });
  return c.html(
    <div className="">
      {jobObjects.map(async (job) => {
        const {
          patient,
          job: jobnumber,
          material,
          units,
          run: jobname,
          manufacture,
        } = job;
        const keys = [
          'job number',
          'material',
          'units',
          'job name',
          'manufacture',
        ];
        return (
          <div className="bg-white w-[69mm] h-[48mm] rounded text-black p-[4mm] text-[3mm] mb-4 flex flex-col justify-between">
            <div className="flex justify-between gap-[2mm] items-start mb-[4mm]">
              <div className="">
                <img
                  className="h-[4mm] mb-[0.5mm]"
                  src="/static/assets/axios-logo.svg"
                  alt=""
                />
                <h2 className="capitalize text-[4mm] font-bold">
                  {patient.toLowerCase().replace(',', '').replace(/\w\(/, ' (')}
                </h2>
              </div>
              <img
                className="h-[4.768em] w-auto"
                src={await toDataURL(
                  JSON.stringify({
                    jobnumber,
                    patient,
                    material: material || process,
                    units,
                    jobname: jobname || randomUUID().split('-').slice(-1),
                    manufacture:
                      manufacture || new Date().toLocaleDateString('en-au'),
                  }),
                  {
                    margin: 0,
                    errorCorrectionLevel: 'L',
                  }
                )}
                alt=""
              />
            </div>
            <div className="">
              <div className="flex gap-[3mm] flex-wrap items-end">
                {[
                  jobnumber,
                  material || process,
                  units,
                  jobname,
                  manufacture,
                ].map((d, index) => {
                  return (
                    <div className="min-w-[18mm]">
                      <h3 className="uppercase text-[2mm]">{keys[index]}</h3>
                      <p className="capitalize text-[2.5mm]">{d}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

app.get('/ui/add', (c) => {
  return c.html(<Label />);
});

serve({
  fetch: app.fetch,
  port: 3000,
});
