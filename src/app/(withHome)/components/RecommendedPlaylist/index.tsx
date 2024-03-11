"use client"
import { useEffect, useState } from "react"
import { songs } from "@/api/home"

function RecommendedPlaylist() {
  const [list, setList] = useState([])
  const getSongs = async () => {
    try {
      const res = await songs({ limit: 30 })
    } catch (error) {
      console.log("error", error)
    }
  }
  useEffect(() => {
    getSongs()
  }, [])
  return <div>RecommendedSongs</div>
}

export default RecommendedPlaylist
