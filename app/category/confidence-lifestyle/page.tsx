"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ConfidenceLifestylePage() {
  const { language } = useLanguage()
  const isRTL = language === 'ar'

  const [pulsing, setPulsing] = useState(false)
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null)
  useEffect(() => {
    // choose a random button index (0 = What I Like, 1 = Quizzes)
    setPulsingIndex(Math.floor(Math.random() * 2))
    const id = window.setTimeout(() => setPulsing(true), 2000)
    return () => window.clearTimeout(id)
  }, [])

  const handleSelect = () => setPulsing(false)

  return (
    <main className={`h-screen overflow-hidden container mx-auto px-4 py-10 md:py-16 ${isRTL ? 'text-right' : ''}`}>
      <h1 className="text-2xl font-bold mb-4">Confidence, Self-Acceptance and Lifestyle</h1>
      <p className="text-sm text-gray-600 mb-6">Activities and quizzes to support positive self-image and confidence.</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-3xl">
        <div className="relative">
          {pulsing && pulsingIndex === 0 && (
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/90 to-yellow-300/60 blur-4xl opacity-100 pointer-events-none" />
          )}
          <Link href="/what-i-like-about-me" onClick={handleSelect} className="group relative z-10">
            <motion.div
              animate={pulsing && pulsingIndex === 0 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={pulsing && pulsingIndex === 0 ? { duration: 1.2, repeat: Infinity, repeatType: 'loop' } : { duration: 0 }}
              whileHover={{ scale: 1.08 }}
              className={`w-full rounded-3xl bg-white shadow-xl border border-gray-100 px-8 py-12 flex items-start gap-4 ${pulsing && pulsingIndex === 0 ? 'ring-8 ring-yellow-300/60 shadow-2xl' : ''}`}
            >
              <span className="text-5xl">💫</span>
              <div>
                <p className="text-lg font-bold">What I Like About Me</p>
                <p className="text-sm text-gray-600">Activities to celebrate strengths and body positivity.</p>
              </div>
            </motion.div>
          </Link>
        </div>
        <div className="relative">
          {pulsing && pulsingIndex === 1 && (
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/90 to-yellow-300/60 blur-4xl opacity-100 pointer-events-none" />
          )}
          <Link href="/quizzes" onClick={handleSelect} className="group relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              animate={pulsing && pulsingIndex === 1 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={pulsing && pulsingIndex === 1 ? { duration: 1.2, repeat: Infinity, repeatType: 'loop' } : { duration: 0 }}
              className={`w-full rounded-3xl bg-white shadow-md border border-gray-100 px-8 py-12 flex items-start gap-4 ${pulsing && pulsingIndex === 1 ? 'ring-8 ring-yellow-300/60 shadow-2xl' : ''}`}
            >
              <span className="text-5xl">❓</span>
              <div>
                <p className="text-lg font-bold">Quizzes</p>
                <p className="text-sm text-gray-600">Quick, friendly quizzes to reflect and learn together.</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  )
}
