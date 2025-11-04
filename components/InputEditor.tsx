import React from 'react';

interface InputEditorProps {
    value: string;
    onValueChange: (code: string) => void;
    readOnly?: boolean;
}

const InputEditor = ({ value, onValueChange, readOnly }: InputEditorProps) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            readOnly={readOnly}
            spellCheck="false"
            className="w-full h-full p-4 bg-transparent resize-none font-mono text-sm leading-relaxed text-gray-200 focus:outline-none"
            style={{
                fontFamily: '"Fira Code", "Menlo", "Monaco", "Courier New", monospace',
                fontSize: 14,
                caretColor: '#4dc0b5', // teal-400
            }}
        />
    );
};

export default InputEditor;