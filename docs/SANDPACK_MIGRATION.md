# Sandpack v1.x Migration Guide

We're thrilled to announce a significant update to Sandpack, bringing a wealth of new features, improved developer experience, and a fresh design. This guide outlines the key changes, new features, and the necessary steps to migrate your existing Sandpack implementations.

## Overview & Highlights

This release focuses on improving SSR support, enhancing design, introducing new components, and refining the API.

**Key Highlights:**
* **Improved SSR Support:** Better integration for server-side rendering
* **Fresh Design:** A new look, semantic UI tokens, and updated themes
* **SandpackFileExplorer:** A new component for file navigation
* **Detached Themes:** Themes are now in a separate package, reducing bundle size
* **Type-Safe Props:** `files`, `visibleFiles`, and `activeFile` are now type-safe
* **Streamlined API:** Improvements to `Sandpack` and `SandpackProvider` APIs

## New Features

### SSR Support

Sandpack now offers enhanced SSR capabilities:

```javascript
import { getSandpackCssText } from "@codesandbox/sandpack-react";

// SSR template
<style
  dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
  id="sandpack"
/>;
```

### SandpackFileExplorer Component

A new component for file navigation within the sandbox:

```javascript
<SandpackFileExplorer />
// Displays:
// public/
//   index.html
//   App.js
//   index.js
//   package.json
//   styles.css
```

### Detached Theme Package

Themes are now in a dedicated package for optimized bundle size:

```javascript
// Before
<Sandpack theme="github-light" />

// Now
import { Sandpack } from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

export default function App() {
  return <Sandpack theme={githubLight} />;
}
```

Auto theme support remains:

```javascript
<Sandpack theme="auto" /> // respects system color scheme
```

### Theme Customization

Customize individual style values:

```javascript
import { Sandpack } from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

export default function App() {
  return (
    <Sandpack 
      theme={{
        ...githubLight,
        colors: {
          accent: "rebeccapurple",
        },
        syntax: {
          tag: "#006400",
          string: "rgb(255, 165, 0)",
          plain: "tomato",
        },
      }}
    />
  );
}
```

## Breaking Changes

Several components and props have been deprecated or replaced:

* ❌ `SandpackRunner`: Use **`SandpackPreview`** instead
* ❌ `customSetup.main`: Use **`options.activeFile`** instead
* ❌ `customSetup.files`: Use **`files`** prop directly
* ❌ `options.openPaths`: Use **`options.visibleFiles`** instead
* ❌ `customStyle`: Use **`style`** prop
* ❌ `viewportSize`/`viewportOrientation`: Removed from SandpackPreview
* ❌ `theme` on SandpackLayout: Set on SandpackProvider instead

## Migration Examples

### Sandpack Component

```javascript
// Before
<Sandpack
  customSetup={{ 
    files: { "/src/App.vue": "" }, 
    main: "/src/App.vue" 
  }}
  template="vue"
/>

// Now
<Sandpack
  files={{ "/src/App.vue": "" }}
  options={{ activeFile: "/src/App.vue" }}
  template="vue"
/>
```

### SandpackProvider

```javascript
// Before
<SandpackProvider
  activePath="/src/App.vue"
  customSetup={{ 
    files: { "/src/App.vue": "" }, 
    dependencies: {} 
  }}
  template="vue"
  openPaths={["/src/App.vue"]}
/>

// Now
<SandpackProvider
  customSetup={{ dependencies: {} }}
  files={{ "/src/App.vue": "" }}
  options={{
    activeFile: "/src/App.vue",
    visibleFiles: ["/src/App.vue"],
  }}
  template="vue"
/>
```

### Theme Configuration

```javascript
// Before
<SandpackProvider>
  <SandpackLayout theme="github-light">
    ...
  </SandpackLayout>
</SandpackProvider>

// Now
<SandpackProvider theme="github-light">
  <SandpackLayout>
    ...
  </SandpackLayout>
</SandpackProvider>
```

## Theme Token Changes

Old token → New token mapping:
* `palette` → `colors`
* `activeText` → `hover`
* `defaultText` → `clickable`
* `inactiveText` → `surface2`/`disabled`
* `defaultBackground` → `surface1`
* `new` → `surface3`
* `errorForeground` → `error`
* `errorBackground` → `errorSurface`
* `typography` → `font`
* `bodyFont` → `body`
* `monoFont` → `mono`
* `fontSize` → `size`

## Additional Improvements

* Support for React v18
* Fixed server/client ID mismatches in SandpackCodeEditor
* Improved error message descriptions
* Better dependency handling between props and package.json
* Preparing for direct CodeSandbox integration