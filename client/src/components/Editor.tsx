import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

export default function Editor() {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            const editor = monaco.editor.create(editorRef.current, {
                value: `print("sxsx")`,
                language: "python",
                theme: "vs-dark",
                lineNumbers: "on",
                minimap: { enabled: true },
                glyphMargin: true,
                folding: true,
                wordWrap: "off", // ✅ Prevent weird wrapping/centering
                scrollbar: {
                    useShadows: false,
                },
                padding: {
                    top: 20,
                    bottom: 20,
                },
            });

            return () => editor.dispose();
        }
    }, []);

    return (
        <div
            ref={editorRef}
            style={{
                height: "400px",
                width: "800px",
                textAlign: "left", // ✅ ensures content doesn't center
                padding: 0,
                margin: 0,
            }}
        />
    );
}
