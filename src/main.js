import { bindDocumentScale } from './scale.js'
import './styles/main.css'

const root = document.getElementById('root')

root.innerHTML = `
  <div class="app-shell">
    <div class="luna-root">
      <div class="luna-canvas-row" aria-label="Artboard 1920 by 917"></div>
    </div>
  </div>
`

bindDocumentScale()
