// components/MarkdownWithMath.tsx
import { useEffect, useRef } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { marked } from "marked";

interface MarkdownWithMathProps {
    content: string;
}

const MarkdownWithMath = ({ content }: MarkdownWithMathProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Render MathJax after the content is set
            window.MathJax?.typesetPromise([containerRef.current]);
        }
    }, [content]);

    const htmlContent = marked(content);

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default MarkdownWithMath;