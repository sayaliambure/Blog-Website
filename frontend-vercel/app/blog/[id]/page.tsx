"use client"

import { supabase } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, Edit, ArrowLeft } from "lucide-react"
import { deleteBlog } from "@/app/actions/blog"

async function getBlog(id: string) {
  const { data: blog, error } = await supabase
    .from("blogs")
    .select(`
      id,
      title,
      content,
      created_at,
      updated_at,
      author_id,
      author:users(name)
    `)
    .eq("id", id)
    .single()

  if (error || !blog) {
    return null
  }

  return blog
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await getBlog(id)
  const user = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const isAuthor = user?.id === blog.author_id

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((paragraph, index) => {
        if (paragraph.trim() === "") return null

        // Handle headers
        if (paragraph.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {paragraph.replace("## ", "")}
            </h2>
          )
        }

        if (paragraph.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              {paragraph.replace("### ", "")}
            </h3>
          )
        }

        // Handle code blocks
        if (paragraph.startsWith("```")) {
          return null // Skip code block markers for now
        }

        // Handle bullet points
        if (paragraph.startsWith("- ")) {
          return (
            <li key={index} className="text-gray-700 leading-relaxed ml-4">
              {paragraph.replace("- ", "")}
            </li>
          )
        }

        // Regular paragraphs
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        )
      })
      .filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Blog Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{blog.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Published {formatDate(blog.created_at)}</span>
            </div>
            {blog.updated_at !== blog.created_at && (
              <Badge variant="secondary">Updated {formatDate(blog.updated_at)}</Badge>
            )}
          </div>

          {/* Author Actions */}
          {isAuthor && (
            <div className="flex gap-3 mb-8">
              <Link href={`/edit/${blog.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Post
                </Button>
              </Link>
              <form action={deleteBlog.bind(null, blog.id)}>
                <Button
                  variant="destructive"
                  size="sm"
                  type="submit"
                  onClick={(e) => {
                    if (!confirm("Are you sure you want to delete this blog post?")) {
                      e.preventDefault()
                    }
                  }}
                >
                  Delete Post
                </Button>
              </form>
            </div>
          )}
        </header>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-lg leading-relaxed">{formatContent(blog.content)}</div>
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {blog.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{blog.author.name}</p>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline">Read More Posts</Button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
