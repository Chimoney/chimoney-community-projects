import Image from 'next/image'
import Home from 'app/home/page.js'
export default function Main() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Home />
    </main>
  )
}
