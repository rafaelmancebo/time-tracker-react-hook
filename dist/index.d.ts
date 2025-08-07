type FocusHandlers = {
    onFocus?: () => void;
    onBlur?: () => void;
};
export declare function useWindowFocus({ onFocus, onBlur }?: FocusHandlers): void;
export declare function useTimer({ onElapsed }?: {
    onElapsed?: (seconds: number) => void;
}): {
    start: () => void;
    end: () => void;
    elapsed: number | null;
};
export {};
