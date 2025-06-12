import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge className="px-3 py-1 text-sm" variant="outline">
              Learn Web3 Development
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Master Frontend Web3 Development
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Learn to build decentralized applications with modern tools and frameworks.
              From blockchain basics to advanced frontend patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">View Curriculum</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Topics</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our comprehensive curriculum covers everything you need to become a skilled Web3 frontend developer.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="p-2 rounded-lg w-fit bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">{feature.content}</CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of developers building the future of the web with blockchain technology.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg">Start Learning Now</Button>
              <Button size="lg" variant="outline">Join Community</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              © 2023 Web3 Tutorial App. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology",
    content: "Understand decentralization, consensus mechanisms, and the blockchain data structure.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
  },
  {
    title: "Smart Contract Integration",
    description: "Connect your frontend to blockchain contracts",
    content: "Learn to interact with Ethereum and other blockchain networks from your web applications.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  },
  {
    title: "Web3 Libraries",
    description: "Master essential Web3 development tools",
    content: "Get hands-on experience with ethers.js, web3.js, and other popular libraries for blockchain interaction.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  },
  {
    title: "React for Web3",
    description: "Build modern UIs for decentralized apps",
    content: "Learn specialized patterns for managing blockchain state and user interactions in React applications.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
  },
  {
    title: "Wallet Connections",
    description: "Implement secure crypto wallet integrations",
    content: "Authenticate users with MetaMask, WalletConnect, and other popular Web3 wallet providers.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
  },
  {
    title: "Decentralized Storage",
    description: "Store data with IPFS and other solutions",
    content: "Learn how to use decentralized storage systems for your application's data and assets.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.29 7 8.11 4.66c.19.11.41.11.6 0L20.11 7"/><path d="M12 22V12"/></svg>
  }
];