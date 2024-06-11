module.exports = {
  // // 定位index.html文件
  //单独编译，命令 npx tailwindcss -i ./src/input.css -o ./dist/output.css

  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path according to your project structure
    './public/index.html',
    './public/result.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}