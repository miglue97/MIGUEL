module.exports = {
  presets: [
    '@babel/preset-env',  // Para la compatibilidad con ES6 y versiones más nuevas
    '@babel/preset-react' // Para poder usar JSX
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // Para optimizar el código y evitar repeticiones
  ]
};