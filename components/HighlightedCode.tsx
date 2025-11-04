import React, { useMemo } from 'react';

// Inform TypeScript that Prism will be available on the window object
declare const Prism: any;

interface HighlightedCodeProps {
    code: string;
    placeholder?: string;
    highlightedLines?: Set<number>;
    colorMap?: { [key: number]: string };
}

const HighlightedCode = ({ code, placeholder, highlightedLines = new Set(), colorMap = {} }: HighlightedCodeProps) => {

    const highlightedLinesHtml = useMemo(() => {
        if (code && typeof Prism !== 'undefined' && Prism.languages && Prism.languages.python) {
            try {
                const html = Prism.highlight(code, Prism.languages.python, 'python');
                return html.split('\n');
            } catch (e) {
                console.error("Prism highlighting failed", e);
                return code.split('\n'); // Fallback to plain text lines
            }
        }
        return code ? code.split('\n') : [];
    }, [code]);

    if (!code) {
        return <div className="p-4 text-gray-500">{placeholder}</div>;
    }

    return (
        <pre className="p-4 m-0" style={{
            fontFamily: '"Fira Code", "Menlo", "Monaco", "Courier New", monospace',
            fontSize: 14,
        }}>
            <code className="language-python">
                {highlightedLinesHtml.map((line, i) => {
                    const lineNumber = i + 1;
                    const isHighlighted = highlightedLines.has(lineNumber);
                    const color = colorMap[lineNumber];
                    
                    const style = isHighlighted && color ? {
                        backgroundColor: `${color}20`, // Add ~12% alpha for background
                        borderLeft: `2px solid ${color}`,
                    } : {};

                    return (
                        <span key={i} className={isHighlighted ? 'code-line-highlight' : ''} style={style}>
                            <span dangerouslySetInnerHTML={{ __html: line || ' ' }} />
                        </span>
                    );
                })}
            </code>
        </pre>
    );
};

export default HighlightedCode;