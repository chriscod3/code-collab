// src/utils/codeRunner.ts
export async function runCode(code: string, language: string): Promise<string> {
  try {
    // For JavaScript - use safe-eval or sandboxed iframe
    if (language === 'javascript') {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.join(' ')),
        error: (...args: any[]) => logs.push(`Error: ${args.join(' ')}`),

      };

      // Create sandboxed function
      const fn = new Function('console', code);
      fn(customConsole);
      
      return logs.join('\n') || 'Code executed successfully';
    }

    // For other languages, use an API like Judge0
    const response = await fetch('https://api.judge0.com/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: code,
        language_id: getLanguageId(language),
      })
    });

    const result = await response.json();
    return result.stdout || result.stderr || 'No output';
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
}

function getLanguageId(language: string): number {
  const ids: Record<string, number> = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
  };
  return ids[language] || 63;
}