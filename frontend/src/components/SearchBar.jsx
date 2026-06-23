import { useRef, useEffect } from 'react'

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search restaurants...',
  icon = '🔍',
  autoFocus = false,
  inputMode,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
      <span style={{
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        fontSize: 18, pointerEvents: 'none'
      }}>
        {icon}
      </span>
      <input
        ref={inputRef}
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px 12px 44px',
          fontSize: 15,
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)',
          background: 'var(--surface)',
          outline: 'none',
          transition: 'border-color .15s',
          fontFamily: 'inherit',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--amber)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  )
}
