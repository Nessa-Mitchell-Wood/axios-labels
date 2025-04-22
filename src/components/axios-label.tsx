import { randomUUID } from 'crypto';
import { toDataURL } from 'qrcode';

const LabelDetail: FC<{ key: string; value: string; span: number }> = (props: {
  key: string;
  value: string;
  span: number;
}) => {
  return (
    <div className={`leading-none col-span-${props.span} mb-[1mm]`}>
      <h3 className="text-[2mm] uppercase opacity-60 pb-[0.5mm]">
        {props.key}
      </h3>
      <p className="text-[2mm] capitalize" x-text={props.value}></p>
    </div>
  );
};

const LabelRow: FC<{
  rowFields: { key: string; value: string; span: number }[];
}> = (props: { rowFields: { key: string; value: string; span: number }[] }) => {
  return (
    <div className="grid grid-cols-12">
      {props.rowFields.map((item, ind, arr) => {
        const { key, value, span } = item;
        return <LabelDetail {...{ key, value, span }} />;
      })}
    </div>
  );
};

const LabelRows: FC<{
  fields: { key: string; value: string; span: number }[][];
}> = (props: { fields: { key: string; value: string; span: number }[][] }) => {
  return (
    <>
      {props.fields.map((field) => {
        return <LabelRow rowFields={field} />;
      })}
    </>
  );
};

const AxiosLabel: FC<{
  specification: [{ key: string; value: string; span: number }][];
}> = async (props: {
  specification: [{ key: string; value: string; span: number }][];
}) => {
  return (
    <div className="bg-white rounded text-black p-[3mm] grid grid-rows-12 w-[69mm] h-[48.15mm] text-[4mm]">
      <div className="flex justify-between items-start gap-[4mm] row-span-5">
        <div className="">
          <img
            className="h-[3.5mm] mb-[1.75mm]"
            src="/static/assets/axios-logo-min.svg"
            alt=""
          />
          <h2
            className="font-bold mb-auto leading-none capitalize text-[3mm]"
            x-text="detail.patient"
          ></h2>
        </div>
        <img
          className="w-[12mm]"
          src={await toDataURL(randomUUID(), { margin: 0 })}
          alt=""
        />
      </div>
      <div className="row-span-7 items-end grid grid-cols-1">
        <LabelRows fields={props.specification} />
      </div>
    </div>
  );
};

export default AxiosLabel;
