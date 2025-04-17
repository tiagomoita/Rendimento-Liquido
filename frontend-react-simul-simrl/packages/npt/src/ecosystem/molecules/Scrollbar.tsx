export const Scrollbar = (ref: any, setIsScrollbarVisible: any) => {
  const container = ref.current;

  const checkScroll = () => {
    if (container) {
      const isScrollable = container.scrollHeight > container.clientHeight;
      setIsScrollbarVisible((prev: any) =>
        prev !== isScrollable ? isScrollable : prev
      );
    }
  };

  const observer = new ResizeObserver(() => {
    requestAnimationFrame(() => checkScroll());
  });

  if (container) {
    observer.observe(container);
  }

  return () => {
    if (container) observer.unobserve(container);
  };
};
