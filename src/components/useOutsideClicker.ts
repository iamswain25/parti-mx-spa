import React from "react";

export default function useOutsideClicker(
  ref: React.MutableRefObject<any>,
  cb: () => any
) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(this: Document, ev: MouseEvent) {
      if (ref.current && !ref.current.contains(ev.target)) {
        cb && cb();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
