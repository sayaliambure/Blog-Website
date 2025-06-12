import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { logoutUser } from "@/app/actions/auth"
import { PenTool, LogOut, User } from "lucide-react"

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            BlogSpace
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/create">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <PenTool className="h-4 w-4" />
                    Write
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  {user.name}
                </div>
                <form action={logoutUser}>
                  <Button variant="ghost" size="sm" type="submit" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
