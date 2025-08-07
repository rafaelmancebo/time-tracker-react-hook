import { useEffect, useRef, useState, useCallback } from 'react';
export function useWindowFocus({ onFocus, onBlur } = {}) {
    useEffect(() => {
        const handleFocus = () => {
            if (onFocus) {
                onFocus();
            }
            else {
                console.log('Window gained focus!');
            }
        };
        const handleBlur = () => {
            if (onBlur) {
                onBlur();
            }
            else {
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
export function useTimer({ onElapsed } = {}) {
    const startTimeRef = useRef(null);
    const [elapsed, setElapsed] = useState(null);
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
