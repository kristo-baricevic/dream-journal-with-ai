'use client';

import { useState } from "react";

const EntryCard = ({entry}) => {
    const date = new Date(entry.createdAt).toDateString();
    const [analysis, setAnalysis] = useState(entry.analysis || {});

    const {mood, summary, color, subject, negative} = analysis;
    
    const cloudStyle = {
        background: lightenColor(color, 20), // Adjust lightness by 20%
    };
    
    function lightenColor(hexColor, percent) {
        // Convert hex color to RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
    
        // Convert RGB to HSL
        let hsl = rgbToHsl(r, g, b);
    
        // Adjust the lightness component
        hsl[2] = Math.min(100, hsl[2] + percent);
    
        // Convert HSL back to RGB
        const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    
        // Convert RGB to hex
        return rgbToHex(rgb);
    }
    
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
    
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
    
        return [h, s, l];
    }
    
    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
    
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
    
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
    
        return [r, g, b];
    }
    
    function rgbToHex(rgb) {
        return `#${rgb[0].toString(16)}${rgb[1].toString(16)}${rgb[2].toString(16)}`;
    }
    

    
    return (
        <div className="cloud" style={cloudStyle} >
            <div className="content">
                <div className="py-2 px-4 sm:px-6 z-10">{date}</div>
                <div className="px-4 sm:p-6 content-truncate z-10">{subject}</div>
            </div>             
        </div>
    )
}

export default EntryCard;

     