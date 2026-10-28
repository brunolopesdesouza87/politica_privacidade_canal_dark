import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];

  let currentList: string[] = [];
  let inList = false;

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="my-3 space-y-2 list-none pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start text-slate-300 text-sm sm:text-base leading-relaxed">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 shrink-0 ring-4 ring-cyan-500/20" />
              <div className="flex-1">{formatInline(item)}</div>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (text: string): React.ReactNode[] => {
    // Process bold, links, code
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // regex for [label](url), **bold**, *italic*, `code`
    const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchedStr = match[0];
      if (matchedStr.startsWith('[') && matchedStr.includes('](')) {
        const linkMatch = matchedStr.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          parts.push(
            <a
              key={keyIdx++}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors"
            >
              {linkMatch[1]}
            </a>
          );
        }
      } else if (matchedStr.startsWith('**') && matchedStr.endsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-white">
            {matchedStr.slice(2, -2)}
          </strong>
        );
      } else if (matchedStr.startsWith('*') && matchedStr.endsWith('*')) {
        parts.push(
          <em key={keyIdx++} className="italic text-slate-300">
            {matchedStr.slice(1, -1)}
          </em>
        );
      } else if (matchedStr.startsWith('`') && matchedStr.endsWith('`')) {
        parts.push(
          <code key={keyIdx++} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700">
            {matchedStr.slice(1, -1)}
          </code>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) {
        flushList(index);
        inList = false;
      }
      return;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      if (inList) {
        flushList(index);
        inList = false;
      }
      elements.push(
        <h4 key={index} className="text-base sm:text-lg font-semibold text-white mt-5 mb-2.5 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-cyan-500 inline-block" />
          {formatInline(trimmed.substring(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      if (inList) {
        flushList(index);
        inList = false;
      }
      elements.push(
        <h3 key={index} className="text-lg sm:text-xl font-bold text-white mt-6 mb-3">
          {formatInline(trimmed.substring(3))}
        </h3>
      );
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
      inList = true;
      const contentText = trimmed.replace(/^(\* |- |\d+\.\s)/, '');
      currentList.push(contentText);
    } else {
      if (inList) {
        flushList(index);
        inList = false;
      }
      elements.push(
        <p key={index} className="my-2 text-slate-300 text-sm sm:text-base leading-relaxed">
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  if (inList) {
    flushList(lines.length);
  }

  return <div className="space-y-1">{elements}</div>;
};
