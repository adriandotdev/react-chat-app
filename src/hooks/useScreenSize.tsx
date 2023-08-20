import { useState, useEffect } from 'react';


export default function useScreenSize(screenSize: number): boolean {

    const [isScreenMatch, setScreenMatch] = useState(false);

    function resize() {

        console.log("Reisizing")
        if (window.innerWidth >= screenSize) {

            setScreenMatch(true);
        }
        else {
            setScreenMatch(false);
        }
    }

    useEffect(() => {


        window.addEventListener('resize', resize);

        return () => {

            window.removeEventListener('resize', resize);
        }
    }, []);

    return isScreenMatch;
}