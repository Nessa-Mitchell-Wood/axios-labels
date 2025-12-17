import * as Qrcode from "qrcode";
import { html, raw } from "hono/html";

export const pngurlQR = async ({
  data,
}: {
  data: string;
  className?: string;
}) => {
  const url = await Qrcode.toDataURL(data, {
    margin: 0,
    errorCorrectionLevel: "L",
  });
  return url;
};
