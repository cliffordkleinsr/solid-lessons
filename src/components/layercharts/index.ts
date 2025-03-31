import { select, Selection } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { max, groupSort } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleOrdinal } from "d3-scale";
import { pie, arc, PieArcDatum } from "d3-shape";
import { quantize } from "d3-interpolate";
import { interpolateSpectral } from "d3-scale-chromatic";

interface PieData {
  name: string;
  value: number;
}
interface BarData {
  letter: string;
  frequency: number;
}

function createBarchart(ref: SVGSVGElement, bar: BarData[]) {
  const data: BarData[] = bar;
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = scaleBand<string>()
    .domain(
      groupSort(
        data,
        ([d]) => -d.frequency,
        (d) => d.letter,
      ),
    ) // descending frequency
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  // Declare the y (vertical position) scale.
  const y = scaleLinear()
    .domain([0, max(data, (d) => d.frequency) ?? 0]) // Ensure max() does not return undefined
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svgElement = select(ref);
  svgElement
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bar.
  svgElement
    .append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.letter) ?? 0) // Ensure `x(d.letter)` is not undefined
    .attr("y", (d) => y(d.frequency))
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

  // Add the x-axis and label.
  svgElement
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(axisBottom(x).tickSizeOuter(0));

  // Add the y-axis and label, and remove the domain line.
  svgElement
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(axisLeft(y).tickFormat((y) => `${(Number(y) * 100).toFixed()}%`))
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
}

function createPieElement(ref: SVGSVGElement, piedat: PieData[]) {
  const data: PieData[] = piedat;
  const width = 928;
  const height = Math.min(width, 500);

  // Create the color scale.
  const color = scaleOrdinal<string, string>()
    .domain(data.map((d) => d.name))
    .range(
      quantize(
        (t) => interpolateSpectral(t * 0.8 + 0.1),
        data.length,
      ).reverse(),
    );

  const piec = pie<PieData>()
    .sort(null) // Correctly typed
    .value((d) => d.value);

  const arcc = arc<PieArcDatum<PieData>>()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  const labelRadius = (Math.min(width, height) / 2 - 1) * 0.8; // Corrected

  // A separate arc generator for labels.
  const arcLabel = arc<PieArcDatum<PieData>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = piec(data);

  const svgElement = select(ref);
  svgElement
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  svgElement
    .append("g")
    .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d) => color(d.data.name))
    .attr("d", arcc)
    .append("title")
    .text((d) => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

  // Create a new arc generator to place a label close to the edge.
  // The label shows the value if there is enough room.
  svgElement
    .append("g")
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
    .call((text) =>
      text
        .append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text((d) => d.data.name),
    )
    .call((text) =>
      text
        .filter((d) => d.endAngle - d.startAngle > 0.25)
        .append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text((d) => d.data.value.toLocaleString("en-US")),
    );
}

export { createPieElement, createBarchart };
