// Shared grade definitions — single source of truth for the catalog detail
// view (short blurb + badge) and the customer-facing Grading Guide page
// (full explanations, example media, spec breakdown).
//
// To attach real media: set `videoUrl` (an .mp4 URL or a YouTube/Vimeo link)
// and give each `examples` entry a `src` (image URL). When these are null the
// page renders tasteful placeholders in their place.

export const GRADES = [
  {
    code: 'A',
    slug: 'grade-a',
    name: 'Grade A',
    tagline: 'Excellent — near flawless',
    badge: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    accent: '#16a34a', // green-600
    // Short line reused inside the catalog product-detail modal
    short: 'Excellent condition — minimal signs of use. Fully tested and verified functional.',
    summary:
      'Grade A is as close to new as a pre-owned device gets. Every unit is professionally cleaned, fully tested, and certified. Cosmetic imperfections are minimal and only visible on close inspection under bright light.',
    spec: {
      screen: 'No visible scratches on the display at arm’s length.',
      housing: 'Pristine to very light micro-marks only.',
      functional: 'Passes our full multi-point functional test — 100% operational.',
      battery: 'Battery health 90% or higher.',
    },
    highlights: [
      'Screen free of visible scratches',
      'Housing pristine to faint micro-marks',
      'Fully functionally tested & certified',
      'Battery health ≥ 90%',
    ],
    examples: [
      { view: 'Front', caption: 'Clean display — no visible scratches', src: null },
      { view: 'Back', caption: 'Housing pristine to faint micro-marks', src: null },
      { view: 'Edges', caption: 'Sharp corners, no dents or chips', src: null },
    ],
    videoUrl: null,
    poster: null,
  },
  {
    code: 'B',
    slug: 'grade-b',
    name: 'Grade B',
    tagline: 'Good — light to moderate wear',
    badge: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    accent: '#ca8a04', // yellow-600
    short: 'Good condition — light to moderate cosmetic wear. Fully tested and verified functional.',
    summary:
      'Grade B devices are the smart-value choice. They perform identically to higher grades — every unit passes the same full functional test — but show more visible signs of everyday use, which is reflected in the price.',
    spec: {
      screen: 'May show light scratches or faint marks that do not affect use.',
      housing: 'Visible scuffs, light scratches, or minor wear on the casing.',
      functional: 'Passes our full multi-point functional test — 100% operational.',
      battery: 'Battery health 80% or higher.',
    },
    highlights: [
      'Fully functional — same tests as Grade A',
      'Light scratches / scuffs on screen or housing',
      'Best value per unit',
      'Battery health ≥ 80%',
    ],
    examples: [
      { view: 'Front', caption: 'Faint marks possible, fully usable display', src: null },
      { view: 'Back', caption: 'Light scuffs and scratches on housing', src: null },
      { view: 'Edges', caption: 'Minor wear on corners and edges', src: null },
    ],
    videoUrl: null,
    poster: null,
  },
]

export const GRADE_BY_CODE = Object.fromEntries(GRADES.map((g) => [g.code, g]))
export const GRADE_BY_SLUG = Object.fromEntries(GRADES.map((g) => [g.slug, g]))

// Dimensions rendered in the side-by-side comparison table on the guide page.
export const COMPARE_ROWS = [
  { key: 'screen', label: 'Screen' },
  { key: 'housing', label: 'Housing' },
  { key: 'functional', label: 'Functionality' },
  { key: 'battery', label: 'Battery health' },
]
