# Angled isometric cards

Build the card **flat first**, then tip it into 3D. Don’t design under transform — typography and spacing get hard to judge.

## 1. Make one flat card

Treat it like a normal UI card at design size (e.g. 480×280):

- Dark fill / gradient
- Top & bottom rules
- Step label + title
- Progress ticks
- Large step graphic on the right

No transforms yet. Get type, spacing, and assets right in 2D.

## 2. Put it in a 3D stage

Wrap the card in a parent with `perspective` so the browser has depth:

```css
.card-stage {
  perspective: 1200px; /* lower = stronger foreshortening */
  perspective-origin: 50% 40%;
}
```

## 3. Tip the card (the angle)

Apply a 3D rotate on the card itself — something in this family for the “leaned back / from above-right” look:

```css
.card {
  transform:
    rotateX(55deg)
    rotateZ(-35deg); /* or rotateY(...) for more side tilt */
  transform-style: preserve-3d;
}
```

Tune in this order:

1. **`rotateX`** — how much it lays back (the big angled feel)
2. **`rotateZ`** — the diagonal twist (bottom-left → top-right)
3. **`perspective`** — how dramatic the foreshortening is

Keep content as normal HTML inside; the whole flat card rotates as one piece.

## 4. Shadow after the angle

Add a soft drop shadow (or a separate blurred plane under the card) so it feels floated on the grid. Shadows look wrong if you lock them before the angle is right.

## 5. Duplicate into a diagonal stack

Once one card’s angle feels right, clone it and offset each one along the diagonal with `translate3d(x, y, z)` (or top/left). Same transform on every card; only position changes. That keeps the isometric look consistent.

## 6. Optional polish

- `transform-origin` if the pivot feels off
- Slight Z offsets so cards don’t z-fight
- Match the isometric grid to the same `rotateX` / `rotateZ` so the floor and cards share a vanishing feel

## Rule of thumb

**Design 100% flat → wrap in `perspective` → dial `rotateX` then `rotateZ` → shadow → stack.**

## Project notes

- Flat card work lives in the artboard as `.step-card` (no 3D until angle pass).
- When angling, prefer a `.step-card-stage` wrapper for `perspective`; keep transforms on `.step-card`.
- Pull exact degrees from Figma Dev Mode / Motion when available instead of guessing.
