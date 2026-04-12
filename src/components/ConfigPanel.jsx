import {
  chassisOptions,
  colorOptions,
  cpuOptions,
  ramOptions,
  storageOptions,
} from '../data/configOptions'
import OptionSelector from './OptionSelector'

const selectorGroups = [
  { key: 'cpu', title: 'Processor', options: cpuOptions },
  { key: 'ram', title: 'Memory', options: ramOptions },
  { key: 'storage', title: 'Storage', options: storageOptions },
  { key: 'color', title: 'Finish', options: colorOptions },
  { key: 'chassis', title: 'Body Style', options: chassisOptions },
]

function ConfigPanel({ config, onConfigChange }) {
  return (
    <aside className="config-panel config-sidebar">
      <div className="panel-card__header sidebar-header">
        <p className="eyebrow">Choose Your Setup</p>
        <h2>Pick the parts and finish that suit your routine.</h2>
      </div>

      <div className="config-panel__controls">
        {selectorGroups.map((group) => (
          <OptionSelector
            key={group.key}
            name={group.key}
            title={group.title}
            options={group.options}
            selectedValue={config[group.key]}
            onChange={(value) => onConfigChange(group.key, value)}
          />
        ))}
      </div>
    </aside>
  )
}

export default ConfigPanel
