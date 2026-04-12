const previewCatalog = {
  'classic-aluminum:silver': {
    src: '/laptop-previews/silver-laptop.png',
    alt: 'Silver aluminum laptop photo',
    filter: 'none',
  },
  'classic-aluminum:black': {
    src: '/laptop-previews/black-laptop.png',
    alt: 'Black aluminum laptop photo',
    filter: 'none',
  },
  'classic-aluminum:blue': {
    src: '/laptop-previews/blue-laptop.jpg',
    alt: 'Blue aluminum laptop photo',
    filter: 'none',
  },
  'slim-magnesium:silver': {
    src: '/laptop-previews/dell-xps-13.webp',
    alt: 'Slim silver laptop photo',
    filter: 'none',
  },
  'slim-magnesium:black': {
    src: '/laptop-previews/macbook-space-grey.webp',
    alt: 'Slim dark laptop photo',
    filter: 'none',
  },
  'slim-magnesium:blue': {
    src: '/laptop-previews/slim-laptop.png',
    alt: 'Slim cobalt laptop photo',
    filter: 'hue-rotate(168deg) saturate(1.35) brightness(1.02)',
  },
  'gaming-alloy:silver': {
    src: '/laptop-previews/asus-zenbook-dual.webp',
    alt: 'High-performance silver laptop photo',
    filter: 'none',
  },
  'gaming-alloy:black': {
    src: '/laptop-previews/avant-gaming.png',
    alt: 'Black gaming laptop photo',
    filter: 'none',
  },
  'gaming-alloy:blue': {
    src: '/laptop-previews/falcon-gaming.png',
    alt: 'Blue gaming laptop photo',
    filter: 'hue-rotate(168deg) saturate(1.2) brightness(0.98)',
  },
}

export function resolvePreviewImage(config, selections) {
  const previewKey = `${config.chassis}:${config.color}`
  const previewImage =
    previewCatalog[previewKey] ?? previewCatalog['classic-aluminum:silver']

  return {
    ...previewImage,
    note: `${selections.color.label} finish with ${selections.chassis.label} styling.`,
  }
}
