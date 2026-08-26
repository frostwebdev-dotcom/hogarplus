# Illustrations

Original artwork drawn for HogarPlus Solutions. **These are not placeholders** —
unlike `public/images/`, nothing here is waiting to be replaced. Keep them, or
retire them once the client has photography of their own crew.

| File | Used by |
| --- | --- |
| `team-hero.svg` | Homepage hero, right column from `lg` up (`components/home/Hero.tsx`) |
| `service-residential.svg` | Service card — Residential (`data/services.ts`) |
| `service-commercial.svg` | Service card — Commercial |
| `service-deep.svg` | Service card — Deep cleaning |
| `service-organization.svg` | Service card — Organization |
| `service-move.svg` | Service card — Move in / move out |
| `service-custom.svg` | Service card — Customized plans |

## Drawing conventions

- **The crew is Colombian.** Figures are warm-toned (`#C98A5E`, `#B0764E`) with
  dark hair (`#2B1B12`). Do not lighten them.
- **The uniform is a T-shirt** — never a maid's dress, apron or coveralls — with
  a white house-and-sparkle mark on the chest.
- **Palette is the site's own**, from `tailwind.config.ts`: navy `#071B4D` /
  `#0D255F`, brand blue `#2A7DFF`, purple `#845EF7`, orchid `#C06CFF`.
- `team-hero.svg` has a **transparent background** because it sits on the navy
  hero. The service illustrations carry their own light `#EEF3FA` field because
  they sit on white cards.
- Rendered with plain `<img>`, not `next/image`: the optimizer does nothing for
  a vector and would need `dangerouslyAllowSVG`.

The six service files are generated from one script so the figure geometry and
palette stay identical across the set; the hero is hand-tuned.
