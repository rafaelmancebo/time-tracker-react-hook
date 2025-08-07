import React from 'react';
import { useWindowFocus, useTimer } from '@ramg9206/time-tracker-react-hook';

function App() {
    const { start, end, elapsed } = useTimer({
        onElapsed: (seconds) => {
            console.log(`Time on screen: ${seconds.toFixed(2)} seconds`);
        },
    });

    useWindowFocus({
        onFocus: start,
        onBlur: end,
    });

    return (
        <div>
            <h1>Screen Time Tracker</h1>
            {elapsed !== null && (
                <p>You spent {elapsed.toFixed(2)} seconds before leaving the screen.</p>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
