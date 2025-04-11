import { Component, createEffect, createSignal, For, onMount } from "solid-js";
import "./AdvancedFlip.css";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { carousel_items } from "./carousel";

const AdvancedFlip: Component<{}> = (props) => {
  let details!: HTMLDivElement,
    content!: HTMLDivElement,
    det_img!: HTMLImageElement,
    det_title!: HTMLDivElement,
    det_sec!: HTMLDivElement,
    det_desc!: HTMLDivElement;

  const [activeItem, setActiveItem] = createSignal<
    HTMLDivElement | undefined
  >();

  createEffect(() => {
    gsap.registerPlugin(Flip);
    const items: HTMLDivElement[] = gsap.utils.toArray(".item");
    gsap.set(content, { yPercent: -100 });
    // function
    function showDetails(item: HTMLDivElement) {
      // someone could click on an element behind the open details
      //  panel in which case we should just close it.
      if (activeItem()) {
        return hideDetails();
      }

      const onLoad = () => {
        // position the details on top of the item (scaled down)
        Flip.fit(details, item, {
          scale: true,
          fitChild: det_img,
        });
        // record the state
        const state = Flip.getState(details);
        // set the final state
        // wipe out all inline stuff so
        // it's in the native state (not scaled)
        gsap.set(details, { clearProps: true });
        gsap.set(details, {
          xPercent: -50,
          top: "50%",
          yPercent: -50,
          visibility: "visible",
          overflow: "hidden",
        });
        //  Flip.from() returns a timeline,
        //  so add a tween to reveal the detail content.
        //  That way, if the flip gets interrupted and forced
        //  to completion & killed, this does too.
        Flip.from(state, {
          duration: 0.5,
          ease: "power2.inOut",
          scale: true,
          onComplete: () => {
            // to permit scrolling if necessary
            gsap.set(details, { overflow: "auto" });
          },
        }).to(content, { yPercent: 0 }, 0.2);

        det_img.removeEventListener("load", onLoad);
        document.addEventListener("click", hideDetails);
      };
      if (!item.dataset.title || !item.dataset.secondary || !item.dataset.text)
        return;
      const title: string = item.dataset.title;
      const secondary: string = item.dataset.secondary;
      const text: string = item.dataset.text;
      det_img.addEventListener("load", onLoad);
      det_img.src = item.querySelector("img")?.src ?? "";
      det_title.innerText = title;
      det_sec.innerText = secondary;
      det_desc.innerText = text;

      // stagger-fade the items out from the one that
      // was selected in a staggered way
      // (and kill the tween of the selected item)
      gsap
        .to(items, {
          opacity: 0.3,
          stagger: {
            amount: 0.7,
            from: items.indexOf(item),
            grid: "auto",
          },
        })
        .kill(item);
      // fade out the background
      gsap.to(".app_gallery", {
        backgroundColor: "#888",
        duration: 1,
        delay: 0.3,
      });
      setActiveItem(item);
    }

    function hideDetails() {
      document.removeEventListener("click", hideDetails);
      gsap.set(details, { overflow: "hidden" });
      if (!activeItem()) return;
      // record the current state of details
      const state = Flip.getState(details);
      // scale details down so that its detailImage
      //  fits exactly on top of activeItem
      Flip.fit(details, activeItem() as HTMLDivElement, {
        scale: true,
        fitChild: det_img,
      });
      // animate the other elements,
      //  like all fade all items back up to full opacity,
      //  slide the detailContent away,
      //  and tween the background color to white.
      const tl = gsap.timeline();
      tl.set(details, { overflow: "hidden" })
        .to(content, { yPercent: -100 })
        .to(items, {
          opacity: 1,
          stagger: {
            amount: 0.2,
            from: items.indexOf(activeItem() as HTMLDivElement),
            grid: "auto",
          },
        })
        .to(".app_gallery", { backgroundColor: "#fff" }, "<");
      // animate from the original state to the current one.
      Flip.from(state, {
        scale: true,
        duration: 0.5,
        delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
        onInterrupt: () => {
          tl.kill();
        },
      }).set(details, { visibility: "hidden" });

      setActiveItem(undefined);
    }
    // click eventListener
    items.forEach((item) => {
      // console.log(item)
      item.addEventListener("click", () => {
        showDetails(item);
      });
    });
    // intro animation
    gsap.to(".app_gallery", { autoAlpha: 1, duration: 0.2 });
    gsap.from(items, { autoAlpha: 0, yPercent: 30, stagger: 0.04 });
  });
  return (
    <>
      <div class="app_gallery">
        <div class="gallery">
          <For each={carousel_items}>
            {(item) => (
              <div
                class="item"
                data-title={item.title}
                data-secondary={item.secondary}
                data-text={item.text}
              >
                <img src={item.img} alt={item.title} />
              </div>
            )}
          </For>
        </div>
      </div>

      <div class="detail" ref={details}>
        <img ref={det_img} />

        <div class="content" ref={content}>
          <div class="title" ref={det_title}>
            Placeholder title
          </div>
          <div class="secondary" ref={det_sec}>
            Placeholder secondary
          </div>
          <div class="description" ref={det_desc}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum,
            est amet delectus, blanditiis voluptatem laborum pariatur
            consequatur quae voluptate, nisi. Laborum adipisci iste earum
            distinctio, fugit, quas ipsa impedit.
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFlip;
