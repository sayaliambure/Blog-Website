import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { createBlog } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, PenTool } from "lucide-react"

export default async function CreateBlogPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <PenTool className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          </div>
          <p className="text-gray-600 mt-2">Share your thoughts and stories with the community</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Write Your Story</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createBlog} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
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
                  placeholder="Write a brief summary of your blog post (will be auto-generated if left empty)"
                  rows={3}
                />
                <p className="text-sm text-gray-500">This will appear as a preview on the home page</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog content here... You can use markdown-style formatting:

## For headings
### For subheadings
- For bullet points

Write naturally and your content will be formatted beautifully!"
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
                  <PenTool className="h-4 w-4" />
                  Publish Blog Post
                </Button>
                <Link href="/">
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
