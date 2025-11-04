import React, { useState, useCallback, useMemo } from 'react';
import { beautifyPythonCode, BeautifyResult } from './services/geminiService';
import { LoadingIcon, SparklesIcon } from './components/Icons';
import InputEditor from './components/InputEditor';
import HighlightedCode from './components/HighlightedCode';

const MESSY_CODE_EXAMPLES = [
    {
        name: 'Bad Formatting',
        code: `
import   os, sys
def my_func(a,b,c,d,e,f):
 print("hello world")
 if a==True and b==False:
  return (a,b,c,d,e,f)

class MyClass:
    def __init__(self, val):
     self.value=val
    def get_value(self):
      return self.value
`
    },
    {
        name: 'Long Lines',
        code: `
def long_function_name(parameter_one, parameter_two, parameter_three, parameter_four, parameter_five, parameter_six):
    print("This is a very long line of code that definitely exceeds the recommended line length limit in PEP 8 and should be wrapped nicely.")
    result = parameter_one + parameter_two + parameter_three + parameter_four + parameter_five + parameter_six
    return result
`
    },
    {
        name: 'Inconsistent Spacing',
        code: `
x=10
y = 20
z= 30
my_list=[1,2, 3,4]
my_dict = {'key1': 'value1','key2':'value2'}
def func ( arg1,arg2 ):
    return arg1+arg2
`
    },
    {
        name: 'Naming & Constants',
        code: `
def calc(d):
    # calculates area
    r = d / 2
    a = 3.14 * r * r
    return a

val = 10
area = calc(val)
`
    },
    {
        name: 'Mixed Quotes',
        code: `
def check_status(user_active, is_admin):
    status_msg = 'pending'
    if user_active == True:
        status_msg = "active"
    else:
        status_msg = 'inactive'
    return status_msg
`
    },
    {
        name: 'Compact & Undocumented',
        code: `
def add(x,y): return x+y; print("done")

class calculator:
    def multiply(self, a, b):
        result=a*b;return result
`
    }
];

const CORRECTION_COLORS = [
    '#F98080', // Red
    '#F0B05D', // Orange
    '#F6E05E', // Yellow
    '#81E6D9', // Teal
    '#76A9FA', // Blue
    '#B794F4', // Purple
    '#FBB6CE', // Pink
];

const App = () => {
    const [inputCode, setInputCode] = useState<string>(MESSY_CODE_EXAMPLES[0].code.trim());
    const [beautifyResult, setBeautifyResult] = useState<BeautifyResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleBeautify = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setBeautifyResult(null);
        try {
            const result = await beautifyPythonCode(inputCode);
            setBeautifyResult(result);
        } catch (err: any) {
            setError(err.message || 'Failed to beautify code. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [inputCode]);
    
    const highlightedLines = useMemo(() => {
        if (!beautifyResult || !beautifyResult.changes) {
            return new Set<number>();
        }
        return new Set(beautifyResult.changes.map(change => change.lineNumber));
    }, [beautifyResult]);

    const colorMap = useMemo(() => {
        if (!beautifyResult?.changes) {
            return {};
        }
        const map: { [key: number]: string } = {};
        const uniqueLineNumbers = [...new Set(beautifyResult.changes.map(c => c.lineNumber))];
        uniqueLineNumbers.forEach((lineNumber, index) => {
            map[lineNumber] = CORRECTION_COLORS[index % CORRECTION_COLORS.length];
        });
        return map;
    }, [beautifyResult]);

    return (
        <div className="relative w-screen h-screen bg-black text-gray-200 overflow-hidden">
            
            <main className="absolute inset-0 z-10 flex flex-col p-4 md:p-8 space-y-4">
                <header className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200 drop-shadow-[0_0_10px_rgba(77,192,181,0.7)]">
                        PyClean
                    </h1>
                    <p className="text-gray-400 mt-2">AI-Powered Python Code Beautifier</p>
                    <p className="text-gray-500 text-sm mt-1">
                        Formatting according to <a href="https://peps.python.org/pep-0008/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">PEP 8 standards</a>
                    </p>
                </header>

                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-h-0">
                    {/* Input Pane */}
                    <div className="flex flex-col bg-black bg-opacity-40 backdrop-blur-sm border border-cyan-500/20 rounded-lg shadow-2xl shadow-cyan-500/10 overflow-hidden">
                        <h2 className="text-lg font-semibold p-3 border-b border-cyan-500/20 text-cyan-300 font-orbitron">Messy Code</h2>
                        <div className="flex-grow overflow-auto code-editor-container">
                            <InputEditor
                                value={inputCode}
                                onValueChange={setInputCode}
                                readOnly={isLoading}
                            />
                        </div>
                    </div>

                    {/* Output Pane */}
                    <div className="flex flex-col bg-black bg-opacity-40 backdrop-blur-sm border border-teal-500/20 rounded-lg shadow-2xl shadow-teal-500/10 overflow-hidden">
                        <h2 className="text-lg font-semibold p-3 border-b border-teal-500/20 text-teal-300 font-orbitron">Clean Code & Analysis</h2>
                        <div className="relative flex-grow overflow-auto code-editor-container">
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                                    <div className="flex flex-col items-center space-y-2">
                                        <LoadingIcon className="w-12 h-12 text-teal-400" />
                                        <span className="text-teal-300 font-semibold">Beautifying...</span>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                                    <p className="text-red-400 p-4 text-center">{error}</p>
                                </div>
                            )}
                            
                            {beautifyResult ? (
                                <div>
                                    <HighlightedCode
                                        code={beautifyResult.formattedCode}
                                        highlightedLines={highlightedLines}
                                        colorMap={colorMap}
                                    />
                                    {beautifyResult.changes && beautifyResult.changes.length > 0 && (
                                        <div className="p-4 border-t border-teal-500/20">
                                            <h3 className="text-md font-bold text-teal-300 mb-3 font-orbitron">Corrections Analysis</h3>
                                            <ul className="space-y-3 text-sm">
                                                {beautifyResult.changes.map((change, index) => {
                                                    const color = colorMap[change.lineNumber];
                                                    return (
                                                        <li key={index} className="flex items-start">
                                                            <span 
                                                                className="text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                                                                style={{ backgroundColor: color ? color : '#1A202C' }}
                                                            >
                                                                {change.lineNumber}
                                                            </span>
                                                            <span className="text-gray-300">{change.explanation}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                !isLoading && !error && <div className="p-4 text-gray-500">Formatted code and analysis will appear here...</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 flex flex-col items-center space-y-4 pt-2">
                    <button
                        onClick={handleBeautify}
                        disabled={isLoading || !inputCode.trim()}
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-br from-cyan-600 to-teal-500 rounded-md shadow-lg hover:shadow-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-300 opacity-0 transition-opacity duration-300 group-hover:opacity-75"></span>
                        <span className="relative flex items-center">
                            {isLoading ? (
                                <LoadingIcon className="w-6 h-6 mr-2" />
                            ) : (
                                <SparklesIcon className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:scale-125" />
                            )}
                            {isLoading ? 'Processing...' : 'Beautify'}
                        </span>
                    </button>
                    <div className="flex items-center space-x-2 flex-wrap justify-center gap-y-2">
                        <span className="text-sm text-gray-400">Try an example:</span>
                        {MESSY_CODE_EXAMPLES.map(example => (
                             <button
                                key={example.name}
                                onClick={() => setInputCode(example.code.trim())}
                                disabled={isLoading}
                                className="px-3 py-1 text-xs text-cyan-300 bg-cyan-900/50 border border-cyan-700/50 rounded-full hover:bg-cyan-800/70 hover:border-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {example.name}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;