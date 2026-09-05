/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "primary-fixed": "#d6e3ff",
        "on-primary-fixed": "#001b3d",
        "tertiary-fixed-dim": "#a2d48f",
        "surface-variant": "#e2e3e1",
        "on-secondary-fixed": "#221b0b",
        "secondary-fixed": "#f0e1c7",
        "on-tertiary": "#ffffff",
        "charcoal-text": "#1A1A1A",
        "on-surface": "#1a1c1b",
        "on-secondary-container": "#6e634f",
        "surface-container-highest": "#e2e3e1",
        "surface-white": "#FFFFFF",
        "tertiary-fixed": "#bdf1a8",
        "on-primary-fixed-variant": "#2d476f",
        "inverse-on-surface": "#f1f1ef",
        "on-tertiary-fixed": "#022100",
        "secondary-container": "#f0e1c7",
        "surface-tint": "#465f88",
        "on-primary-container": "#708ab5",
        "surface-container-lowest": "#ffffff",
        "inverse-primary": "#aec7f6",
        "regal-gold": "#D4AF37",
        "on-error": "#ffffff",
        "surface-container-high": "#e8e8e6",
        "primary-container": "#002147",
        "on-error-container": "#93000a",
        "on-background": "#1a1c1b",
        "on-primary": "#ffffff",
        "deep-emerald": "#1a237e",
        "primary": "#000a1e",
        "surface-dim": "#dadad8",
        "outline-variant": "#c4c6cf",
        "secondary-fixed-dim": "#d3c5ac",
        "primary-fixed-dim": "#aec7f6",
        "error-container": "#ffdad6",
        "surface-bright": "#f9f9f7",
        "background": "#f9f9f7",
        "error": "#ba1a1a",
        "tertiary-container": "#032800",
        "on-secondary": "#ffffff",
        "surface-container-low": "#f4f4f2",
        "secondary": "#675d49",
        "tertiary": "#010e00",
        "on-secondary-fixed-variant": "#4f4633",
        "surface-container": "#eeeeec",
        "outline": "#74777f",
        "on-tertiary-fixed-variant": "#25501a",
        "on-tertiary-container": "#669556",
        "on-surface-variant": "#44474e",
        "surface": "#f9f9f7",
        "inverse-surface": "#2f3130"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem", /* Adjusted for consistent border radius */
        "lg": "0.5rem", /* Adjusted for consistent border radius */
        "xl": "0.75rem", 
        "full": "9999px" 
      },
      "spacing": {
        "unit": "4px", /* Adjusted for consistent spacing */
        "gutter": "24px", /* Adjusted for consistent gutter spacing */
        "margin-mobile": "12px", /* Adjusted for mobile devices */
        "margin-desktop": "10px", /* Adjusted for desktop devices */
        "stack-sm": "4px", /* Adjusted for small spacing */
        "stack-md": "8px", /* Adjusted for medium spacing */
        "stack-lg": "22px"  /* Adjusted for large spacing */
      },
      "fontFamily": {
        "label-sm": ["Montserrat", "Open Sans", "sans-serif"],
        "body-lg": ["Montserrat", "Open Sans", "sans-serif"],
        "label-md": ["Montserrat", "Open Sans", "sans-serif"],
        "body-md": ["Montserrat", "Open Sans", "sans-serif"],
        "headline-sm": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "display-lg": ["Playfair Display", "serif"],
        "display-lg-mobile": ["Playfair Display", "serif"]
      },
      "fontSize": {
        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }], 
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "display-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
      }
    }
  }
}
