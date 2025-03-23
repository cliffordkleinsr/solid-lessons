import { Link, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { Component } from "solid-js";
import Counter from "~/components/Counter";

const Hero: Component<{}> = (props) => {
  return (
    <>
      <main class="overflow-hidden">
        <section class="relative">
          <div class="relative py-24 lg:py-28">
            <div class="mx-auto max-w-7xl px-6 md:px-12">
              <div class="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
                <h1 class="mt-8 text-4xl font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125]">
                  SolidJS Tutorial <br /> for Fullstack Development
                </h1>
                <p class="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
                  This is my attempt at understanding the solids tandard
                  metaframework
                </p>
                <p class="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
                  Highly customizable components for building modern websites
                  and applications, with your personal spark.
                </p>

                <div class="mt-8">
                  <button class="btn rounded-md">
                    <A href="/about">
                      <span class="text-nowrap">Start Building</span>
                    </A>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default function Home() {
  return (
    <>
      <Title>Home</Title>
      <Hero />
    </>
  );
}
