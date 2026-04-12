import MeterBar from './MeterBar'
import { formatCurrency } from '../utils/calculations'

function StatsPanel({ stats, onSaveBuild, saveMessage, savedBuildCount }) {
  const performanceHint =
    stats.performanceScore >= 85
      ? 'Ready for demanding work'
      : 'Comfortable for everyday use'

  const batteryHint =
    stats.batteryScore >= 80
      ? 'Built for long days away from the charger'
      : 'Ready for your daily routine'

  return (
    <aside className="stats-panel stats-sidebar">
      <div className="panel-card__header sidebar-header">
        <p className="eyebrow">Your Summary</p>
        <h2>See how this setup balances price, speed, and battery life.</h2>
      </div>

      <div className="price-card">
        <span>Estimated Total</span>
        <strong>{formatCurrency(stats.estimatedPrice)}</strong>
        <p>A quick estimate for the setup you have chosen.</p>
      </div>

      <MeterBar
        label="Performance"
        value={stats.performanceScore}
        tone="performance"
        hint={performanceHint}
      />
      <MeterBar
        label="Battery Life"
        value={stats.batteryScore}
        tone="battery"
        hint={batteryHint}
      />

      <div className="stats-summary">
        <div>
          <span>Processor</span>
          <strong>{stats.selections.cpu.label}</strong>
        </div>
        <div>
          <span>Memory</span>
          <strong>{stats.selections.ram.label}</strong>
        </div>
        <div>
          <span>Storage</span>
          <strong>{stats.selections.storage.label}</strong>
        </div>
      </div>

      {saveMessage ? <div className="save-banner">{saveMessage}</div> : null}

      <button
        className="primary-button primary-button--full"
        type="button"
        onClick={onSaveBuild}
      >
        Save This Build
      </button>

      <p className="stats-panel__footnote">
        {savedBuildCount} saved pick{savedBuildCount === 1 ? '' : 's'} ready
        whenever you want to compare again.
      </p>
    </aside>
  )
}

export default StatsPanel
