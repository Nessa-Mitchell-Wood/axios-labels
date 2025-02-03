import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { FC, PropsWithChildren } from 'hono/jsx';
import { LabelTemplate } from './components/label-template';
import { Config } from './config';
import { MaterialLabel, Label } from './components/material-label';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));

const Page: FC<{title: string}> = (props:PropsWithChildren<{title:string}>) => {
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
  ['material', <MaterialLabel />],
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

app.get('/ui/add', (c) => {
  return c.html(<Label />);
});

serve({
  fetch: app.fetch,
  port: 3000,
});
