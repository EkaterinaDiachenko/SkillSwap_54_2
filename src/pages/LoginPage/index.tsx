import { useState } from 'react'
import { SearchInput } from '../../shared/ui/search-input/search-input'

export default function App() {
  const [value, setValue] = useState('')

  return (
    <div style={{ padding: 20 }}>
      <SearchInput
        value={value}
        onChange={setValue}
        placeholder="Искать навык"
        error={value === 'error' ? 'Ошибка ввода' : undefined}
      />
      <p>Текущее значение: {value}</p>
    </div>
  )
}
