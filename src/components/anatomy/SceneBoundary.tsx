"use client";

import { Component, type ReactNode } from "react";

/** If WebGL or the model download fails, keep the section usable through its list */
export default class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <p className="max-w-xs text-sm opacity-70">
            The 3D view couldn&apos;t load on this device. Pick an area from the list to see details.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
