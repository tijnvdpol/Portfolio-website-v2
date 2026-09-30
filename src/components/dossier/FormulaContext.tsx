import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { formulaCells, type FormulaCell } from '../../data/formulas'

// Deelt de aangewezen cel tussen het kerncijferraster en de formulebalk bovenaan.
type FormulaState = {
  active: FormulaCell | null
  select: (column: string | null) => void // null = niets aangewezen (formulebalk verborgen)
}

const FormulaContext = createContext<FormulaState | null>(null)

export function FormulaProvider({ children }: { children: ReactNode }) {
  const [column, setColumn] = useState<string | null>(null)

  const value = useMemo<FormulaState>(
    () => ({
      active: formulaCells.find((cell) => cell.column === column) ?? null,
      select: setColumn,
    }),
    [column],
  )

  return <FormulaContext.Provider value={value}>{children}</FormulaContext.Provider>
}

export function useFormulaBar(): FormulaState {
  const ctx = useContext(FormulaContext)
  if (!ctx) throw new Error('useFormulaBar moet binnen <FormulaProvider> worden gebruikt')
  return ctx
}
