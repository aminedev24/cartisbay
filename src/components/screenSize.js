import { useEffect, useState } from "react"; 

const useCheckScreenSize = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.screen.width <= 1000);
    const [isPortrait, setIsPortrait] = useState(window.matchMedia('(orientation: portrait)').matches);
    //const [isPortrait, setIsPortrait] = useState(window.screen.height > window.screen.width);


    useEffect(() => {
        const checkScreenWidth = () => {
            setIsSmallScreen(window.screen.width <= 900);
        };

        const checkOrientation = (e) => {
            setIsPortrait(e.matches);
        };

        // Initial checks
        checkScreenWidth();
        
        // Listen for resize events
        window.addEventListener("resize", checkScreenWidth);
        
        // Listen for orientation changes
        
        const orientationMediaQuery = window.matchMedia('(orientation: portrait)');
        orientationMediaQuery.addEventListener('change', checkOrientation);

        
        checkOrientation(orientationMediaQuery);

        // Clean up the event listeners
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
            orientationMediaQuery.removeEventListener('change', checkOrientation);
        };
    }, []);

    return { isSmallScreen, isPortrait };
};

export default useCheckScreenSize;