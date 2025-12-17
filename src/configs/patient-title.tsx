import { FC } from "hono/jsx";

export const PatientTitle: FC<{ patient: string; label: string }> = ({
  patient,
  label,
}: {
  patient: string;
  label: string;
}) => {
  return (
    <div className="flex justify-center items-center gap-[2mm] h-[auto]">
      <div className="leading-none tracking-wide p-[1mm] border-[1mm] border-black rounded text-[6mm] font-black inline-block">
        {label}
      </div>
      <h2 className="leading-none text-[4mm] font-medium m-0 p-0">{patient}</h2>
    </div>
  );
};
