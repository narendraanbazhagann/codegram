import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, language = 'javascript' }) => {
    return (
        <div className="h-full w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
                <span className="text-xs font-mono text-slate-400">main.js</span>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
            </div>
            <Editor
                height="calc(100% - 40px)"
                defaultLanguage={language}
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    );
};

export default CodeEditor;
