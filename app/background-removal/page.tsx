"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Squares } from "@/components/ui/squares-background"

export default function BackgroundRemoval() {
  const [image, setImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveBackground = async () => {
    if (!image) return

    setIsProcessing(true)

    // Simulating background removal process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real application, you would send the image to a server or use a client-side
    // library to remove the background. For this example, we're just using the same image.
    setProcessedImage(image)
    setIsProcessing(false)
  }

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a")
      link.href = processedImage
      link.download = "processed-image.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Squares
        className="fixed inset-0 z-[-1]"
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Background Removal Tool</h1>
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <Input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="mb-4" />
          {image && (
            <div className="mb-4">
              <img src={image || "/placeholder.svg"} alt="Original" className="max-w-full h-auto rounded" />
            </div>
          )}
          <Button onClick={handleRemoveBackground} disabled={!image || isProcessing} className="w-full mb-4">
            {isProcessing ? "Processing..." : "Remove Background"}
          </Button>
          {processedImage && (
            <div>
              <img
                src={processedImage || "/placeholder.svg"}
                alt="Processed"
                className="max-w-full h-auto rounded mb-4"
              />
              <Button onClick={handleDownload} className="w-full">
                Download Processed Image
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
