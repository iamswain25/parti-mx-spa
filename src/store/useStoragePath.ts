import React from "react";
import { storage } from "../config/firebase";
export default function useStoragePath(path?: string, thumb: boolean = false) {
  const [url, setUrl] = React.useState<string | undefined>();
  React.useEffect(() => {
    let isMounted = true;
    if (path) {
      if (
        path?.startsWith("/") ||
        path?.startsWith("blob:") ||
        path?.startsWith("https://") ||
        path?.startsWith("http://") ||
        path?.startsWith("data:image/")
      ) {
        setUrl(path);
      } else {
        let _path = path;
        if (thumb) {
          const arr = path?.split("/");
          const img = arr.pop();
          arr.push("thumbs", img + "_364x240");
          _path = arr.join("/");
        }
        storage
          .ref(_path)
          .getDownloadURL()
          .then(url => {
            if (isMounted) setUrl(url);
          })
          .catch(console.warn);
      }
    }
    return () => {
      isMounted = false;
      setUrl(undefined);
    };
  }, [path, setUrl, thumb]);
  return url;
}
