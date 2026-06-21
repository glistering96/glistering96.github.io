# Redrawn asset figures

This folder contains SVG redraws of the portfolio figure assets. The goal is to keep the visual language consistent with the current site: light background, blue accent, rounded cards, and architecture-style flow diagrams.

## Source mapping

### `index.html`

| Source figure/reference | Redrawn SVG |
| --- | --- |
| `assets/source/problem_solving_be_pptx_extract/figures/car-passage-graph-example.png` | `car-passage-graph-example.svg` |
| HTML/CSS `.model-interface-diagram` figure | `model-interface-diagram.svg` |
| `assets/source/problem_solving_be_pptx_extract/figures/car-async-callback-architecture.png` | `car-async-callback-architecture.svg` |
| `assets/source/problem_solving_be_pptx_extract/figures/car-scaleout-queue-redis-architecture-white.png` | `car-scaleout-queue-redis-architecture-white.svg` |
| `assets/source/original_images/AI Agent Platform Figure (2).png` | `ai-agent-platform-runtime.svg` |
| `assets/source/problem_solving_be_pptx_extract/figures/freight-self-merge-filtering.png` | `freight-self-merge-filtering.svg` |
| `assets/source/problem_solving_be_pptx_extract/figures/dispatch-product-vehicle-mapping-flow.png` | `dispatch-product-vehicle-mapping-flow.svg` |
| `assets/source/problem_solving_be_pptx_extract/figures/k8s-ai-service-platform-overview.png` | `k8s-ai-service-platform-overview.svg` |

### `cases/car-carrier.html`

| Source figure/reference | Redrawn SVG |
| --- | --- |
| `../assets/figures/car-domain-overview.png` | `car-domain-overview.svg` |
| `../assets/figures/car-graph-model.png` | `car-graph-model.svg` |
| `../assets/figures/car-floor-space-4-6.png` | `car-floor-space-4-6.svg` |
| `../assets/figures/car-data-model.png` | `car-data-model.svg` |
| `../assets/figures/car-callback-queue.png` | `car-callback-queue.svg` |
| `../assets/figures/car-scaleout-asis.png` | `car-scaleout-asis.svg` |
| `../assets/figures/car-scaleout-tobe.png` | `car-scaleout-tobe.svg` |
| `../assets/figures/car-standard-data-model.png` | `car-standard-data-model.svg` |
| `../assets/figures/car-lessons-data-contract.png` | `car-lessons-data-contract.svg` |

## Notes

- These are static SVG redraws, not pixel-perfect copies of the original raster images.
- Text is kept editable inside SVG files.
- The files are not wired into `index.html` or the case pages yet; they are stored separately so the original assets remain unchanged.
