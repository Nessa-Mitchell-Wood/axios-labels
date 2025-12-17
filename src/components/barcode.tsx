import JsBarcode from "jsbarcode";

import { DOMImplementation, XMLSerializer } from "xmldom";

export function Barcode({ data }: { data: string }) {
  const xmlSerializer = new XMLSerializer();
  const document = new DOMImplementation().createDocument(
    "http://www.w3.org/1999/xhtml",
    "html",
    null
  );
  const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  JsBarcode(svgNode, data, {
    xmlDocument: document,
    format: "CODE128",
    height: 20,
    margin: 0,
    displayValue: false,
  });

  const svgText = xmlSerializer.serializeToString(svgNode);
  return (
    <div
      className="barcode"
      dangerouslySetInnerHTML={{ __html: svgText }}
    ></div>
  );
}
