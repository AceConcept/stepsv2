import { bindDocumentScale } from './scale.js'
import { STEPS } from './data/steps.js'
import './styles/main.css'

const TICK_HEIGHTS = [
  '2.125rem',
  '0.875rem',
  '6.25rem',
  '1.5rem',
  '3.125rem',
  '3.125rem',
  '5.25rem',
  '3.125rem',
  '3.125rem',
  '5.0625rem',
]

function tickMarkup() {
  return TICK_HEIGHTS.map(
    (h) => `<span class="left-sidebar-tick" style="--tick-h: ${h}"></span>`,
  ).join('')
}

const pad2 = (n) => String(n).padStart(2, '0')

/** Waypoint shell protocol (parent page ↔ this app when embedded in an iframe). */
const PARENT_SET_STEP = 'atencium-set-step'
const PARENT_REQUEST_STEP = 'atencium-request-step'
const PARENT_STEP_CHANGED = 'atencium-step-changed'

function notifyParentStep(step) {
  if (window.parent === window) return
  window.parent.postMessage({ type: PARENT_STEP_CHANGED, step }, '*')
}

/** Infinite column: 3 identical sets; the active card always settles in the middle one. */
const CARD_SETS = 3
const MIDDLE_SET = 1

function cardColumnMarkup() {
  const n = STEPS.length
  return Array.from({ length: CARD_SETS * n }, (_, i) =>
    stepCardMarkup(i, (i % n) + 1, STEPS[i % n].title, Math.floor(i / n) !== MIDDLE_SET),
  ).join('')
}

function switcherStepsMarkup() {
  return STEPS.map(
    (_, i) =>
      `<button type="button" class="step-switcher-step" role="listitem" data-step="${i}">${pad2(i + 1)}</button>`,
  ).join('')
}

function waypointBodyMarkup(step) {
  return step.body.map((p) => `<p>${p}</p>`).join('')
}

function stepCardMarkup(slot, stepNum, title, isRepeat) {
  const label = pad2(stepNum)
  return `
    <div class="step-card-wrap" data-card="${slot}"${isRepeat ? ' aria-hidden="true"' : ''}>
      <div class="step-card-side" aria-hidden="true">
        <div class="step-card-side-track">
          <img class="step-card-side-graph" src="/assets/d-card/sb-graph.png" alt="" />
        </div>
      </div>
      <article class="step-card" aria-label="Step ${stepNum}">
        <img class="step-card-bars" src="/assets/d-card/bar-nts.png" alt="" aria-hidden="true" />
        <div class="step-card-body">
          <div class="step-card-copy">
            <p class="step-card-kicker">Step ${stepNum}</p>
            <h3 class="step-card-title">${title}</h3>
          </div>
        </div>
        <div class="step-card-graphic" aria-hidden="true">
          <span class="step-card-num">Step ${label}</span>
        </div>
      </article>
      <div class="step-card-side" aria-hidden="true"></div>
    </div>
  `
}

/** Figma Motion–style loop: measure one set so the belt seams cleanly. */
function bindTickConveyor() {
  const track = document.querySelector('.left-sidebar-ticks-track')
  if (!track || track.children.length < 2) return

  const updateShift = () => {
    const setSize = track.children.length / 2
    const shift = track.children[setSize].offsetTop
    track.style.setProperty('--conveyor-shift', `${shift}px`)
  }

  updateShift()
  let frame = 0
  const onResize = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(updateShift)
  }
  window.addEventListener('resize', onResize)
  return () => {
    window.removeEventListener('resize', onResize)
    cancelAnimationFrame(frame)
  }
}

const root = document.getElementById('root')

