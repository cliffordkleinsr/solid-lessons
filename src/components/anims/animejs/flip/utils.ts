import { SourceData } from "./types";

export function copyTransform(source: HTMLElement, target: HTMLElement) {
  // Get the bounding rectangles of both elements
  const sourceBounds = source.getBoundingClientRect();
  const targetBounds = target.getBoundingClientRect();

  // Calculate the scale factors needed
  const scaleX = sourceBounds.width / targetBounds.width;
  const scaleY = sourceBounds.height / targetBounds.height;

  // Calculate the distances between the elements' centers
  const sourceCenter = {
    x: sourceBounds.left + sourceBounds.width / 2,
    y: sourceBounds.top + sourceBounds.height / 2,
  };

  const targetCenter = {
    x: targetBounds.left + targetBounds.width / 2,
    y: targetBounds.top + targetBounds.height / 2,
  };

  // Calculate the translation needed to align centers
  const translateX = sourceCenter.x - targetCenter.x;
  const translateY = sourceCenter.y - targetCenter.y;

  // Transform origin is half the target's dimensions
  const transformOriginX = targetBounds.width / 2;
  const transformOriginY = targetBounds.height / 2;

  return {
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
    transformOrigin: `${transformOriginX}px ${transformOriginY}px`,
  };
}

export function copyTransformFromRect(source: SourceData, target: HTMLElement) {
  // Get the bounding rectangles of both elements
  const sourceBounds = source.domRect;
  const targetBounds = target.getBoundingClientRect();

  // Calculate the scale factors needed
  const scaleX = sourceBounds.width / targetBounds.width;
  const scaleY = sourceBounds.height / targetBounds.height;

  // Calculate the distances between the elements' centers
  const sourceCenter = {
    x: sourceBounds.left + sourceBounds.width / 2,
    y: sourceBounds.top + sourceBounds.height / 2,
  };

  const targetCenter = {
    x: targetBounds.left + targetBounds.width / 2,
    y: targetBounds.top + targetBounds.height / 2,
  };

  // Calculate the translation needed to align centers
  const translateX = sourceCenter.x - targetCenter.x;
  const translateY = sourceCenter.y - targetCenter.y;

  // Transform origin is half the target's dimensions
  const transformOriginX = targetBounds.width / 2;
  const transformOriginY = targetBounds.height / 2;

  return {
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
    transformOrigin: `${transformOriginX}px ${transformOriginY}px`,
    translateX,
    translateY,
    scaleX,
    scaleY,
    borderRadius: source.borderRadius,
  };
}
