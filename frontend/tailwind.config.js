import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "ts-lime": "#cbcfa373",
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
    },
    plugins: [],
});
