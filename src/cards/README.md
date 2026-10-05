# Cards

| File | Role |
|---|---|
| `detailed-card.js` / `detailed-card.css` | **Detailed card** archive — not wired into the live app |
| `flat-card.js` / `flat-card.css` | **Flat card** archive — live card snapshot before the angle pass |

Heavy assets (`pixel circle.svg` ~673KB, etc.) only load if you import these files.
Keep them out of `main.js` / `main.css` for production performance.
