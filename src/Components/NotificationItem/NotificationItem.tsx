import { useEffect, useState, type FC } from "react";
import styles from "./NotificationItem.module.css";
import classNames from "classnames";
import { NOTIFICATION_INTRO_ANIMATION_DURATION_MS, NOTIFICATION_OUTRO_ANIMATION_DURATION_MS } from "@/helpers/constants";

interface Props {
    message: string;
    id: string;
    isMarkedForDeletion: boolean;
    onFadeOutComplete: (id: string) => void;
}

export const NotificationItem: FC<Props> = ({ message, id, isMarkedForDeletion, onFadeOutComplete }) => {
    const [isIntroDone, setIsIntroDone] = useState(false);

    useEffect(() => {
        const introTimeout = setTimeout(() => setIsIntroDone(true), NOTIFICATION_INTRO_ANIMATION_DURATION_MS);
        return () => clearTimeout(introTimeout);
    }, []);

    useEffect(() => {
        if (isMarkedForDeletion) {
            const outTimeout = setTimeout(() => {
                onFadeOutComplete(id);
            }, NOTIFICATION_OUTRO_ANIMATION_DURATION_MS);
            return () => clearTimeout(outTimeout);
        }
    }, [isMarkedForDeletion, id, onFadeOutComplete]);

    return (<div className={classNames(styles.root, {
        [styles.outro]: isMarkedForDeletion,
        [styles.intro]: isIntroDone
    })}>
        {message}
    </div>)
}