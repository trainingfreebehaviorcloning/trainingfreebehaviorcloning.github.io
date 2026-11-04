# Training-free Behavior Cloning

Research project website for **Training-free Behavior Cloning** by Maximilian
Adang, Timothy Chen, Lars Osterberg, Aiden Swann, and Mac Schwager, Stanford University.

- Website: https://trainingfreebehaviorcloning.github.io/
- Paper: https://arxiv.org/abs/2609.30134

## Local preview

This is a static website. No dependency installation or build is required.

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Edit `index.html`, `styles.css`, or `script.js` and refresh.

## GitHub Pages

The organization-site repository is
`trainingfreebehaviorcloning/trainingfreebehaviorcloning.github.io`.
GitHub Pages publishes from the **main** branch, **/ (root)** directory. The `.nojekyll` file lets GitHub
serve the static files directly.

To connect a custom domain later, add it in **Settings > Pages > Custom domain**
and configure its DNS record. Keep absolute metadata URLs in `index.html`
(canonical, `og:url`, and `og:image`) in sync with the final domain.

## Research assets

Figures and animations come from the authors' `ICRA_2027_Video.pptx` presentation.
The original result/plot PNGs are unmodified. The fitting/inference figure uses
a self-contained SVG to change its legend from “Training” to “Fitting” while
preserving the original plot image and all data. The method diagram is a render
of the original slide, with a 3840 × 2160 version for Retina displays. Demonstrations use smaller animated GIFs derived from the original clips.
The originals are retained in the repository. Still images appear while GIFs load
and for visitors who request reduced motion. See `asset-provenance.json` for
the source asset mapping and verification details. The complete presentation video is
excluded from the website. The hero uses the 19-second drone and
15.6-second manipulation clips. Header gradients and site accents use the
PowerPoint colors documented in `palette-provenance.json`.

The bank-edit case study uses matched saved-state visualizations from the
research project's figure materials. Both runs succeed. The intervention excludes
12 demonstrations while keeping the query, fitted modules, and normalizers fixed.

Author details, citation, and reported results follow arXiv:2609.30134v1. Research
paper content is available under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

The **Code** button refers to the research implementation and remains labelled
"Coming soon" until a public implementation link is supplied. This repository
contains the paper website.

## Design

Original HTML/CSS implementation inspired by the centered research-page layout
at https://singerpaper.github.io/ and the Nerfies academic project page. The site
credits the references and paper in its footer.
