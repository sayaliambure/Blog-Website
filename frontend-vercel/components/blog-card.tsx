import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  blog: {
    id: string
    title: string
    excerpt: string
    created_at: string
    author: {
      name: string
    }
  }
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="pb-3">
        <Link href={`/blog/${blog.id}`} className="block">
          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h2>
        </Link>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {blog.author.name}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(blog.created_at)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3 mb-4">{blog.excerpt}</p>
        <Link href={`/blog/${blog.id}`}>
          <Badge variant="secondary" className="hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer">
            Read More
          </Badge>
        </Link>
      </CardContent>
    </Card>
  )
}
