import Page1 from "./Page1";
import Home from "./Home";
import Page2 from "./Page2";
import { useEffect, useState } from "react";

function App() {
  const [path, setPath] = useState(window.location.pathname);
  console.log("현재 페이지", path);

  useEffect(() => {
    const handleNavigate = (e) => {
      setPath(e.destination.url);
    };
    window.navigation.addEventListener("navigate", handleNavigate);
    return () => {};
  }, []);
  return (
    <>
      {(path === "/" || path === "/home.html") && <Home />}
      {path === "/page1.html" && <Page1 />}
      {path === "/page2.html" && <Page2 />}
    </>
  );
}

export default App;
