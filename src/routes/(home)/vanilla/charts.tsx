import * as d3 from "d3";
import json from "./data.json";
import { createEffect } from "solid-js";

type JSonValue = typeof json;
export default function Chart() {
  let ref!: SVGSVGElement;
  let data: JSonValue = json;
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  createEffect(() => {
    // Declare the x (horizontal position) scale.
    const x = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          data,
          ([d]) => -d.frequency,
          (d) => d.letter,
        ),
      ) // descending frequency
      .range([marginLeft, width - marginRight])
      .padding(0.1);
    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear() //@ts-expect-error
      .domain([0, d3.max(data, (d) => d.frequency)])
      .range([height - marginBottom, marginTop]);
    // Create the SVG container.
    const svgElement = d3.select(ref);
    svgElement
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
    // Add a rect for each bar.
    svgElement
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(data)
      .join("rect") //@ts-expect-error
      .attr("x", (d) => x(d.letter))
      .attr("y", (d) => y(d.frequency))
      .attr("height", (d) => y(0) - y(d.frequency))
      .attr("width", x.bandwidth());
    // Add the x-axis and label.
    svgElement
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add the y-axis and label, and remove the domain line.
    svgElement
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency (%)"),
      );
  });
  return (
    <>
      <div class=" place-items-center py-10">
        <svg ref={ref}></svg>
      </div>
    </>
  );
}
