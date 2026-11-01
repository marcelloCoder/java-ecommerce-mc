import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en } from './locales/en'
import { pt, type Dict } from './locales/pt'

export type Locale = 'pt' | 'en'

type I18nContextValue = {
  locale: Locale
  t: Dict
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

const dicts: Record<Locale, Dict> = { pt, en }

function readInitialLocale(): Locale {
  const saved = localStorage.getItem('mshop_locale')
  if (saved === 'en' || saved === 'pt') return saved
  return 'pt'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem('mshop_locale', next)
    setLocaleState(next)
  }, [])

  const value = useMemo(
    () => ({ locale, t: dicts[locale], setLocale }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
