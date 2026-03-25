'use client'

import { useState, useEffect } from 'react'
import { DEADLINE } from '@/lib/data'

const TARGET = DEADLINE.getTime()
const pad = (n: number) => String(n).padStart(2, '0')

export interface CountdownValues {
  days: string
  hrs: string
  mins: string
  secs: string
  daysNum: number
  isExpired: boolean
  isUrgent: boolean   // true when < 24 h remain
}

const getValues = (): CountdownValues => {
  const diff = Math.max(0, TARGET - Date.now())
  const days = Math.floor(diff / 86400000)
  const hrs  = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)
  return {
    days: pad(days),
    hrs:  pad(hrs),
    mins: pad(mins),
    secs: pad(secs),
    daysNum:   days,
    isExpired: diff <= 0,
    isUrgent:  days < 1,
  }
}

export function useCountdown(): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(getValues)

  useEffect(() => {
    const id = setInterval(() => setValues(getValues()), 1000)
    return () => clearInterval(id)
  }, [])

  return values
}

export function getDaysLabel(daysNum: number, isExpired: boolean): string {
  if (isExpired)   return '⏰ Offer Expired'
  if (daysNum <= 1) return '⏳ Last Day!'
  return `⏳ Only ${daysNum} Days Left`
}
