import { Component, createEffect, createSignal, For, Show } from "solid-js";

const SharedLayout: Component<{}> = (props) => {
  const allIngredients = [
    { icon: "🍅", label: "Tomato" },
    { icon: "🥬", label: "Lettuce" },
    { icon: "🧀", label: "Cheese" },
  ];
  const [selectedTab, setTab] = createSignal(allIngredients[0]);
  const [show, setshow] = createSignal(false);
  const [previousTabIndex, setPreviousTabIndex] = createSignal(-1); // Store the index of the previous tab
  const [animationDirection, setAnimationDirection] = createSignal("none"); // 'left', 'right', or 'none'/'initial'

  createEffect(() => {
    if (show()) {
      setTimeout(() => setshow((prev) => !prev), 450);
    }
  });
  // Helper function to find index (if not using <Index>)
  const findTabIndex = (tab: { icon: string; label: string }) =>
    allIngredients.findIndex((item) => item === tab);

  const handleTabClick = (
    tab: { icon: string; label: string },
    newIndex: number,
  ) => {
    const currentSelectedTab = selectedTab();
    if (tab === currentSelectedTab) return; // Don't do anything if clicking the already selected tab

    const currentIndex = findTabIndex(currentSelectedTab);
    setPreviousTabIndex(currentIndex); // Store the index *before* updating

    // Determine animation direction
    if (currentIndex === -1) {
      // Handle initial selection case
      setAnimationDirection("initial"); // Or 'right' as a default
    } else if (newIndex > currentIndex) {
      setAnimationDirection("right"); // New tab is to the right
    } else {
      setAnimationDirection("left"); // New tab is to the left
    }

    setshow((prev) => (prev = true));
    setTab(tab); // Update the selected tab
  };
  return (
    <div class="w-[480px] h-[60vh] max-h-[360px] rounded-md bg-white overflow-hidden shadow-lg flex flex-col">
      <nav class="bg-[#fdfdfd] p-1.5 rounded-md border-b border-[#eeeeee] h-11">
        <ul class="flex gap-2 p-0 m-0">
          <For each={allIngredients}>
            {(tab, index) => (
              <li
                class=" rounded-lg w-full p-3.5 relative cursor-pointer h-10 flex justify-between items-center flex-1 min-w-0 select-none text-[#0f1115]"
                classList={{
                  "bg-stone-200 ": tab === selectedTab(),
                  "bg-white": tab !== selectedTab(),
                }}
                onClick={() => handleTabClick(tab, index())}
              >
                {tab.icon} {tab.label}
                <Show when={tab === selectedTab()}>
                  <div
                    class=" absolute -bottom-2 left-0 right-0 h-[1px] bg-teal-400 motion-translate-y-in-100"
                    classList={{
                      // Apply animation based on direction
                      "-motion-translate-x-in-100":
                        animationDirection() === "right",
                      "motion-translate-x-in-100":
                        animationDirection() === "left",
                    }}
                  ></div>
                </Show>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <main class=" flex justify-center items-center flex-1">
        <div
          class="text-9xl"
          classList={{
            "motion-translate-y-in-100 motion-opacity-in-0 motion-blur-in-md":
              show(),
          }}
        >
          {selectedTab().icon}
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
