import { Send, X } from "lucide-react"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { toast } from "sonner"
import type { GeminiMessage } from "../lib/gemini-service"
import { sendMessageToGemini } from "../lib/gemini-service"
import "../styles/markdown.css"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Input } from "./ui/input"

interface ChatWindowProps {
   onClose: () => void
}

// Custom code component props type
interface CodeProps extends ComponentPropsWithoutRef<"code"> {
   inline?: boolean
   className?: string
   children: ReactNode
   node?: any // For compatibility with react-markdown
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
   const [messages, setMessages] = useState<GeminiMessage[]>([
      {
         role: "assistant",
         content: "Hi there! I'm your Web Dev assistant. How can I help you today?"
      }
   ])
   const [input, setInput] = useState("")
   const [isLoading, setIsLoading] = useState(false)
   const endOfMessagesRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [messages])

   const handleSendMessage = async () => {
      if (!input.trim()) return

      const userMessage: GeminiMessage = {
         role: "user",
         content: input
      }

      setMessages(prev => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
         const response = await sendMessageToGemini(input)

         const botResponse: GeminiMessage = {
            role: "assistant",
            content: response
         }

         setMessages(prev => [...prev, botResponse])
      } catch (error) {
         console.error("Error calling Gemini API:", error)
         toast.error("Failed to get a response. Please try again.")

         setMessages(prev => [
            ...prev,
            {
               role: "assistant",
               content: "Sorry, I encountered an error. Please try again later."
            }
         ])
      } finally {
         setIsLoading(false)
      }
   }

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault()
         handleSendMessage()
      }
   }

   return (
      <Card className="fixed bottom-20 left-6 w-80 md:w-96 h-[500px] shadow-xl flex flex-col z-50">
         <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <div className="flex items-center">
               <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/assistant-avatar.png" />
                  <AvatarFallback>AI</AvatarFallback>
               </Avatar>
               <h3 className="font-semibold">Web Dev Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
               <X className="h-4 w-4" />
            </Button>
         </CardHeader>

         <CardContent className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((message, index) => (
               <div
                  key={index}
                  className={`flex ${
                     message.role === "user" ? "justify-end" : "justify-start"
                  }`}
               >
                  <div
                     className={`max-w-[80%] px-3 py-2 rounded-lg ${
                        message.role === "user"
                           ? "bg-primary text-primary-foreground"
                           : "bg-muted"
                     }`}
                  >
                     {message.role === "user" ? (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                     ) : (
                        <div className="markdown-body text-sm bg-transparent">
                           <ReactMarkdown
                              components={{
                                 code({ node, inline, className, children, ...props }: CodeProps) {
                                    const match = /language-(\w+)/.exec(className || "")
                                    return !inline && match ? (
                                       <SyntaxHighlighter
                                          style={oneDark}
                                          language={match[1]}
                                          PreTag="div"
                                          {...props}
                                       >
                                          {String(children).replace(/\n$/, "")}
                                       </SyntaxHighlighter>
                                    ) : (
                                       <code className={className} {...props}>
                                          {children}
                                       </code>
                                    )
                                 }
                              }}
                           >
                              {message.content}
                           </ReactMarkdown>
                        </div>
                     )}
                  </div>
               </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="max-w-[80%] px-3 py-2 rounded-lg bg-muted">
                     <p className="text-sm">Thinking...</p>
                  </div>
               </div>
            )}
            <div ref={endOfMessagesRef} />
         </CardContent>

         <CardFooter className="p-3 pt-0">
            <div className="flex w-full items-center space-x-2">
               <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
               />
               <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
               >
                  <Send className="h-4 w-4" />
               </Button>
            </div>
         </CardFooter>
      </Card>
   )
}