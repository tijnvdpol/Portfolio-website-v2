import { execSync } from 'node:child_process'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Datum van de laatste commit (ISO, YYYY-MM-DD); bij een build zonder git de builddatum.
function lastChangedDate(): string {
  try {
    const out = execSync('git log -1 --format=%cs', { stdio: ['ignore', 'pipe', 'ignore'] })
    return out.toString().trim() || new Date().toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __LAST_CHANGED__: JSON.stringify(lastChangedDate()),
  },
})
