/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#000000",

                    secondary: "#adffee",

                    accent: "#1FB2A6",

                    neutral: "#191D24",

                    "base-100": "#FFFFFF",

                    info: "#3ABFF8",

                    success: "#36D399",

                    warning: "#FBBD23",

                    error: "#F87272",

                    
                },
            },
        ],
    },
    plugins: [require("daisyui")],
});
