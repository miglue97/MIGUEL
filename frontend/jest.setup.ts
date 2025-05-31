import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Polyfill de TextEncoder/TextDecoder para que Jest funcione correctamente
  setupFiles: ['./jest.setup.js'], // Asegúrate de usar la ruta correcta

  // Configuración para la cobertura de código
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // Configurar el entorno de prueba como "jsdom"
  testEnvironment: 'jsdom',

  // Otras configuraciones que puedes ajustar según sea necesario
  clearMocks: true,
};

export default config;
