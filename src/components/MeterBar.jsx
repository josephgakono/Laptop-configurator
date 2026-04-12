function MeterBar({ label, value, tone, hint }) {
  return (
    <div className="meter">
      <div className="meter__header">
        <div>
          <span className="meter__label">{label}</span>
          <span className="meter__hint">{hint}</span>
        </div>
        <strong className="meter__value">{value}</strong>
      </div>
      <div className="meter__track" aria-hidden="true">
        <div
          className={`meter__fill meter__fill--${tone}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default MeterBar
