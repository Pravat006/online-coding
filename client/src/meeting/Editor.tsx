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
                automaticLayout: true,
                formatOnType: true,
                glyphMargin: true,
                folding: true,
                wordWrap: "off",
                scrollbar: {
                    useShadows: false,
                },

                padding: {
                    top: 5,
                    bottom: 5,
                },
            });

            return () => editor.dispose();
        }
    }, []);

    return (
        <div className="flex flex-col h-screen ">
            <h1>hello</h1>
            <div
                ref={editorRef}
                style={{
                    height: "800px",
                    width: "800px",
                    textAlign: "left",
                    padding: 0,
                    margin: 0,
                }}
            />
        </div>


    );
}
