import { supabase } from "@/lib/supabase"
import BlogCard from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PenTool, BookOpen } from "lucide-react"

async function getBlogs() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(`
      id,
      title,
      excerpt,
      created_at,
      author:users(name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
    return []
  }

  return blogs || []
}

export default async function HomePage() {
  const blogs = await getBlogs()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogSpace
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing stories, share your thoughts, and connect with a community of passionate writers and
            readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="flex items-center gap-2">
                <PenTool className="h-5 w-5" />
                Start Writing
              </Button>
            </Link>
            <Link href="#blogs">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Explore Blogs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="blogs" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of insightful articles, tutorials, and stories from our community of writers.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share your story with the community!</p>
              <Link href="/create">
                <Button className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Write Your First Blog
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
