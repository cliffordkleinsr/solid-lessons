import {
  createContext,
  FlowProps,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { createStore, SetStoreFunction } from "solid-js/store";
import { MotionLayoutContextValue, SourceData } from "./types";
import { createTimer, eases, EasingFunction, waapi } from "animejs";
import { Dynamic } from "solid-js/web";
import { copyTransformFromRect } from "./utils";

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
    props: JSX.IntrinsicElements[T] & { ref?: any } & {
      ease?: EasingFunction;
      duration?: number;
    } & {
      preserveChild?: boolean;
    },
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

        if (props.preserveChild) {
          const nodesToMove: Node[] = [];
          [...srcRef.childNodes].forEach((child) => {
            const childern = child as HTMLElement;
            childern.style.zIndex = "20";
            childern.style.position = "absolute";
            srcRef.style.pointerEvents = "none";
            // Only handle Element nodes (not text/comments)
            if (childern.nodeType === Node.ELEMENT_NODE) {
              // Move the child before the srcRef in the DOM
              nodesToMove.push(childern);
              srcRef.parentNode?.insertBefore(childern, srcRef);
            }
          });

          waapi.animate(srcRef, {
            scaleX: [transform.scaleX, 1],
            scaleY: [transform.scaleY, 1],
            x: [transform.translateX, 0],
            y: [transform.translateY, 0],
            borderRadius: [sourceData.borderRadius!, original.borderRadius],
            ease: props.ease ? props.ease : eases.outBack(1),
            duration: props.duration ? props.duration : 400,
            onComplete: () => {
              nodesToMove.forEach((node) => {
                const childern = node as HTMLElement;
                childern.style.zIndex = "";
                childern.style.position = "";
                srcRef.style.pointerEvents = "";
                srcRef.appendChild(node);
              });
            },
          });
        } else {
          waapi.animate(srcRef, {
            scaleX: [transform.scaleX, 1],
            scaleY: [transform.scaleY, 1],
            x: [transform.translateX, 0],
            y: [transform.translateY, 0],
            borderRadius: [sourceData.borderRadius, original.borderRadius],
            ease: props.ease ? props.ease : eases.outBack(1),
            duration: props.duration ? props.duration : 400,
          });
        }
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
  li: element("li"),
  form: element('form'),
  // Add more element types as needed

  // Generic function to create custom flippable elements on demand
  create: element,
};
