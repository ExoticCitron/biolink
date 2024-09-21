"use client"

import { useState, useEffect, useRef } from 'react'
import { Github, MessageCircle, MapPin, Rocket, Zap } from 'lucide-react'
import Image from 'next/image'

// Simulated Discord presence data
const simulatedDiscordPresence = {
  avatar_url: "/placeholder.svg?height=40&width=40",
  username: "exoticnitron",
  game: {
    name: "Visual Studio Code",
    details: "Workspace: exo.dev",
    state: "Coding for 9 minutes"
  }
}

export default function BiolinkCard() {
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [isPfpHovered, setIsPfpHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const [discordPresence, setDiscordPresence] = useState(simulatedDiscordPresence)

  useEffect(() => {
    // Simulate updating Discord presence every 30 seconds
    const intervalId = setInterval(() => {
      setDiscordPresence(prev => ({
        ...prev,
        game: {
          ...prev.game,
          state: `Coding for ${Math.floor(Math.random() * 60)} minutes`
        }
      }))
    }, 30000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
      <div
        ref={cardRef}
        className="relative w-full max-w-md p-6 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-md bg-black bg-opacity-30 border border-blue-500"
        style={{
          transform: isCardHovered
            ? `perspective(1000px) rotateY(${(mousePosition.x - 150) / 10}deg) rotateX(${-(mousePosition.y - 200) / 10}deg)`
            : 'none',
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-in-out',
          boxShadow: isCardHovered ? '0 0 25px 5px rgba(0, 162, 255, 0.5)' : '0 0 15px 2px rgba(0, 162, 255, 0.3)',
        }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-30 blur-xl animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Profile image and stats */}
          <div className="flex items-center mb-4">
            <div 
              className="relative"
              onMouseEnter={() => setIsPfpHovered(true)}
              onMouseLeave={() => setIsPfpHovered(false)}
            >
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full border-2 border-blue-400 animate-pulse"
              />
              <div 
                className={`absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-black ${
                  isPfpHovered ? 'animate-ping' : ''
                }`}
              ></div>
            </div>
            <div className="ml-4 text-blue-300 text-sm font-semibold">
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-1 text-yellow-400 animate-pulse" />
                <span className="text-2xl text-blue-300 animate-pulse">182</span>
              </div>
            </div>
          </div>
          
          {/* User info */}
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient mb-1">
              Exo <Rocket className="inline w-6 h-6 text-yellow-400 animate-bounce" /> <Zap className="inline w-6 h-6 text-blue-400 animate-pulse" />
            </h2>
            <p className="text-2xl text-blue-300 font-semibold mb-1 animate-pulse">XXIII:V</p>
            <p className="text-gray-300 flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-1 text-red-400" /> United Kingdom
            </p>
          </div>
          
          {/* Simulated Discord Presence */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-6 hover:bg-opacity-70 transition-all duration-300 group">
            <div className="flex items-center space-x-3">
              <Image
                src={discordPresence.avatar_url}
                alt="Discord Avatar"
                width={40}
                height={40}
                className="rounded-full group-hover:animate-spin"
              />
              <div>
                <p className="text-sm text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">{discordPresence.username}</p>
                <p className="text-xs text-gray-300">{discordPresence.game.name}</p>
                <p className="text-xs text-gray-400">{discordPresence.game.details}</p>
                <p className="text-xs text-gray-400">{discordPresence.game.state}</p>
              </div>
            </div>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center space-x-4">
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300 group">
              <MessageCircle className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:animate-pulse" />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300 group">
              <Github className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:animate-pulse" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
