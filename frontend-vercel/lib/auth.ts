import { cookies } from "next/headers"
import { supabase } from "./supabase"
import bcrypt from "bcryptjs"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) return null

  try {
    // In a real app, you'd verify the JWT token
    // For this demo, we'll use a simple approach
    const userId = token.value
    const { data: user } = await supabase.from("users").select("id, email, name").eq("id", userId).single()

    return user
  } catch {
    return null
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}
