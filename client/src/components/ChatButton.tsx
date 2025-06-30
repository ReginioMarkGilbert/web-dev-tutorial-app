import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import ChatWindow from "./ChatWindow"
import { Button } from "./ui/button"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(true)

  // Hide notification after chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowNotification(false)
    }
  }, [isOpen])

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 rounded-full w-14 h-14 p-0 shadow-lg z-50 bg-primary hover:bg-primary/90 transition-all duration-300 group"
      >
        {!isOpen && <span className="absolute w-full h-full rounded-full animate-ping bg-primary/50 opacity-75"></span>}
        <MessageCircle className="w-6 h-6" />
        {showNotification && (
          <span className="absolute right-0 top-0 -mr-1 -mt-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        )}
      </Button>

      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  )
}