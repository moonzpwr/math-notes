import { MathJax } from "better-react-mathjax";
import type React from "react";
import styles from './RichParagraph.module.css';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const RichParagraph: React.FC<{ content?: string }> = ({ content }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            const link = target.closest('a') as HTMLAnchorElement | null;

            if (link && link.href && link.origin === window.location.origin) {
                e.preventDefault();

                const path = link.pathname + link.search + link.hash;
                navigate(path);
            }
        };

        const container = containerRef.current;
        container?.addEventListener('click', handleClick);

        return () => {
            container?.removeEventListener('click', handleClick);
        };
    }, [navigate]);

    return content && (
        <MathJax>
            <div className={styles.container}
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </MathJax>
    );
}