import { supabase } from "@/lib/supabase"
import { getCurrentUser } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { updateBlog } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"

async function getBlog(id: string) {
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("id, title, content, excerpt, author_id")
    .eq("id", id)
    .single()

  if (error || !blog) {
    return null
  }

  return blog
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const blog = await getBlog(id)

  if (!blog) {
    notFound()
  }

  if (blog.author_id !== user.id) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/blog/${id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Post
          </Link>
          <div className="flex items-center gap-3">
            <Edit className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          </div>
          <p className="text-gray-600 mt-2">Update your blog post content</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Story</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateBlog.bind(null, id)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={blog.title}
                  placeholder="Enter an engaging title for your blog post"
                  required
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={blog.excerpt || ""}
                  placeholder="Write a brief summary of your blog post"
                  rows={3}
                />
                <p className="text-sm text-gray-500">This will appear as a preview on the home page</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={blog.content}
                  placeholder="Write your blog content here..."
                  required
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500">
                  Use ## for headings, ### for subheadings, and - for bullet points
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" size="lg" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Update Blog Post
                </Button>
                <Link href={`/blog/${id}`}>
                  <Button variant="outline" size="lg">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
