import { useEffect, useRef } from 'react';

interface FlowchartDiagramProps {
  title: string;
  description: string;
  diagram: string;
}

const FlowchartDiagram = ({ title, description, diagram }: FlowchartDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMermaid = async () => {
      // @ts-ignore
      const mermaid = await import('mermaid');
      mermaid.default.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#8b5cf6',
          primaryTextColor: '#f4f4f5',
          primaryBorderColor: '#6d28d9',
          lineColor: '#71717a',
          secondaryColor: '#3f3f46',
          tertiaryColor: '#27272a',
          background: '#18181b',
          mainBkg: '#27272a',
          nodeBorder: '#6d28d9',
          clusterBkg: '#27272a',
          clusterBorder: '#3f3f46',
          titleColor: '#f4f4f5',
          edgeLabelBackground: '#27272a',
        },
        flowchart: {
          curve: 'basis',
          padding: 20,
        },
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        const { svg } = await mermaid.default.render('flowchart-' + Math.random().toString(36).substr(2, 9), diagram);
        containerRef.current.innerHTML = svg;
      }
    };

    loadMermaid();
  }, [diagram]);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6 bg-muted/30 flex justify-center items-center min-h-[300px]">
        <div ref={containerRef} className="overflow-auto max-w-full" />
      </div>
    </div>
  );
};

export default FlowchartDiagram;
