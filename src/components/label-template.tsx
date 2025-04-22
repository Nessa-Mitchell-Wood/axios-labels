import AxiosLabel from './axios-label';

type Template = {
  title: string;
  keys: string[];
  update: Function;
  specification: { key: String; value: string; span: number }[][];
};

export const LabelTemplate: FC<Template> = (props: Template) => {
  const alpineData = `{
      keys: [
        ${props.keys.map((d) => `'${d}'`).join(',')}
      ],
      text: '',
      details: [],
      ${props.update.toString().replace('function ', '')},
    }`
    .split('  ')
    .map((d) => d.trim())
    .join('');
  return (
    <div>
      <form
        className="flex flex-col gap-4 w-full print:hidden"
        hx-swap="innerHTML"
        hx-trigger="change"
        hx-target="#labels"
        hx-post={`/${props.title.toLowerCase()}/labels`}
      >
        <label
          className="uppercase leading-none text-xs tracking-widest text-opacity-60 text-white"
          htmlFor="#inputarea"
        >
          {props.title}
        </label>
        <textarea
          className="bg-white text-black rounded h-8 text-xs p-2 opacity-80"
          name="labelData"
        ></textarea>
      </form>
      <div
        id="labels"
        className="flex flex-row flex-wrap gap-4 justify-center print:block opacity-80 print:opacity-100"
      ></div>
    </div>
  );
};
