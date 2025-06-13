import { MathJax } from "better-react-mathjax";
import type React from "react";
import styles from './RichParagraph.module.css';

export const RichParagraph: React.FC<{ content?: string }> = ({ content }) => {
    return content && (
        <MathJax>
            <div className={styles.container}

                dangerouslySetInnerHTML={{ __html: content }}
            />
        </MathJax>
    );
}