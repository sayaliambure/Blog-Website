"use server"

import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/auth"

export async function createBlog(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string

  if (!title || !content) {
    return { error: "Title and content are required" }
  }

  try {
    const { data: blog, error } = await supabase
      .from("blogs")
      .insert({
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + "...",
        author_id: user.id,
      })
      .select("id")
      .single()

    if (error) throw error

    redirect(`/blog/${blog.id}`)
  } catch (error) {
    return { error: "Failed to create blog post" }
  }
}

export async function updateBlog(id: string, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string

  if (!title || !content) {
    return { error: "Title and content are required" }
  }

  try {
    const { error } = await supabase
      .from("blogs")
      .update({
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + "...",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("author_id", user.id)

    if (error) throw error

    redirect(`/blog/${id}`)
  } catch (error) {
    return { error: "Failed to update blog post" }
  }
}

export async function deleteBlog(id: string) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  try {
    const { error } = await supabase.from("blogs").delete().eq("id", id).eq("author_id", user.id)

    if (error) throw error

    redirect("/")
  } catch (error) {
    return { error: "Failed to delete blog post" }
  }
}
