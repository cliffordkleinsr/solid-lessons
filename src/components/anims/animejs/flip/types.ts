import { SetStoreFunction } from "solid-js/store";

export type SourceData = {
  domRect: DOMRect;
  borderRadius: string;
};

export type MotionLayoutContextValue = {
  layoutId?: string;
  sourceData: Partial<SourceData>;
  setSourceData: SetStoreFunction<Partial<SourceData>>;
};
export type SnapShot = Partial<SourceData>;
