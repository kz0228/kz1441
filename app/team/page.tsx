"use client"

import { motion } from 'framer-motion'
import { Users, Crown, GraduationCap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type TeamMember = {
  key: string
  emoji: string
  color: string
  special?: boolean
  badgeKey?: 'dev' | 'special'
  icon?: 'crown' | 'graduation'
  useSpecialContent?: boolean
}

const members: TeamMember[] = [
  { key: 'qais', emoji: '💻', color: 'from-blue-400 to-cyan-500', special: true, badgeKey: 'dev', icon: 'crown' },
  { key: 'nazean', emoji: '👩‍🔬', color: 'from-purple-400 to-pink-500', special: true, badgeKey: 'special', icon: 'graduation', useSpecialContent: true },
  { key: 'tan', emoji: '🎤', color: 'from-pink-400 to-rose-500' },
  { key: 'chengyang', emoji: '📝', color: 'from-green-400 to-emerald-500' },
  { key: 'raja', emoji: '🎨', color: 'from-orange-400 to-amber-500' },
  { key: 'hanif', emoji: '📹', color: 'from-indigo-400 to-purple-500' },
  { key: 'rafia', emoji: '📋', color: 'from-rose-400 to-pink-500' },
  { key: 'wong', emoji: '✨', color: 'from-cyan-400 to-blue-500' },
]

export default function TeamPage() {
  const { t } = useLanguage()
  const team = t<any>('team')

  type Row = { type: 'single'; member: TeamMember } | { type: 'pair'; a: TeamMember; b: TeamMember }

  const rows: Row[] = []
  for (let i = 0; i < members.length; i++) {
    const m = members[i]
    if (m.key === 'rafia' && members[i + 1] && members[i + 1].key === 'wong') {
      rows.push({ type: 'pair', a: m, b: members[i + 1] })
      i++
    } else {
      rows.push({ type: 'single', member: m })
    }
  }

  const renderCard = (member: TeamMember, idxOffset: number) => {
    const memberContent = member.useSpecialContent ? team.special : team.members?.[member.key] || {}
    const badgeLabel = member.badgeKey ? t<string>(`team.badges.${member.badgeKey}`) : undefined
    const roleLabel = t<string>(`team.membersRoles.${member.key}`)
    const description = member.useSpecialContent
      ? `${memberContent?.description || ''} ${memberContent?.highlight || ''}`.trim()
      : memberContent?.description

    return (
      <motion.div
        key={member.key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idxOffset * 0.1 }}
        whileHover={{ y: -5 }}
        className={`glass-effect rounded-2xl p-6 relative ${member.special ? 'ring-2 ring-yellow-400/50' : ''}`}
      >
        {member.special && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full p-1.5 shadow-lg">
              {member.icon === 'crown' ? (
                <Crown className="w-4 h-4" />
              ) : (
                <GraduationCap className="w-4 h-4" />
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl flex-shrink-0`}>
            {member.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 truncate">{memberContent?.name || member.key}</h3>
            {member.special && badgeLabel && (
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold mt-1">
                {badgeLabel}
              </span>
            )}
          </div>
        </div>

        {roleLabel && (
          <div className={`inline-block bg-gradient-to-r ${member.color} text-white px-3 py-1 rounded-lg text-sm font-semibold mb-3`}>
            {roleLabel}
          </div>
        )}

        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-xl p-3 shadow-md">
              <img
                src="https://maya.um.edu.my/images//img-logo-UM.png"
                alt="University of Malaya Logo"
                className="h-14 md:h-16 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {team.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3">{team.subtitle}</p>
          {team.umTagline && <p className="text-sm text-gray-500">{team.umTagline}</p>}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((row, rIdx) => {
            if (row.type === 'single') {
              return <div key={row.member.key}>{renderCard(row.member, rIdx)}</div>
            }

            return (
              <div key={`pair-${row.a.key}-${row.b.key}`} className="lg:col-span-3 flex justify-center">
                <div className="grid grid-cols-2 gap-6 w-full max-w-4xl px-4">
                  <div className="col-span-1">{renderCard(row.a, rIdx)}</div>
                  <div className="col-span-1">{renderCard(row.b, rIdx + 1)}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Removed: the bottom "Special Inspiration" callout was intentionally removed per request. */}
      </div>
    </div>
  )
}
