const heroRoofSky = '/images/optimized/hero/hanok-roof-sky.jpg';
const heroVillageOverlook = '/images/optimized/hero/hanok-village-overlook.jpg';

const hanokGateClose = '/images/optimized/architecture/hanok-gate-close.jpg';
const hanokCurvedRoof = '/images/optimized/architecture/hanok-curved-roof.jpg';
const bukchonBlueSkyStreet = '/images/optimized/architecture/bukchon-blue-sky-street.jpg';
const bukchonWoodenGateStreet = '/images/optimized/architecture/bukchon-wooden-gate-street.jpg';

const hanokWoodCorridor = '/images/optimized/interior/hanok-wood-corridor.jpg';
const hanokHanjiDoor = '/images/optimized/interior/hanok-hanji-door.jpg';
const traditionalHouseInteriorStudy = '/images/optimized/interior/traditional-house-interior-study.jpg';

const hanokPaintedPattern = '/images/optimized/details/hanok-painted-pattern.jpg';
const hanokCourtyardDetail = '/images/gallery/hanok-courtyard-detail.jpg';
const bukchonTraditionalHousePortrait = '/images/optimized/gallery/bukchon-traditional-house-portrait.jpg';
const bukchonHanokVillageCc0 = '/images/optimized/gallery/bukchon-hanok-village-cc0.jpg';

export type ImageCredit = {
  label: string;
  author?: string;
  license?: string;
  source?: string;
};

export const IMAGE_CREDITS: ImageCredit[] = [
  {
    label: 'Bukchon-ro 11-gil street views',
    author: 'Basile Morin',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Bukchon-ro_11-gil_street_with_hanok_houses_and_blue_sky_in_Bukchon_Hanok_Village_Seoul.jpg',
  },
  {
    label: 'Traditional Korean house interior',
    author: 'Adbar',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Interior_of_a_traditional_Korean_house.JPG',
  },
  {
    label: 'Korean Traditional House',
    author: 'Timothy Ries',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Korean_Traditional_House_(Unsplash).jpg',
  },
  {
    label: 'Bukchon Hanok Village 03',
    author: 'Bgag',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Bukchon_Hanok_Village_03.jpg',
  },
];

export const IMAGE_HERO = heroRoofSky;
export const IMAGE_INTERIOR = [traditionalHouseInteriorStudy, hanokWoodCorridor, hanokHanjiDoor];
export const IMAGE_ARCHITECTURE = [bukchonBlueSkyStreet, hanokGateClose, hanokCurvedRoof, bukchonWoodenGateStreet];
export const IMAGE_GALLERY = [hanokCourtyardDetail, bukchonTraditionalHousePortrait, bukchonHanokVillageCc0];
export const IMAGE_HOME = [heroVillageOverlook];

export const NAV_ITEMS = [
  {
    name: 'Home',
    id: 'home',
    image: heroVillageOverlook,
    kicker: 'Begin',
  },
  {
    name: 'Architecture',
    id: 'architecture',
    image: bukchonBlueSkyStreet,
    kicker: 'Structure',
  },
  {
    name: 'Interior',
    id: 'interior',
    image: traditionalHouseInteriorStudy,
    kicker: 'Warmth',
  },
  {
    name: 'Gallery',
    id: 'gallery',
    image: bukchonTraditionalHousePortrait,
    kicker: 'Moments',
  },
];

export const HERO_INDEX_ITEMS = [
  {
    number: '01',
    title: 'Architecture',
    id: 'architecture',
    image: bukchonBlueSkyStreet,
    description: 'Rooflines, gates, and village streets shaped by balance.',
  },
  {
    number: '02',
    title: 'Interior',
    id: 'interior',
    image: traditionalHouseInteriorStudy,
    description: 'Paper, timber, and warmth arranged for quiet daily rituals.',
  },
  {
    number: '03',
    title: 'Gallery',
    id: 'gallery',
    image: bukchonTraditionalHousePortrait,
    description: 'A cinematic sequence of details, textures, and thresholds.',
  },
];

export const INTRO_PRINCIPLES = [
  {
    label: 'Earth',
    title: 'Placed, not imposed',
    description: 'Hanok sits with the slope and the wind, letting the land decide how the home should breathe.',
  },
  {
    label: 'Light',
    title: 'Filtered into calm',
    description: 'Hanji softens daylight so rooms feel warm without losing their quiet shadow.',
  },
  {
    label: 'Warmth',
    title: 'Life close to the floor',
    description: 'Ondol heat turns the ground plane into a place for rest, meals, conversation, and sleep.',
  },
];

