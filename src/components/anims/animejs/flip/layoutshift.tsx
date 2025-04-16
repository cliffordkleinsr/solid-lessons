import {
  createContext,
  FlowProps,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { createStore, SetStoreFunction } from "solid-js/store";
import { copyTransformFromRect } from "./utils";
import { MotionLayoutContextValue, SourceData } from "./types";
import { eases, waapi } from "animejs";
import { Dynamic } from "solid-js/web";

const MotionLayoutContext = createContext<MotionLayoutContextValue>({
  sourceData: {},
  setSourceData: () => {},
});

export function MotionLayoutProvider(props: FlowProps) {
  const [sourceData, setSourceData] = createStore<Partial<SourceData>>({});

  return (
    <MotionLayoutContext.Provider
      value={{
        sourceData: sourceData,
        setSourceData: setSourceData,
      }}
    >
      {props.children}
    </MotionLayoutContext.Provider>
  );
}

function element<T extends keyof JSX.IntrinsicElements>(elementType: T) {
  return function FlippableElement(
    props: JSX.IntrinsicElements[T] & { ref?: any },
  ) {
    const { sourceData, setSourceData } = useContext(MotionLayoutContext);
    let srcRef!: HTMLElement;

    onMount(() => {
      if (sourceData.borderRadius && sourceData.domRect) {
        const transform = copyTransformFromRect(
          {
            borderRadius: sourceData.borderRadius,
            domRect: sourceData.domRect,
          },
          srcRef,
        );

        const original = {
          borderRadius: getComputedStyle(srcRef).borderRadius,
        };

        waapi.animate(srcRef, {
          scaleX: [transform.scaleX, 1],
          scaleY: [transform.scaleY, 1],
          x: [transform.translateX, 0],
          y: [transform.translateY, 0],
          borderRadius: [sourceData.borderRadius, original.borderRadius],
          ease: eases.outBack(1),
          duration: 400,
        });
      }
    });

    onCleanup(() => {
      if (srcRef) {
        const borderRadius = getComputedStyle(srcRef).borderRadius;

        setSourceData({
          borderRadius: borderRadius,
          domRect: srcRef.getBoundingClientRect(),
        });
      }
    });

    // Create a ref handler that merges our internal ref with any provided ref
    const setRef = (el: HTMLElement) => {
      srcRef = el;
      if (props.ref) {
        if (typeof props.ref === "function") {
          props.ref(el);
        } else if (props.ref && "current" in props.ref) {
          props.ref.current = el;
        }
      }
    };

    // Create a new props object without the ref to avoid React warnings
    const { ref, ...restProps } = props;

    // Create the element with the specified type
    return (
      // @ts-ignore
      <Dynamic component={elementType} ref={setRef} {...restProps}>
        {props.children}
      </Dynamic>
    );
  };
}

// Create pre-defined components for common HTML elements
export const flippa = {
  div: element("div"),
  span: element("span"),
  button: element("button"),
  a: element("a"),
  section: element("section"),
  article: element("article"),
  // Add more element types as needed

  // Generic function to create custom flippable elements on demand
  create: element,
};
