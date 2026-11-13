// GitHub Pages has no SPA rewrites: serve the app for deep links via 404.html.
import { copyFileSync, writeFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
writeFileSync('dist/.nojekyll', '')
console.log('postbuild: wrote 404.html and .nojekyll')
