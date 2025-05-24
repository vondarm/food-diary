interface WithStopPropagation {
  stopPropagation: () => void;
}

export const stopPropagationDecorator =
  (f: () => void) => (e: WithStopPropagation) => {
    e.stopPropagation();
    f();
  };
