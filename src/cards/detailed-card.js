/**
 * Detailed card — archived variant (heavy assets).
 *
 * NOT imported by main.js on purpose so lined-rect / pixel-circle
 * never load on the live page. To preview later:
 *   1. import { detailedCardMarkup } from './cards/detailed-card.js'
 *   2. import './cards/detailed-card.css' from main or main.css
 *   3. insert detailedCardMarkup(...) into the DOM
 *
 * Assets: /assets/d-card/2nd-crd-bg.png, lined-rect.svg, pixel circle.svg
 */

/** @param {number} stepNum @param {string} title */
export function detailedCardMarkup(stepNum, title) {
  const label = String(stepNum).padStart(2, '0')
  return `
    <div class="step-card-wrap">
      <div class="step-card-side" aria-hidden="true"></div>
      <article class="step-card step-card--detailed" aria-label="Step ${stepNum}">
        <img class="step-card-lined" src="/assets/d-card/lined-rect.svg" alt="" aria-hidden="true" />
        <img class="step-card-pixel" src="/assets/d-card/pixel%20circle.svg" alt="" aria-hidden="true" />
        <div class="step-card-body">
          <div class="step-card-progress" aria-hidden="true">
            <span class="step-card-pip"></span>
            <span class="step-card-pip is-active"></span>
            <span class="step-card-pip"></span>
            <span class="step-card-pip"></span>
          </div>
          <div class="step-card-copy">
            <p class="step-card-kicker">Step ${stepNum}</p>
            <h3 class="step-card-title">${title}</h3>
          </div>
        </div>
        <div class="step-card-graphic" aria-hidden="true">
          <span class="step-card-num">${label}</span>
        </div>
      </article>
      <div class="step-card-side" aria-hidden="true"></div>
    </div>
  `
}
