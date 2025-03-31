import bar from "./data.json";
import piedat from "./pie.json";
import { createEffect, onCleanup } from "solid-js";
import { select } from "d3-selection";

import { Component } from "solid-js";
import { createBarchart, createPieElement } from "~/components/layercharts";

const ChartPrimitive: Component<{
  createChart: (el: SVGSVGElement) => void;
}> = (props) => {
  let svgRef!: SVGSVGElement;

  createEffect(() => {
    props.createChart(svgRef);
  });

  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
};

export default function Chart() {
  return (
    <>
      <div class=" place-items-center py-10">
        <div class="grid gap-2">
          <h1 class="text-2xl">Bar Chart Example</h1>
          <ChartPrimitive createChart={(el) => createBarchart(el, bar)} />
          <h1 class="text-2xl">Pie Chart Example</h1>
          <ChartPrimitive createChart={(el) => createPieElement(el, piedat)} />
        </div>
      </div>
    </>
  );
}
