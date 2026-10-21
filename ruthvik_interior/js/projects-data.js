/**
 * Ruthvik Interior Studios - Project Portfolio Data Architecture
 * 
 * Centralised, accessible data source for portfolio gallery items.
 * Distinguishes truthfully between verified completed work and architectural design concepts.
 */

const PROJECTS_DATA = [
  {
    id: 'living-lounge-luxury',
    title: 'Curved Bouclé Lounge & Architectural Wood Panelling',
    category: 'living',
    categoryLabel: 'Living Room',
    image: 'assets/new_images/living_lounge_luxury.jpeg',
    alt: 'Grand luxury living room with curved cream boucle sectional sofa, warm terracotta velvet cushions, and fluted wood feature wall with cove lighting',
    shortDesc: 'Curved low-slung bouclé sectional, fluted timber acoustic wall articulation with warm LED cove profile, and floor-to-ceiling balcony glazing.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'wide',
    gridSpan: 'span-12',
    tags: ['Living Architecture', 'Fluted Joinery', 'Cove Lighting']
  },
  {
    id: 'pooja-mandir-sacred',
    title: 'Sacred Teakwood Mandir with Backlit Jaali Articulation',
    category: 'pooja',
    categoryLabel: 'Pooja Room',
    image: 'assets/new_images/pooja_mandir_concept.jpeg',
    alt: 'Sacred contemporary Indian pooja room with carved teakwood jaali screens, suspended brass bells, and backlit onyx marble altar',
    shortDesc: 'Dedicated sacred mandir crafted with intricate teakwood jaali screens, suspended brass bells, and a backlit translucent marble altar.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'portrait',
    gridSpan: 'span-5',
    tags: ['Sacred Mandir', 'Teakwood Jaali', 'Backlit Marble']
  },
  {
    id: 'modular-kitchen-island',
    title: 'Bespoke Terracotta & Quartz Modular Kitchen',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchen',
    image: 'assets/new_images/modular_kitchen_concept.jpeg',
    alt: 'Contemporary Indian modular kitchen with terracotta fluted cabinets, calacatta quartz waterfall island, and warm under-cabinet lighting',
    shortDesc: 'Parallel kitchen layout with fluted terracotta and champagne laminate cabinetry, calacatta waterfall island, and integrated appliances.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'landscape',
    gridSpan: 'span-7',
    tags: ['Modular Kitchen', 'Waterfall Island', 'Fluted Profile']
  },
  {
    id: 'living-dining-credenza',
    title: 'Warm Terracotta Credenza & Dining Transition',
    category: 'dining',
    categoryLabel: 'Dining Room',
    image: 'assets/new_images/living_area_2.jpeg',
    alt: 'Real completed interior project featuring custom terracotta curved credenza, solid wood dining table, and dimpled acoustic ceiling coffers',
    shortDesc: 'Executed dining space featuring bespoke curved credenza joinery in burnt terracotta, solid teak dining suite, and dimpled ceiling coffers.',
    provenance: 'Completed Client Project',
    isRealProject: true,
    aspect: 'portrait',
    gridSpan: 'span-5',
    tags: ['Completed Build', 'Custom Credenza', 'Teakwood']
  },
  {
    id: 'artisan-wardrobe-carpentry',
    title: 'Artisan Botanical Wardrobe & Bedroom Carpentry',
    category: 'wardrobe',
    categoryLabel: 'Wardrobes & Storage',
    image: 'assets/new_images/bed_room_carpentry.jpeg',
    alt: 'Real completed client carpentry featuring floor-to-ceiling wardrobe with botanical arched panel inlays, brass hardware, and turned wood bed',
    shortDesc: 'Handcrafted floor-to-ceiling wardrobe cabinetry with curved botanical insets, solid brass pulls, and traditional turned-wood bedstead.',
    provenance: 'Completed Client Project',
    isRealProject: true,
    aspect: 'portrait',
    gridSpan: 'span-7',
    tags: ['Completed Build', 'Artisan Joinery', 'Botanical Inlays']
  },
  {
    id: 'master-suite-arched',
    title: 'Regal Master Suite with Arched Murals',
    category: 'bedroom',
    categoryLabel: 'Master Bedroom',
    image: 'assets/new_images/bed_room_1.jpeg',
    alt: 'Regal master bedroom suite with arched wall moldings framing monochrome tree murals, fluted mauve velvet headboard, and glass chandelier',
    shortDesc: 'Triple arched architectural mouldings framing monochrome forest murals, extra-wide fluted velvet headboard, and bespoke nightstands.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'square',
    gridSpan: 'span-6',
    tags: ['Master Suite', 'Arched Murals', 'Fluted Velvet']
  },
  {
    id: 'master-suite-terracotta',
    title: 'Warm Terracotta Master Bedroom Retreat',
    category: 'bedroom',
    categoryLabel: 'Master Bedroom',
    image: 'assets/new_images/bed_room_2.jpeg',
    alt: 'Master bedroom with fluted wall paneling, curved terracotta velvet headboard, scenic landscape mural, and mirrored oak wardrobes',
    shortDesc: 'Restful master suite featuring terracotta velvet curved headboard, scenic landscape art panel, and integrated oak wardrobe joinery.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'portrait',
    gridSpan: 'span-6',
    tags: ['Bedroom Retreat', 'Terracotta Velvet', 'Integrated Storage']
  },
  {
    id: 'kids-bedroom-sanctuary',
    title: 'Contemporary Kids’ Bedroom & Study Nook',
    category: 'kids',
    categoryLabel: 'Kids’ Bedroom',
    image: 'assets/new_images/kids_bedroom_concept.jpeg',
    alt: 'Warm and functional kids bedroom with built-in light oak study desk, platform bed, and illuminated arched niches in soft terracotta and linen',
    shortDesc: 'Warm oak study desk with integrated book storage, low platform bed, and illuminated dual arched display niches in soft terracotta.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'landscape',
    gridSpan: 'span-6',
    tags: ['Kids’ Bedroom', 'Study Architecture', 'Arched Niches']
  },
  {
    id: 'master-ensuite-terrazzo',
    title: 'Bespoke Terrazzo & Fluted Oak Ensuite',
    category: 'bathroom',
    categoryLabel: 'Bathroom',
    image: 'assets/new_images/luxury_bathroom_concept.jpeg',
    alt: 'Luxury master ensuite bathroom with warm terrazzo wall, fluted oak floating vanity, dual arched backlit mirrors, and brushed brass fixtures',
    shortDesc: 'Spa-inspired master ensuite with dual backlit arched mirrors, fluted oak floating vanity, and frameless fluted glass shower screen.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'portrait',
    gridSpan: 'span-6',
    tags: ['Master Ensuite', 'Terrazzo & Oak', 'Backlit Mirrors']
  },
  {
    id: 'foyer-entrance-console',
    title: 'Warm Fluted Foyer with Travertine Console',
    category: 'foyer',
    categoryLabel: 'Foyer & Entrance',
    image: 'assets/new_images/foyer_entrance_concept.jpeg',
    alt: 'Welcoming apartment entrance foyer with vertical fluted timber wall, floating curved travertine console, and arched backlit mirror',
    shortDesc: 'Welcoming entrance gallery featuring vertical fluted timber panelling, floating curved travertine console, and warm backlit arched mirror.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'portrait',
    gridSpan: 'span-4',
    tags: ['Foyer Gallery', 'Travertine Console', 'Arched Mirror']
  },
  {
    id: 'balcony-garden-retreat',
    title: 'Biophilic Twilight Balcony & Timber Decking',
    category: 'balcony',
    categoryLabel: 'Balcony & Outdoor',
    image: 'assets/new_images/balcony_garden_concept.jpeg',
    alt: 'High-rise apartment balcony garden with teak composite decking, vertical green wall with LED lighting, fluted bench with terracotta cushions, and city view',
    shortDesc: 'Urban apartment outdoor sanctuary with natural teak composite decking, lush vertical living wall, and custom fluted banquette seating.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'landscape',
    gridSpan: 'span-4',
    tags: ['Biophilic Balcony', 'Vertical Garden', 'Timber Decking']
  },
  {
    id: 'walkin-wardrobe-dressing',
    title: 'Luxury Walk-In Wardrobe & Dressing Suite',
    category: 'wardrobe',
    categoryLabel: 'Wardrobes & Storage',
    image: 'assets/new_images/walkin_wardrobe_concept.jpeg',
    alt: 'Custom luxury walk-in wardrobe with fluted dark oak and tinted glass doors, warm integrated LED profile lights, center island, and arched mirror',
    shortDesc: 'Bespoke dressing room with fluted oak and tinted glass wardrobes, vertical warm LED profile lighting, and a marble-topped accessory island.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'portrait',
    gridSpan: 'span-4',
    tags: ['Walk-In Closet', 'Tinted Glass', 'Profile Illumination']
  },
  {
    id: 'formal-dining-suite',
    title: 'Grand Formal Dining Suite with Crystal Luminaire',
    category: 'dining',
    categoryLabel: 'Dining Room',
    image: 'assets/new_images/formal_dining_concept.jpeg',
    alt: 'Grand formal dining room with long calacatta marble dining table, curved velvet chairs, modern crystal chandelier, and dark fluted wood wall',
    shortDesc: 'High-ceiling formal dining suite featuring calacatta gold marble table, modern crystal raindrop chandelier, and fluted timber wall accents.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'landscape',
    gridSpan: 'span-6',
    tags: ['Formal Dining', 'Crystal Luminaire', 'Marble Table']
  },
  {
    id: 'master-suite-heritage',
    title: 'Heritage Burgundy Arched Wainscoting Suite',
    category: 'bedroom',
    categoryLabel: 'Master Bedroom',
    image: 'assets/new_images/bed_room_4.jpeg',
    alt: 'Heritage master bedroom suite with rich burgundy fluted headboard wainscoting, vintage pendant lights, and patterned textiles',
    shortDesc: 'Rich burgundy fluted headboard wainscoting, textured wallpaper panels, vintage pendant luminaires, and patterned botanical textiles.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'portrait',
    gridSpan: 'span-6',
    tags: ['Heritage Luxury', 'Wainscoting', 'Pendant Lighting']
  },
  {
    id: 'modular-kitchen-led',
    title: 'High-Performance Modular Kitchen Architecture',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchen',
    image: 'assets/new_images/package_mid.jpeg',
    alt: 'Contemporary luxury modular kitchen with handleless gloss base cabinets, warm LED strip lighting, and grey veined marble countertops',
    shortDesc: 'Handleless cabinetry with integrated warm LED profile illumination, marble splashback, and German soft-close fittings.',
    provenance: 'Design Concept & 3D Visualization',
    isRealProject: false,
    aspect: 'portrait',
    gridSpan: 'span-6',
    tags: ['Modular Kitchen', 'LED Profiles', 'Precision Joinery']
  }
];

if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
