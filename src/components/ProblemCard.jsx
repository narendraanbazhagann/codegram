import { motion } from 'framer-motion';

const ProblemCard = ({ problem }) => {
    if (!problem) return null;

    return (
        <div className="h-full flex flex-col bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{problem.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                            'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                    {problem.difficulty}
                </span>
            </div>

            <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-6">
                    {problem.description}
                </p>

                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Examples</h3>

                <div className="space-y-4">
                    {problem.testCases.map((testCase, idx) => (
                        <div key={idx} className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-sm">
                            <div className="flex gap-4 mb-2">
                                <span className="text-slate-500 select-none">Input:</span>
                                <span className="text-cyan-300">{testCase.input}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-slate-500 select-none">Output:</span>
                                <span className="text-green-300">{testCase.output}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Constraints</h3>
                    <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                        <li>Time Limit: {problem.timeLimit / 1000}s</li>
                        <li>Memory Limit: 256MB</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProblemCard;