export const ARCHITECTURE_ITEMS = [
  {
    title: 'Blue Hour Street',
    description: 'A quiet Bukchon lane stretches between tile roofs, turning the village into a soft architectural corridor.',
    image: bukchonBlueSkyStreet,
    alt: 'Bukchon Hanok Village street under a blue sky',
    credit: 'Basile Morin / CC BY-SA 4.0',
  },
  {
    title: 'Curved Roofs',
    description: 'Rooflines lift gently toward the sky, softening the boundary between shelter, wind, and season.',
    image: hanokCurvedRoof,
    alt: 'Curved traditional Hanok roof detail',
  },
  {
    title: 'Painted Patterns',
    description: 'Dancheong color and crafted geometry preserve stories through rhythm, contrast, and repetition.',
    image: hanokPaintedPattern,
    alt: 'Traditional painted wood pattern on Hanok architecture',
  },
  {
    title: 'Wooden Threshold',
    description: 'A gate frames the passage from street to home, making arrival feel intimate and ceremonial.',
    image: bukchonWoodenGateStreet,
    alt: 'Hanok houses and wooden gate along a Bukchon street',
    credit: 'Basile Morin / CC BY-SA 4.0',
  },
];

export const ARCHITECTURE_FEATURES = [
  {
    eyebrow: 'Structure',
    title: 'The roof carries the silhouette',
    description: 'Tile, timber, and eaves create a line that feels both protective and light.',
  },
  {
    eyebrow: 'Threshold',
    title: 'Every entrance slows the body',
    description: 'A gate, a step, and a courtyard make arrival feel like a transition rather than a shortcut.',
  },
  {
    eyebrow: 'Pattern',
    title: 'Detail holds memory',
    description: 'Color and joinery turn construction into ornament without separating craft from function.',
  },
];

export const INTERIOR_POINTS = [
  'Hanji paper diffuses daylight into a soft, even glow.',
  'Wooden columns shape rooms without making them feel closed.',
  'Ondol warmth turns the floor into the heart of daily life.',
];

export const INTERIOR_NOTES = [
  {
    label: 'Sarangbang',
    description: 'A study-like room for receiving guests, reading, writing, and gathering around conversation.',
  },
  {
    label: 'Daecheong',
    description: 'A wooden hall that mediates between rooms and courtyard, open to air in warmer seasons.',
  },
  {
    label: 'Hanji',
    description: 'Paper doors temper the outside world, letting light arrive as atmosphere instead of glare.',
  },
];

export const GALLERY_ITEMS = [
  {
    label: 'Street',
    image: bukchonBlueSkyStreet,
    alt: 'Bukchon Hanok Village street with traditional houses',
    shape: 'wide',
    credit: 'Basile Morin / CC BY-SA 4.0',
  },
  {
    label: 'Portrait',
    image: bukchonTraditionalHousePortrait,
    alt: 'Portrait view of a traditional Korean house in Bukchon',
    shape: 'tall',
    credit: 'Timothy Ries / CC0',
  },
  {
    label: 'Gate',
    image: bukchonWoodenGateStreet,
    alt: 'Traditional Hanok wooden gate on a sloping street',
    shape: 'wide',
    credit: 'Basile Morin / CC BY-SA 4.0',
  },
  {
    label: 'Interior',
    image: traditionalHouseInteriorStudy,
    alt: 'Interior of a traditional Korean house study room',
    shape: 'wide',
    credit: 'Adbar / CC BY-SA 3.0',
  },
  {
    label: 'Roof',
    image: hanokCurvedRoof,
    alt: 'Layered curved Hanok roof detail',
    shape: 'tall',
  },
  {
    label: 'Pattern',
    image: hanokPaintedPattern,
    alt: 'Painted pattern detail under a Hanok roof',
    shape: 'tall',
  },
  {
    label: 'Village',
    image: bukchonHanokVillageCc0,
    alt: 'Bukchon Hanok Village street scene',
    shape: 'wide',
    credit: 'Bgag / CC0',
  },
  {
    label: 'Courtyard',
    image: hanokCourtyardDetail,
    alt: 'Hanok courtyard detail',
    shape: 'compact',
  },
];

export const GALLERY_MOMENTS = [
  'Rooflines fold into the sky.',
  'Wooden gates hold the rhythm of arrival.',
  'Rooms collect light instead of spectacle.',
  'Patterns make heritage visible at human scale.',
];

export const FOOTER_STORY_LINKS = [
  {
    label: 'Begin again',
    id: 'home',
  },
  {
    label: 'Study the architecture',
    id: 'architecture',
  },
  {
    label: 'Enter the interior',
    id: 'interior',
  },
  {
    label: 'View the gallery',
    id: 'gallery',
  },
];
