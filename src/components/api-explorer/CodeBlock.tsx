
interface CodeBlockProps {
  title: string;
  code: object;
}

export function CodeBlock({ title, code }: CodeBlockProps) {
  const formattedCode = JSON.stringify(code, null, 2);
  const isEmpty = !code || Object.keys(code).length === 0;

  return (
    <div>
      <h4 className="font-semibold text-sm text-muted-foreground mb-2">{title}</h4>
      <pre className="bg-muted p-4 rounded-lg text-sm text-foreground overflow-x-auto h-full min-h-[100px]">
        <code>{isEmpty ? 'No content' : formattedCode}</code>
      </pre>
    </div>
  );
}
