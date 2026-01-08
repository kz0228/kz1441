"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PhysicalEmotionalPage() {
  const { language } = useLanguage()
  const isRTL = language === 'ar'

  const [pulsing, setPulsing] = useState(false)
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null)

  useEffect(() => {
    // choose a random button index (0 = Diary, 1 = Timeline)
    setPulsingIndex(Math.floor(Math.random() * 2))
    const id = window.setTimeout(() => setPulsing(true), 2000)
    return () => window.clearTimeout(id)
  }, [])

  const handleSelect = () => {
    setPulsing(false)
  }

  return (
    <main className={`h-screen overflow-hidden container mx-auto px-4 pt-8 md:pt-20 pb-10 md:pb-16 flex flex-col items-center justify-start text-center ${isRTL ? 'text-right' : ''}`}>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Physical and Emotional Changes</h1>

      <div className="flex gap-6 flex-col sm:flex-row items-center justify-center max-w-3xl">
        <div className="relative">
          <Link href="/diary" onClick={handleSelect} className="group relative z-10">
            <motion.div
              animate={pulsing && pulsingIndex === 0 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={pulsing && pulsingIndex === 0 ? { duration: 1.2, repeat: Infinity, repeatType: 'loop' } : { duration: 0 }}
              whileHover={{ scale: 1.08 }}
              className={`w-full sm:w-96 rounded-3xl bg-white shadow-xl border border-gray-100 px-8 py-12 flex items-start gap-4 transform ${pulsing && pulsingIndex === 0 ? 'ring-8 ring-yellow-300/60 shadow-2xl' : ''}`}
            >
              <span className="text-5xl">📔</span>
              <div>
                <p className="text-lg font-bold">Mood Diary for Your Child</p>
                <p className="text-sm text-gray-600">Private mood tracking and notes about emotional changes.</p>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="relative">
          <Link href="/timeline" onClick={handleSelect} className="group relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              animate={pulsing && pulsingIndex === 1 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={pulsing && pulsingIndex === 1 ? { duration: 1.2, repeat: Infinity, repeatType: 'loop' } : { duration: 0 }}
              className={`w-full sm:w-96 rounded-3xl bg-white shadow-md border border-gray-100 px-8 py-12 flex items-start gap-4 ${pulsing && pulsingIndex === 1 ? 'ring-8 ring-yellow-300/60 shadow-2xl' : ''}`}
            >
              <span className="text-5xl">⏳</span>
              <div>
                <p className="text-lg font-bold">Timeline Game</p>
                <p className="text-sm text-gray-600">Play the timeline game to learn and explore development stages.</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  )
}
