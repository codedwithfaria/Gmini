import React from "react";
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import MonacoEditor from "./components/MonacoEditor";

export default function App() {
  return (
    <SandpackProvider template="react" theme="dark">
      <SandpackLayout>
        <MonacoEditor />
        <SandpackPreview style={{ height: "100vh", width: "50%" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
