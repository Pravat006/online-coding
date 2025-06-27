
function 
() {
    return (
        <div>
            <div className="w-full max-w-6xl mx-auto mb-4 flex gap-4 items-center bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2">
                    <label htmlFor="language" className="text-sm font-medium">Language:</label>
                    <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="json">JSON</option>
                        <option value="markdown">Markdown</option>
                        <option value="sql">SQL</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="theme" className="text-sm font-medium">Theme:</label>
                    <select
                        id="theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as 'vs-light' | 'vs-dark' | 'hc-black')}
                        className="px-3 py-1 border rounded-md text-sm"
                    >
                        <option value="vs-light">Light</option>
                        <option value="vs-dark">Dark</option>
                        <option value="hc-black">High Contrast</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-gray-600">
                        Lines: {code.split('\n').length} |
                        Characters: {code.length}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default 
