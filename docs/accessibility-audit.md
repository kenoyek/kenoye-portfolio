# Accessibility Audit

Date: 2026-07-24

## Tooling Used

- Lighthouse 13.4.1 against local production preview.
- Headless Google Chrome screenshots with reduced-motion emulation.
- Manual screenshot review for dark and light themes.

## Routes Tested

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/admin/login`
- `/projects/not-a-project`
- `/unknown-route`

## Lighthouse Accessibility Scores

| Route     | Score |
| --------- | ----: |
| Home      |    93 |
| Asele     |    96 |
| TeachEasy |    96 |
| Reframe   |    96 |
| Blog      |    94 |

## Issues Found and Fixed

- Homepage 320px QA initially showed cropped hero text due to invalid screenshot tooling; the capture method was replaced with DevTools viewport emulation and the hero mobile type was tightened.
- The 404 return link had poor dark-theme contrast. It now uses the accent token.
- Blog cover images lacked stronger sizing and delivery hints. Images now include dimensions, sizes, decoding, priority for the first image, and Cloudinary optimization where applicable.

## Checks Passed

- One visible H1 per primary public route.
- Breadcrumbs use semantic navigation and `aria-current`.
- Contact form fields have visible labels.
- Admin login fields have visible labels.
- Focus styles are globally visible.
- Reduced motion is globally respected and was used during screenshot capture.
- Case-study status labels include text, not only color.
- Architecture diagrams include text connection lists.

## Remaining Limitations

- No axe-core automated audit was added in this milestone.
- Keyboard traversal was reviewed structurally and by component semantics, but not recorded as a full tab-order video.
- Blog HTML still renders trusted stored content through `dangerouslySetInnerHTML`; sanitization policy remains a recommended follow-up.
