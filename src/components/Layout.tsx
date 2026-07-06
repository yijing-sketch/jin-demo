import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <h1 className="text-lg font-bold text-gray-800">企业AI就绪度评估</h1>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {children}
      </main>
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-100">
        © 2026 AI Readiness Assessment · 数据仅存储在您的浏览器中
      </footer>
    </div>
  )
}
