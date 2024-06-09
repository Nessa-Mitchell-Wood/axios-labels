const LabelDetail: FC<{ key: string; value: string; span: number }> = (props: {
  key: string;
  value: string;
  span: number;
}) => {
  return (
    <div className={`leading-none col-span-${props.span}`}>
      <h3 className="text-[2mm] uppercase opacity-60 pb-[0.5mm]">
        {props.key}
      </h3>
      <p className="text-[3mm]" x-text={props.value}></p>
    </div>
  );
};

const LabelRow: FC<{
  rowFields: { key: string; value: string; span: number }[];
}> = (props: { rowFields: { key: string; value: string; span: number }[] }) => {
  return (
    <div className="grid grid-cols-12 items-center">
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
}> = (props: {
  specification: [{ key: string; value: string; span: number }][];
}) => {
  return (
    <div className="bg-white rounded text-black p-[3mm] grid grid-rows-4 w-[69mm] h-[48.15mm] text-[4mm]">
      <div className="flex justify-between items-center gap-[4mm]">
        <h2
          className="font-bold mb-auto leading-none"
          x-text="detail.patient"
        ></h2>
        <img
          className="h-[5mm] brightness-0 mb-auto"
          src="/static/assets/axios-logo.svg"
        />
      </div>
      <LabelRows fields={props.specification} />
    </div>
  );
};

export default AxiosLabel;
