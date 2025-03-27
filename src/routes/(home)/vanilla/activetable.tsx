import { ActiveTable } from "active-table";
import "active-table";
import { Suspense } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "active-table": Partial<ActiveTable>;
    }
  }
}

export default function AGTable() {
  const data = [
    ["Planet", "Diameter", "Mass", "Moons", "Density"],
    ["Earth", 12756, 5.97, 1, 5514],
    ["Mars", 6792, 0.642, 2, 3934],
    ["Saturn", 120536, 568, 82, 687],
    ["Neptune", 49528, 102, 14, 1638],
  ];

  return (
    <>
      <div class="place-items-center py-15">
        <div>
          <Suspense>
            <active-table
              tableStyle={{
                borderRadius: "10px",
                boxShadow: "rgb(172 172 172 / 17%) 0px 0.5px 1px 0px",
                width: "100%",
              }}
              data={data}
            ></active-table>
          </Suspense>
        </div>
      </div>
    </>
  );
}
