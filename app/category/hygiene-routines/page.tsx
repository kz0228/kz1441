"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HygieneRoutinesPage() {
  const { language } = useLanguage()
  const isRTL = language === 'ar'

  const [pulsing, setPulsing] = useState(false)
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null)
  useEffect(() => {
    // only one button on this page, but still pick randomly (index 0)
    setPulsingIndex(0)
    const id = window.setTimeout(() => setPulsing(true), 2000)
    return () => window.clearTimeout(id)
  }, [])

  const handleSelect = () => setPulsing(false)

  return (
    <main className={`h-screen overflow-hidden container mx-auto px-4 py-10 md:py-16 ${isRTL ? 'text-right' : ''}`}>
      <h1 className="text-2xl font-bold mb-4">Hygiene and Self-Care Routines</h1>
      <p className="text-sm text-gray-600 mb-6">Practical routines and guides to help your child stay well.</p>

      <div className="max-w-3xl">
        <div className="relative max-w-2xl">
          {pulsing && pulsingIndex === 0 && (
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/90 to-yellow-300/60 blur-4xl opacity-100 pointer-events-none" />
          )}
          <Link href="/hygiene" onClick={handleSelect} className="group relative z-10">
            <motion.div
              animate={pulsing && pulsingIndex === 0 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={pulsing && pulsingIndex === 0 ? { duration: 1.2, repeat: Infinity, repeatType: 'loop' } : { duration: 0 }}
              whileHover={{ scale: 1.08 }}
              className={`w-full rounded-3xl bg-white shadow-xl border border-gray-100 px-8 py-12 flex items-start gap-4 ${pulsing && pulsingIndex === 0 ? 'ring-8 ring-yellow-300/60 shadow-2xl' : ''}`}
            >
              <span className="text-5xl">🧼</span>
              <div>
                <p className="text-lg font-bold">Hygiene and Self-Care</p>
                <p className="text-sm text-gray-600">Step-by-step hygiene tips and routines for daily life.</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  )
}
