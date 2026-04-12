function formatDelta(price) {
  return price === 0 ? 'Included' : `+$${price}`
}

function OptionSelector({ name, title, options, selectedValue, onChange }) {
  const selectedOption =
    options.find((option) => option.id === selectedValue) ?? options[0]
  const selectId = `selector-${name}`

  return (
    <section className="option-selector">
      <label className="option-selector__label" htmlFor={selectId}>
        {title}
      </label>
      <select
        id={selectId}
        className="option-selector__select"
        value={selectedValue}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label} - {formatDelta(option.price)}
          </option>
        ))}
      </select>
      <div className="option-selector__details">
        <span className="option-selector__helper">{selectedOption.helper}</span>
        <span className="option-selector__price">
          {selectedOption.badge} | {formatDelta(selectedOption.price)}
        </span>
      </div>
    </section>
  )
}

export default OptionSelector
