import { useEffect, useRef } from "react";

export default function useObserver(loader: HTMLElement | null, list_loaded: boolean, can_load: boolean, clbk: Function) {
	const observer = useRef<IntersectionObserver>()
	useEffect(() => {
		if (!list_loaded) return;
		if (observer.current) observer.current.disconnect();
    const callback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      if (entries[0].isIntersecting && can_load) {				
				clbk();
			}
    };
    observer.current = new IntersectionObserver(callback);
    if (loader) {
      observer.current.observe(loader);
    }
  }, [loader, list_loaded, can_load, clbk]);
}