root.innerHTML = `
  <div class="app-shell">
    <div class="luna-root">
      <div class="luna-canvas-row" aria-label="Artboard 1920 by 920">
        <div class="left-sidebar" aria-hidden="true">
          <div class="left-sidebar-ticks">
            <div class="left-sidebar-ticks-track">
              ${tickMarkup()}
              ${tickMarkup()}
            </div>
          </div>
        </div>
        <div class="left-sidebar-panel">
          <nav class="step-switcher" aria-label="Step switcher">
            <button type="button" class="step-switcher-arrow" data-dir="-1" aria-label="Previous step">
              <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
                <path d="M1 6.5 L6 1.5 L11 6.5" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="step-switcher-steps" role="list">
              ${switcherStepsMarkup()}
            </div>
            <button type="button" class="step-switcher-arrow" data-dir="1" aria-label="Next step">
              <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
                <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </nav>
        </div>
        <div class="waypoint-anchor">
          <div class="left-sidebar-overhang" aria-hidden="true"></div>
          <div class="waypoint-copy">
            <div class="waypoint-copy-head">
              <p class="waypoint-copy-label">Steps Waypoint</p>
              <h2 class="waypoint-copy-title" data-step-title>${STEPS[0].title}</h2>
            </div>
            <div class="waypoint-copy-body" data-step-body aria-live="polite">
              ${waypointBodyMarkup(STEPS[0])}
            </div>
          </div>
        </div>
        <aside class="status-badge" aria-label="Active step">
          <div class="status-badge-active">
            <span class="status-badge-mark" aria-hidden="true"></span>
            <span class="status-badge-active-label">ACTIVE</span>
          </div>
          <div class="status-badge-panel">
            <div class="status-badge-title-row">
              <span class="status-badge-title">Steps Waypoint</span>
              <span class="status-badge-mark" aria-hidden="true"></span>
            </div>
            <span class="status-badge-index" data-status-index>1</span>
          </div>
        </aside>
        <div class="step-card-row">
          <div class="step-card-anchor">
            <div class="step-card-stack">
              ${cardColumnMarkup()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`

bindDocumentScale()
bindTickConveyor()
bindStepSwitcher()

function bindStepSwitcher() {
  const root = document.querySelector('.step-switcher')
  if (!root) return

  const steps = [...root.querySelectorAll('.step-switcher-step')]
  const indexEl = document.querySelector('[data-status-index]')
  const titleEl = document.querySelector('[data-step-title]')
  const bodyEl = document.querySelector('[data-step-body]')
  const cardRow = document.querySelector('.step-card-row')
  const cardStack = document.querySelector('.step-card-stack')
  const cards = [...document.querySelectorAll('.step-card-wrap[data-card]')]
  const n = steps.length
  let active = steps.findIndex((s) => s.classList.contains('is-active'))
  if (active < 0) active = 0
  /** Slot in the full 3-set column; may leave the middle set until the slide ends. */
  let slot = MIDDLE_SET * n + active

  const render = () => {
    steps.forEach((step, i) => {
      const on = i === active
      step.classList.toggle('is-active', on)
      if (on) step.setAttribute('aria-current', 'step')
      else step.removeAttribute('aria-current')
    })
    if (indexEl) indexEl.textContent = String(active + 1)
    if (titleEl) titleEl.textContent = STEPS[active].title
    if (bodyEl) bodyEl.innerHTML = waypointBodyMarkup(STEPS[active])
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === slot)
      const distance = Math.abs(i - slot)
      card.classList.toggle('is-near', distance === 1)
      card.classList.toggle('is-dimmed', distance > 1)
      card.classList.toggle('is-selectable', distance >= 1 && distance <= 2)
    })
    cardRow?.style.setProperty('--active-card', String(slot))
  }

  /** Jump to the identical slot in the middle set with transitions off — visually a no-op. */
  const recentre = () => {
    if (!cardRow || Math.floor(slot / n) === MIDDLE_SET) return
    slot = MIDDLE_SET * n + active
    cardRow.classList.add('is-snapping')
    render()
    void cardRow.offsetHeight
    cardRow.classList.remove('is-snapping')
  }

  const moveBy = (delta, { notify = true } = {}) => {
    if (!delta) return
    recentre()
    slot += delta
    active = ((slot % n) + n) % n
    render()
    if (notify) notifyParentStep(active + 1)
  }

  render()

  window.addEventListener('message', (e) => {
    if (e.source !== window.parent || window.parent === window) return
    const type = e.data?.type
    if (type === PARENT_REQUEST_STEP) {
      notifyParentStep(active + 1)
      return
    }
    if (type !== PARENT_SET_STEP) return
    const target = Number(e.data.step) - 1
    if (!Number.isInteger(target) || target < 0 || target >= n) return
    moveBy(target - active, { notify: false })
  })

  cardStack?.addEventListener('transitionend', (e) => {
    if (e.target === cardStack && e.propertyName === 'transform') recentre()
  })

  cardStack?.addEventListener('click', (e) => {
    const card = e.target.closest('.step-card-wrap.is-selectable')
    if (card) moveBy(Number(card.dataset.card) - slot)
  })

  root.addEventListener('click', (e) => {
    const arrow = e.target.closest('.step-switcher-arrow')
    if (arrow) {
      moveBy(Number(arrow.dataset.dir))
      return
    }
    const step = e.target.closest('.step-switcher-step')
    if (step) moveBy(Number(step.dataset.step) - active)
  })
}
