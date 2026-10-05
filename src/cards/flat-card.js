/**
 * Flat card — archived snapshot of the live step card before the angle pass.
 *
 * NOT imported by main.js. To preview later:
 *   1. import { flatCardMarkup } from './cards/flat-card.js'
 *   2. import './cards/flat-card.css' from main or main.css
 *   3. insert flatCardMarkup(...) into the DOM
 *
 * Assets: /assets/d-card/card-bg.png, bar-nts.png, sb-graph.png
 */

/** @param {number} stepNum @param {string} title */
export function flatCardMarkup(stepNum, title) {
  const label = String(stepNum).padStart(2, '0')
  return `
    <div class="step-card-wrap">
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
