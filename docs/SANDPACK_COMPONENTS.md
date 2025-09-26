# Sandpack Components Guide

This guide provides detailed information about Sandpack's core components and their usage patterns.

## Table of Contents
- [Layout and Structure](#layout-and-structure)
- [Preview Component](#preview-component)
- [Code Editor](#code-editor)
- [File Explorer](#file-explorer)
- [Tests Component](#tests-component)
- [Console](#console)
- [Code Viewer](#code-viewer)
- [Additional Components](#additional-components)

## Layout and Structure

The `SandpackLayout` component provides the foundational structure for Sandpack instances. It creates a two-column layout that becomes responsive under 700px.

```jsx
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

export default () => (
  <SandpackProvider template="react">
    <SandpackLayout>
      <SandpackCodeEditor />
      <SandpackPreview />
    </SandpackLayout>
  </SandpackProvider>
);
```

You can swap the order of components within `SandpackLayout` to change their positioning.

## Preview Component

The `SandpackPreview` component runs the bundler and displays the result. Key features:

- Multiple previews can share the same state
- Smart mounting - starts when rendered, even if mounted later
- Supports additional buttons through `actionsChildren`

```jsx
<SandpackPreview
  actionsChildren={
    <button onClick={() => alert("Custom action!")}>
      Custom Button
    </button>
  }
/>
```

### Getting Client Instance

```jsx
import { SandpackPreviewRef, useSandpack } from "@codesandbox/sandpack-react";

const Preview = () => {
  const { sandpack } = useSandpack();
  const previewRef = useRef<SandpackPreviewRef>();

  useEffect(() => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log(client);
    }
  }, [sandpack]);

  return <SandpackPreview ref={previewRef} />;
};
```

## Code Editor

The `SandpackCodeEditor` component provides a CodeMirror-based editor with various configuration options:

```jsx
<SandpackCodeEditor
  showTabs
  showLineNumbers={false}
  showInlineErrors
  wrapContent
  closableTabs
/>
```

### Adding Language Support

```jsx
import { python } from "@codemirror/lang-python";

<SandpackCodeEditor
  additionalLanguages={[
    {
      name: "python",
      extensions: ["py"],
      language: python(),
    },
  ]}
/>
```

### CodeMirror Extensions

```jsx
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";

<SandpackCodeEditor
  extensions={[autocompletion()]}
  extensionsKeymap={[completionKeymap]}
/>
```

## File Explorer

The `SandpackFileExplorer` provides file navigation capabilities:

```jsx
<SandpackProvider template="react">
  <SandpackLayout>
    <SandpackFileExplorer />
    <SandpackCodeEditor />
  </SandpackLayout>
</SandpackProvider>
```

For advanced features, consider using the `sandpack-file-explorer` package which adds:
- File/directory creation and deletion
- Drag and drop functionality
- Complete folder structure customization

## Tests Component

The `SandpackTests` component provides in-browser Jest testing capabilities:

```jsx
<SandpackProvider template="test-ts">
  <SandpackLayout>
    <SandpackTests />
    <SandpackCodeEditor />
  </SandpackLayout>
</SandpackProvider>
```

### Extending Jest

```jsx
<SandpackProvider
  customSetup={{ dependencies: { "jest-extended": "^3.0.2" } }}
  files={{
    "/extended.test.ts": `
      import * as matchers from 'jest-extended';
      expect.extend(matchers);
      // ... your tests
    `
  }}
/>
```

## Console

The `SandpackConsole` component provides console output functionality:

```jsx
<Sandpack
  options={{
    showConsole: true,
    showConsoleButton: true,
  }}
/>
```

### Console Props

| Prop | Type | Description |
|------|------|-------------|
| showHeader | boolean | Show/hide console header |
| showSyntaxError | boolean | Display syntax errors |
| maxMessageCount | number | Maximum number of messages |
| resetOnPreviewRestart | boolean | Clear on preview restart |
| standalone | boolean | Run independently |

## Code Viewer

The `SandpackCodeViewer` provides a read-only code display:

```jsx
<SandpackProvider template="react">
  <SandpackLayout>
    <SandpackCodeViewer />
    <SandpackPreview />
  </SandpackLayout>
</SandpackProvider>
```

### Code Decorations

```javascript
const decorations = [
  { className: "highlight", line: 1 },
  {
    className: "widget",
    line: 12,
    startColumn: 26,
    endColumn: 38,
  }
];

<SandpackCodeViewer decorations={decorations} />
```

## Additional Components

### OpenInCodeSandboxButton

```jsx
<SandpackProvider template="react">
  <SandpackLayout>
    <SandpackCodeEditor />
  </SandpackLayout>
  
  <UnstyledOpenInCodeSandboxButton>
    Open in CodeSandbox
  </UnstyledOpenInCodeSandboxButton>
</SandpackProvider>
```

### Transpiled Code View

```jsx
<SandpackProvider template="react">
  <SandpackLayout>
    <SandpackCodeEditor />
    <SandpackTranspiledCode />
  </SandpackLayout>
</SandpackProvider>
```

## Best Practices

1. Always wrap components with `SandpackProvider`
2. Use `SandpackLayout` for consistent styling
3. Consider mobile responsiveness when ordering components
4. Use console sparingly - it has limitations with nested objects
5. Prefer `SandpackCodeViewer` for read-only code displays
6. Use refs to access CodeMirror instance when needed