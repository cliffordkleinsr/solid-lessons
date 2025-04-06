import { useParams } from "@solidjs/router";
import { For, Show } from "solid-js";
import { planets } from "~/components/assets";
import "./Planet.css";
export default function Planet() {
  const params = useParams();
  const planet = planets.find(
    (planet) => planet.name.toLowerCase() === params.planet.toLocaleLowerCase(),
  );
  return (
    <Show when={planet} keyed>
      {(planet) => (
        <div class="container">
          <div class="description">
            <img
              id="cover"
              src={planet.image}
              alt={planet.name}
              data-flip-id={`cover-${planet.name}`}
            />
            <h1
              id="title"
              style={{ "--title": `title-${planet.name}` }}
              data-flip-id={`title-${planet.name}`}
            >
              {planet.name}
            </h1>
            <p>{planet.description}</p>

            <div class="details">
              <For each={planet.details}>
                {({ title, value }) => (
                  <div class="item">
                    <div>{title}</div>
                    <div>{value}</div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
