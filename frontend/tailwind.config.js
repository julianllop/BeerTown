import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "ts-lime": "#cbcfa373",
                paper: "rgb(254, 255, 248)",
            },
            gridTemplateColumns: {
                auto: "repeat(auto-fill, minmax(250px, 1fr))",
            },
            dropShadow: {
                title: "0 3px 3px rgba(0, 0, 0, 0.75)",
            },
        },
        fontFamily: {
            lato: ["Lato", "sans-serif"],
        },
        fontSize: {
            "2xl": "1.5rem",
            "3xl": "2rem",
            "4xl": "3rem",
            "5xl": "5rem",
        },
    },
    plugins: [],
});
