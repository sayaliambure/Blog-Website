"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { hashPassword, verifyPassword } from "@/lib/auth"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      return { error: "User already exists" }
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)
    const { data: user, error } = await supabase
      .from("users")
      .insert({ name, email, password_hash: passwordHash })
      .select("id, email, name")
      .single()

    if (error) throw error

    // Set auth cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    redirect("/")
  } catch (error) {
    return { error: "Registration failed" }
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, name, password_hash")
      .eq("email", email)
      .single()

    if (error || !user) {
      return { error: "Invalid credentials" }
    }

    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return { error: "Invalid credentials" }
    }

    // Set auth cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    redirect("/")
  } catch (error) {
    return { error: "Login failed" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  redirect("/login")
}
