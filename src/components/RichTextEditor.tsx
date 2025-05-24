"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type SunEditorCore from "suneditor/src/lib/core";

// Dynamically import SunEditor to avoid SSR issues
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full border border-gray-300 rounded-md bg-gray-50 animate-pulse"></div>
  ),
});

// Import SunEditor styles
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";

interface SunEditorComponentProps {
  onChange: (content: string) => void;
  initialContent?: string;
}

export function SunEditorComponent({
  onChange,
  initialContent = "",
}: SunEditorComponentProps) {
  const editorRef = useRef<SunEditorCore>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditorLoad = (sunEditor: SunEditorCore) => {
    editorRef.current = sunEditor;
  };

  const handleChange = (content: string) => {
    onChange(content);
  };

  // Define a custom plugin for Help button (optional - you can remove this if not needed)
  // Here I’m removing the help plugin completely since you want no help popup
  // So no need to define it or add it to plugins or buttonList

  const options = {
    height: "300px",
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["bold", "underline", "italic"],
      ["removeFormat"],
      ["fontColor", "hiliteColor"],
      ["outdent", "indent", "align"],
      ["list", "table"],
      ["link", "image", "video"],
      ["fullScreen", "codeView"],
    ],
    plugins, // all default plugins
    imageUploadSizeLimit: 5242880,
    imageMultipleFile: true,
    imageAccept: ".jpg, .jpeg, .png, .gif",
    imageFileInput: true,
    imageUrlInput: true,
    videoFileInput: false,
    videoUrlInput: true,
    font: ["Arial", "Courier New", "Georgia", "Tahoma", "Verdana", "Open Sans"],
    defaultFont: "Open Sans",
  };

  if (!mounted) return null;

  return (
    <div className="sun-editor-container">
      <SunEditor
        height="300px"
        setOptions={options}
        setContents={initialContent}
        onChange={handleChange}
        getSunEditorInstance={handleEditorLoad}
        setDefaultStyle="font-family: Arial; font-size: 14px;"
      />
    </div>
  );
}

// ["undo", "redo"],
// ["font", "fontSize", "formatBlock"],
// ["bold", "underline", "italic", "strike", ],
// ["removeFormat"],
// ["fontColor", "hiliteColor"],
// ["outdent", "indent"],
// ["align", "horizontalRule", "list", "table"],
// ["link", "image", "video"],
// ["fullScreen", "showBlocks", "codeView"],
// ["preview", "print"],
// ["save"],

// ["undo", "redo"],
// ["font", "fontSize", "formatBlock"],
// ["bold", "underline", "italic", ],
// ["removeFormat"],
// ["fontColor", "hiliteColor"],
// ["outdent", "indent","align"],
// ["list", "table"],
// ["link", "image", "video"],
// ["fullScreen", "codeView"],
