/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
	  './components/**/*.{js,vue,ts}',
	  './layouts/**/*.vue',
    './pages/**/*.vue',
	  './app.vue',
  ],
  theme: {
    colors: {
      white: '#ffffff',
			background: '#f2f3f5',
			'gray-line': '#dcdde8',
			text: '#666666',
			'text-highlight': '#b3b9ff',
			title: '#2e384d',
			red: '#e83f5b',
			'red-dark': '#d13952',
			green: '#4cd62b',
			'green-dark': '#43c026',
			blue: '#5965e0',
			'blue-dark': '#4953b8',
			'blue-twitter': '#2aa9e0',
    },
    extend: {},
  },
  plugins: [],
}

