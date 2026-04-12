import {
  formatBuildName,
  formatCurrency,
  resolveSelections,
} from '../utils/calculations'

const rowDefinitions = [
  {
    label: 'Processor',
    render: (_, selections) => selections.cpu.label,
  },
  {
    label: 'Memory',
    render: (_, selections) => selections.ram.label,
  },
  {
    label: 'Storage',
    render: (_, selections) => selections.storage.label,
  },
  {
    label: 'Finish',
    render: (_, selections) => selections.color.label,
  },
  {
    label: 'Body Style',
    render: (_, selections) => selections.chassis.label,
  },
  {
    label: 'Price',
    render: (build) => formatCurrency(build.stats.estimatedPrice),
  },
  {
    label: 'Performance',
    render: (build) => build.stats.performanceScore,
  },
  {
    label: 'Battery Life',
    render: (build) => build.stats.batteryScore,
  },
]

function ComparisonTable({ builds }) {
  if (builds.length === 0) {
    return (
      <section className="panel-card comparison-panel">
        <div className="panel-card__header">
          <p className="eyebrow">Compare Your Picks</p>
          <h2>Choose up to three saved laptops to view them side by side.</h2>
        </div>
      </section>
    )
  }

  const selectionsByBuild = builds.map((build) => resolveSelections(build.config))

  return (
    <section className="panel-card comparison-panel">
      <div className="panel-card__header">
        <p className="eyebrow">Compare Your Picks</p>
        <h2>See your top choices next to each other.</h2>
      </div>

      <div className="comparison-table__scroll">
        <table className="comparison-table">
          <thead>
            <tr>
              <th scope="col">Details</th>
              {builds.map((build, index) => (
                <th key={build.id} scope="col">
                  {formatBuildName(selectionsByBuild[index])}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowDefinitions.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {builds.map((build, index) => (
                  <td key={`${build.id}-${row.label}`}>
                    {row.render(build, selectionsByBuild[index])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ComparisonTable
