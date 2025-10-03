import React from 'react'
import useTheme from '../hooks/useTheme.js'
const THEMES=['light','dark','pink']
export default function ThemeSwitcher(){
  const {theme,setTheme}=useTheme()
  return (
    <div className="actions">
      {THEMES.map(t=> (
        <button key={t} className={t===theme?'':'ghost'} onClick={()=>setTheme(t)} aria-pressed={t===theme}>{t}</button>
      ))}
    </div>
  )
}
