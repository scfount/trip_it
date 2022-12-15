import { LoadScript } from "@react-google-maps/api";
import React from "react";
class LoadMapScript extends LoadScript {
    componentDidMount() {
        const cleaningUp = true;
        const isBrowser = typeof document !== undefined;
        const isLoaded = window.google && 
            window.google.maps &&
            document.querySelector('body.first-hit-completed');

        if (!isLoaded && isBrowser) {
            if (window.google && !cleaningUp) {
                console.error("Google API is already loaded");
                return;
            }
            this.isCleaningUp()
                .then(this.injectScript());
        }

        if (isLoaded) {
            this.setState({ loaded: true });
        }
    }

}

export default LoadMapScript;