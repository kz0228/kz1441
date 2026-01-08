"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import RegisterServiceWorker from './register-sw'
import { GameModal, type GameType } from '@/components/games/GameModals'

type QuickLink = {
  icon: string
  label: string
  helper: string
  href?: string
  action?: () => void
}

export default function Home() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)
  const [pulsing, setPulsing] = useState(false)
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null)

  useEffect(() => {
    // pick one of the three category buttons at random
    setPulsingIndex(Math.floor(Math.random() * categories.length))
    const id = window.setTimeout(() => setPulsing(true), 2000)
    return () => window.clearTimeout(id)
  }, [])

  const handleSelect = () => setPulsing(false)

  // Three main category buttons that replace the previous quick links grid
  const categories = [
    {
      href: '/category/physical-emotional',
      title: 'Physical and Emotional Changes',
      description: 'Explore mood diary and timeline game for tracking changes.',
      icon: '💚',
    },
    {
      href: '/category/hygiene-routines',
      title: 'Hygiene and Self-Care Routines',
      description: 'Guides and routines to keep your child healthy and confident.',
      icon: '🧼',
    },
    {
      href: '/category/confidence-lifestyle',
      title: 'Confidence, Self-Acceptance and Lifestyle',
      description: 'Activities and quizzes to build confidence and positive self-image.',
      icon: '🌟',
    },
  ]

  return (
    <main className="container mx-auto px-4 py-10 md:py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <RegisterServiceWorker />
      <div className="grid">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center py-20"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-center">Welcome here!</h2>
        </motion.section>
      </div>

      <section className="mt-12" id="quick-links">

        <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${isRTL ? 'text-right' : ''}`}>
          {categories.map((cat, idx) => (
            <div key={cat.title} className="relative">
              {pulsing && pulsingIndex === idx && (
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/90 to-yellow-300/60 blur-4xl opacity-100 pointer-events-none" />
              )}
              <Link href={cat.href} onClick={handleSelect} className="group relative z-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  animate={pulsing && pulsingIndex === idx ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={pulsing && pulsingIndex === idx ? { duration: 1.2, repeat: Infinity, repeatType: 'loop' } : { duration: 0 }}
                  className={`w-full rounded-3xl bg-white shadow-md border border-gray-100 px-6 py-12 flex flex-col items-start gap-4 transition ${pulsing && pulsingIndex === idx ? 'ring-8 ring-yellow-300/60 shadow-2xl' : ''}`}
                >
                  <span className="text-4xl" role="img" aria-label={cat.title}>{cat.icon}</span>
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 text-balance">{cat.title}</p>
                    <p className="text-sm text-gray-600 text-balance">{cat.description}</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <GameModal selectedGame={selectedGame} onClose={() => setSelectedGame(null)} />
    </main>
  )
}

