import {
  chassisOptions,
  colorOptions,
  cpuOptions,
  ramOptions,
  storageOptions,
} from '../data/configOptions'

const BASE_PRICE = 899
const BASE_PERFORMANCE = 34
const BASE_BATTERY = 51

const optionMaps = {
  cpu: Object.fromEntries(cpuOptions.map((option) => [option.id, option])),
  ram: Object.fromEntries(ramOptions.map((option) => [option.id, option])),
  storage: Object.fromEntries(storageOptions.map((option) => [option.id, option])),
  color: Object.fromEntries(colorOptions.map((option) => [option.id, option])),
  chassis: Object.fromEntries(chassisOptions.map((option) => [option.id, option])),
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function formatBuildName(selections) {
  return `${selections.chassis.shortLabel} ${selections.color.label}`
}

export function resolveSelections(config) {
  return {
    cpu: optionMaps.cpu[config.cpu] ?? cpuOptions[0],
    ram: optionMaps.ram[config.ram] ?? ramOptions[0],
    storage: optionMaps.storage[config.storage] ?? storageOptions[0],
    color: optionMaps.color[config.color] ?? colorOptions[0],
    chassis: optionMaps.chassis[config.chassis] ?? chassisOptions[0],
  }
}

export function calculateLaptopStats(config) {
  const selections = resolveSelections(config)

  const estimatedPrice =
    BASE_PRICE +
    selections.cpu.price +
    selections.ram.price +
    selections.storage.price +
    selections.color.price +
    selections.chassis.price

  const performanceScore = clampScore(
    BASE_PERFORMANCE +
      selections.cpu.performance +
      selections.ram.performance +
      selections.storage.performance +
      selections.chassis.performance,
  )

  const batteryScore = clampScore(
    BASE_BATTERY +
      selections.cpu.battery +
      selections.ram.battery +
      selections.storage.battery +
      selections.chassis.battery,
  )

  return {
    estimatedPrice,
    performanceScore,
    batteryScore,
    selections,
  }
}

export function createBuildRecord(config) {
  const stats = calculateLaptopStats(config)

  return {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `build-${Date.now()}-${Math.round(Math.random() * 10000)}`,
    name: formatBuildName(stats.selections),
    createdAt: new Date().toISOString(),
    config: { ...config },
    stats: {
      estimatedPrice: stats.estimatedPrice,
      performanceScore: stats.performanceScore,
      batteryScore: stats.batteryScore,
    },
  }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatBuildDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
