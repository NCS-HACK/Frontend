module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // Indigo
                accent: '#10B981',  // Emerald
                secondary: '#F59E42', // Amber
                background: '#F3F4F6', // Light Gray
                surface: '#FFFFFF',
                text: '#1E293B', // Slate
                error: '#F43F5E', // Rose
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
}; 