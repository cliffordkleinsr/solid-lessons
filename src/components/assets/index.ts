import resource from "./planets.json";

type Planets = typeof resource;
export const planets: Planets = resource;
