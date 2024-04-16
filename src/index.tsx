import * as ReactDOM from "react-dom/client";


import * as Layout from "./Layout";
import                  "./style.css";


const root : ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<Layout.Component/>);
