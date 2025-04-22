import crypto from 'node:crypto';

// const code39 = async (str: string) => {
//   const { data, message } = await symbology.createStream(
//     {
//       symbology: symbology.SymbologyType.CODE39,
//       showHumanReadableText: false,
//       height: 18,
//     },
//     str,
//     symbology.OutputType.SVG
//   );
//   const width = data?.match(/width="(\d+)"/)[1];
//   const height = data?.match(/height="(\d+)"/)[1];
//   return data
//     ?.replace(
//       '<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n   "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
//       ''
//     )
//     .replace(
//       '<svg ',
//       `<svg viewBox="0 0 ${width} ${height}" class="h-6 w-auto" `
//     )
//     .replace('<desc>Zint Generated Symbol\n   </desc>', '')
//     .replace(/\n/g, '')
//     .replace(/\ {2,}/g, '');
// };

// const Label: FC = async () => {
//   const ids = await Promise.all(
//     new Array(5).fill(0).map(async (d) => {
//       const id = crypto.randomBytes(3).toString('hex');
//       const data = await code39(id);
//       return {
//         id,
//         data,
//       };
//     })
//   );
//   return (
//     <section className="h-[48mm] w-[69mm] grid grid-rows-5 shadow rounded-md px-2 mb-4 bg-white text-black border-slate-100 border print:border-none print:shadow-none">
//       {ids.map((d) => (
//         <div className="flex flex-row justify-between items-center first:border-none border-t border-slate-100 ">
//           <p className="text-[6mm] font-normal font-mono uppercase">{d.id}</p>
//           <div
//             // dangerouslySetInnerHTML={{ __html: d.data || '<p>Error</p>' }}
//           ></div>
//         </div>
//       ))}
//     </section>
//   );
// };

// const MaterialLabel: FC = (props) => {
//   return (
//     <div x-data={''} className="">
//       <section className="mb-12 print:hidden">
//         <h2 className="uppercase leading-none text-xs tracking-widest text-opacity-60 text-white">
//           Material Labels
//         </h2>
//         <div className="flex flex-row gap-2 py-4">
//           <button
//             x-on:click="$refs.labels.hasChildNodes() && $refs.labels.removeChild($refs.labels.lastElementChild)"
//             className="px-2 py-1 cursor-pointer bg-purple-500 hover:bg-purple-600 active:bg-purple-700 rounded-full text-white text-md text-opacity-80 flex justify-around items-center shadow hover:shadow-lg active:shadow-sm transition-colors"
//           >
//             <span class="material-symbols-outlined text-base px-1">remove</span>
//             <span className="uppercase text-sm pr-2">remove</span>
//           </button>
//           <button
//             hx-get="/ui/add"
//             hx-swap="beforeend"
//             hx-target="#labels"
//             className="px-2 py-1 cursor-pointer bg-purple-500 hover:bg-purple-600 active:bg-purple-700 rounded-full text-white text-md text-opacity-80 flex justify-around items-center shadow hover:shadow-lg active:shadow-sm transition-colors"
//           >
//             <span class="material-symbols-outlined text-base px-1">add</span>
//             <span className="uppercase text-sm pr-2">add</span>
//           </button>
//         </div>
//       </section>
//       <section x-ref="labels" id="labels"></section>
//     </div>
//   );
// };

// export { MaterialLabel, Label };
