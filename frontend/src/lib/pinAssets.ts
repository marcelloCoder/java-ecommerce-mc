/** Lifestyle pins for home/editorial sections (not product catalog). */
export const PIN_ASSETS = {
  'pin-bistro-garden': '/pins/pin-bistro-garden.jpg',
  'pin-grass-portrait': '/pins/pin-grass-portrait.jpg',
  'pin-mushroom-bowl': '/pins/pin-mushroom-bowl.jpg',
  'pin-green-van': '/pins/pin-green-van.jpg',
  'pin-crochet-dress': '/pins/pin-crochet-dress.jpg',
  'pin-patio-dining': '/pins/pin-patio-dining.jpg',
  'pin-woven-textiles': '/pins/pin-woven-textiles.jpg',
  'pin-arched-living': '/pins/pin-arched-living.jpg',
  'pin-reader-armchair': '/pins/pin-reader-armchair.jpg',
  'pin-poolside-rattan': '/pins/pin-poolside-rattan.jpg',
  'pin-focaccia-flatlay': '/pins/pin-focaccia-flatlay.jpg',
  'pin-book-stack': '/pins/pin-book-stack.jpg',
  'pin-rattan-weave': '/pins/pin-rattan-weave.jpg',
  'pin-forest-cabin': '/pins/pin-forest-cabin.jpg',
  'pin-cutting-boards': '/pins/pin-cutting-boards.jpg',
  'pin-desk-device': '/pins/pin-desk-device.jpg',
  'pin-audio-soft': '/pins/pin-audio-soft.jpg',
  'pin-kitchen-appliance': '/pins/pin-kitchen-appliance.jpg',
  'pin-hardware-workshop': '/pins/pin-hardware-workshop.jpg',
  'pin-shelf-mix': '/pins/pin-shelf-mix.jpg',
} as const

export type PinId = keyof typeof PIN_ASSETS

/** Product catalog images — one coherent photo per seed product. */
export const PRODUCT_IMAGES: Record<string, string> = {
  Smartphone: '/products/smartphone.jpg',
  Tablet: '/products/tablet.jpg',
  Blender: '/products/blender.jpg',
  Laptop: '/products/laptop.jpg',
  Headphones: '/products/headphones.jpg',
  Refrigerator: '/products/refrigerator.jpg',
  'Coffee Maker': '/products/coffee-maker.jpg',
  'E-Reader': '/products/e-reader.jpg',
  Bookshelf: '/products/bookshelf.jpg',
  'Microwave Oven': '/products/microwave.jpg',
  'AMD RX-6600': '/products/gpu-amd-rx6600.jpg',
  'AMD RX-7600': '/products/gpu-amd-rx7600.jpg',
  'AMD RX-7700XT': '/products/gpu-amd-rx7700xt.jpg',
  'Nvidia RTX 4060': '/products/gpu-nvidia-4060.jpg',
  'Nvidia RTX 4080ti': '/products/gpu-nvidia-4080.jpg',
  'Nvidia RTX 5070': '/products/gpu-nvidia-5070.jpg',
}

const NAME_ALIASES: Array<{ match: RegExp; file: string }> = [
  { match: /smart\s*phone|iphone|galaxy/i, file: '/products/smartphone.jpg' },
  { match: /tablet|ipad/i, file: '/products/tablet.jpg' },
  { match: /blender|liquidificador/i, file: '/products/blender.jpg' },
  { match: /laptop|notebook/i, file: '/products/laptop.jpg' },
  { match: /headphone|headset|fone/i, file: '/products/headphones.jpg' },
  { match: /refrig|geladeira/i, file: '/products/refrigerator.jpg' },
  { match: /coffee|cafeteira/i, file: '/products/coffee-maker.jpg' },
  { match: /e-?reader|kindle/i, file: '/products/e-reader.jpg' },
  { match: /bookshelf|estante/i, file: '/products/bookshelf.jpg' },
  { match: /microwave|micro-?ondas/i, file: '/products/microwave.jpg' },
  { match: /rx[-\s]?6600/i, file: '/products/gpu-amd-rx6600.jpg' },
  { match: /rx[-\s]?7600/i, file: '/products/gpu-amd-rx7600.jpg' },
  { match: /rx[-\s]?7700/i, file: '/products/gpu-amd-rx7700xt.jpg' },
  { match: /rtx[-\s]?4060/i, file: '/products/gpu-nvidia-4060.jpg' },
  { match: /rtx[-\s]?4080/i, file: '/products/gpu-nvidia-4080.jpg' },
  { match: /rtx[-\s]?5070/i, file: '/products/gpu-nvidia-5070.jpg' },
  { match: /gpu|graphics|rtx|radeon|geforce/i, file: '/products/gpu-amd-rx6600.jpg' },
]

const CATEGORY_FALLBACK: Record<string, string> = {
  Electronics: '/products/laptop.jpg',
  Books: '/products/e-reader.jpg',
  'Home & Kitchen': '/products/blender.jpg',
  Hardware: '/products/gpu-amd-rx6600.jpg',
}

export function resolveProductImage(product: {
  id: number
  name: string
  imgUrl?: string
  categories?: { name: string }[]
}): string {
  const exact = PRODUCT_IMAGES[product.name]
  if (exact) return exact

  for (const rule of NAME_ALIASES) {
    if (rule.match.test(product.name)) return rule.file
  }

  const category = product.categories?.[0]?.name
  if (category && CATEGORY_FALLBACK[category]) {
    return CATEGORY_FALLBACK[category]
  }

  return '/products/laptop.jpg'
}

export function pinUrl(id: PinId): string {
  return PIN_ASSETS[id]
}

export function pinAspect(id: number): string {
  const ratios = ['3/4', '4/5', '1/1', '5/6', '2/3']
  return ratios[id % ratios.length]!
}
