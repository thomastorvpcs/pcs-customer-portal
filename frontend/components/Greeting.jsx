'use client'

export default function Greeting() {
  const hour = new Date().getHours()
  const text =
    hour >= 5 && hour < 12 ? 'Good morning,' :
    hour >= 12 && hour < 17 ? 'Good afternoon,' :
    hour >= 17 && hour < 21 ? 'Good evening,' :
    'Good night,'

  return <p className="text-sm text-gray-500 dark:text-blue-300/60">{text}</p>
}
