import {
  formatBuildName,
  formatBuildDate,
  formatCurrency,
  resolveSelections,
} from '../utils/calculations'

function BuildCard({
  build,
  isSelected,
  compareDisabled,
  onToggleCompare,
  onDeleteBuild,
}) {
  const selections = resolveSelections(build.config)
  const buildName = formatBuildName(selections)

  return (
    <article className="build-card">
      <div className="build-card__header">
        <div>
          <p className="eyebrow">Saved For Later</p>
          <h3>{buildName}</h3>
        </div>
        <span className="build-card__price">
          {formatCurrency(build.stats.estimatedPrice)}
        </span>
      </div>

      <p className="build-card__timestamp">Saved {formatBuildDate(build.createdAt)}</p>

      <div className="build-card__specs">
        <span>{selections.cpu.label}</span>
        <span>{selections.ram.label}</span>
        <span>{selections.storage.label}</span>
        <span>{selections.color.label}</span>
        <span>{selections.chassis.shortLabel}</span>
      </div>

      <div className="build-card__scores">
        <div>
          <span>Performance</span>
          <strong>{build.stats.performanceScore}</strong>
        </div>
        <div>
          <span>Battery Life</span>
          <strong>{build.stats.batteryScore}</strong>
        </div>
      </div>

      <div className="build-card__actions">
        <button
          className={
            isSelected
              ? 'secondary-button secondary-button--active'
              : 'secondary-button'
          }
          type="button"
          onClick={() => onToggleCompare(build.id)}
          disabled={compareDisabled}
        >
          {isSelected ? 'In comparison' : 'Add to compare'}
        </button>
        <button
          className="text-button"
          type="button"
          onClick={() => onDeleteBuild(build.id)}
        >
          Remove
        </button>
      </div>
    </article>
  )
}

export default BuildCard
