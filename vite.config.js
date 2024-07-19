import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

function reactVirtualized() {
  return {
    name: 'my:react-virtualized',
    configResolved() {
      const file = require
        .resolve('react-virtualized')
        .replace(
          path.join('dist', 'commonjs', 'index.js'),
          path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js')
        );
      const code = fs.readFileSync(file, 'utf-8');
      const modified = code.replace(WRONG_CODE, '');
      fs.writeFileSync(file, modified);
    },
  };
}

export default defineConfig({
  plugins: [react(), reactVirtualized()],
  // Define the entry point for your application
  root: 'src', // Assuming your App.js is in the 'src' directory
  build: {
    outDir: '../docs', // Specify the output directory for the build
    emptyOutDir: true // Ensure the output directory is empty before building
  }
});
