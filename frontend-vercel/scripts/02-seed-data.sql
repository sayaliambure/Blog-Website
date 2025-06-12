-- Insert sample users (passwords are hashed version of 'password123')
INSERT INTO users (email, password_hash, name) VALUES
('john@example.com', '$2a$10$rOzJqQnQQjQjQjQjQjQjQeJ1J1J1J1J1J1J1J1J1J1J1J1J1J1J1J1', 'John Doe'),
('jane@example.com', '$2a$10$rOzJqQnQQjQjQjQjQjQjQeJ1J1J1J1J1J1J1J1J1J1J1J1J1J1J1J1', 'Jane Smith')
ON CONFLICT (email) DO NOTHING;

-- Insert sample blogs
INSERT INTO blogs (title, content, excerpt, author_id) VALUES
('Getting Started with Next.js', 
 'Next.js is a powerful React framework that makes building web applications a breeze. In this comprehensive guide, we''ll explore the key features that make Next.js stand out from other frameworks.

## Why Choose Next.js?

Next.js offers several advantages:
- **Server-Side Rendering (SSR)**: Improves SEO and initial page load times
- **Static Site Generation (SSG)**: Perfect for blogs and marketing sites
- **API Routes**: Build your backend and frontend in the same project
- **Automatic Code Splitting**: Only load the JavaScript you need

## Getting Started

To create a new Next.js project, run:

```bash
npx create-next-app@latest my-blog
cd my-blog
npm run dev
