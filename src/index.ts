import { useEffect, useRef, useState, useCallback } from 'react';

type FocusHandlers = {
    onFocus?: () => void;
    onBlur?: () => void;
};

export function useWindowFocus({ onFocus, onBlur }: FocusHandlers = {}) {
    useEffect(() => {
        const handleFocus = () => {
            if (onFocus) {
                onFocus();
            } else {
                console.log('Window gained focus!');
            }
        };

        const handleBlur = () => {
            if (onBlur) {
                onBlur();
            } else {
                console.log('Window lost focus!');
            }
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, [onFocus, onBlur]);
}

export function useTimer({ onElapsed }: { onElapsed?: (seconds: number) => void } = {}) {
    const startTimeRef = useRef<number | null>(null);
    const [elapsed, setElapsed] = useState<number | null>(null);

    const start = useCallback(() => {
        startTimeRef.current = Date.now();
        setElapsed(null);
    }, []);

    const end = useCallback(() => {
        if (startTimeRef.current !== null) {
            const msElapsed = Date.now() - startTimeRef.current;
            const time = msElapsed / 1000;
            setElapsed(time);
            startTimeRef.current = null;
            if (onElapsed) {
                onElapsed(time);
            }
        }
    }, [onElapsed]);

    return { start, end, elapsed };
}
