"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Heart, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// For now, we'll use a simple approach - you just need to list your actual files here
// Replace these with your actual filenames from /public/images/slideshow/
const YOUR_ACTUAL_FILES = [
  "4f4a9fce-8a67-4cc3-bc99-9b00f8c8148d.jpg",
  "a9f41210-b336-4aba-a16e-d5a855f0633a.jpg",
  "df3dcb29-2d27-4cb3-a9cb-ed60a8db14f2.jpg",
  "efcc6c50-323e-4e56-9ab8-5183b113cf5a.jpg",
  "IMG_3038.MOV",
  "IMG_3220.PNG",
  "IMG_3891.PNG",
  "IMG_4350.PNG",
  "IMG_4352.PNG",
  "IMG_5861.PNG",
  "IMG_5862.PNG",
  "IMG_6034.PNG",
  "IMG_6049.PNG",
  "IMG_6065.PNG",
  "IMG_6066.PNG",
  "IMG_20230813_170945323.jpg",
  "IMG_20231006_152936423.jpg",
  "IMG_20231007_195755312.jpg",
  "IMG_20231007_195757678.jpg",
  "IMG_20231007_195801325.jpg",
  "IMG_20231007_205723018.jpg",
  "IMG_20240210_164932707.jpg",
  "IMG-20230524-WA0059.jpg",
  "Screenshot_20230601-203829.png"
];

const getMediaFiles = () => {
  return YOUR_ACTUAL_FILES.map((filename, index) => {
    // Check if it's a placeholder or real file
    const isPlaceholder = filename.startsWith("placeholder")

    if (isPlaceholder) {
      // Generate placeholder images
      const queries = [
        "beautiful sunset over mountains",
        "delicious strawberry cake",
        "cozy coffee shop interior",
        "colorful flower garden",
        "vintage bookshelf with books",
        "peaceful beach waves",
        "cute cat sleeping",
        "city skyline at night",
        "fresh morning coffee",
        "blooming cherry blossoms",
      ]

      return {
        src: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(queries[index % queries.length])}`,
        alt: `Beautiful moment ${index + 1}`,
        caption: generateCaption(queries[index % queries.length]),
        isVideo: false,
        type: "image",
      }
    }

    // Handle real files
    const extension = filename.toLowerCase().split(".").pop()
    const isVideo = ["mp4", "mov", "webm", "avi"].includes(extension || "")

    return {
      src: `/images/slideshow/${filename}`,
      alt: `Media ${index + 1}`,
      caption: generateCaption(filename),
      isVideo: isVideo,
      type: isVideo ? "video" : "image",
    }
  })
}

// Generate captions based on filename or content
const generateCaption = (input: string) => {
  const name = input.toLowerCase()

  const captions: { [key: string]: string } = {
    sunset: "Golden hour magic",
    beach: "Ocean vibes",
    coffee: "Morning fuel",
    flower: "Blooming beauty",
    mountain: "Peak adventures",
    food: "Delicious moments",
    cat: "Feline friends",
    dog: "Puppy love",
    travel: "Wanderlust",
    nature: "Wild and free",
    friend: "Good times",
    art: "Creative expression",
    music: "Sound waves",
    book: "Story time",
    garden: "Growing dreams",
    city: "Urban jungle",
    memory: "Precious moments",
    adventure: "Thrill seeking",
    vacation: "Escape reality",
    cake: "Sweet treats",
    cherry: "Spring vibes",
    night: "After dark",
    morning: "Fresh start",
  }

  // Check if input contains any keywords
  for (const [keyword, caption] of Object.entries(captions)) {
    if (name.includes(keyword)) {
      return caption
    }
  }

  // Default captions
  const defaultCaptions = [
    "Beautiful moments",
    "Life captured",
    "Sweet memories",
    "Pure joy",
    "Amazing times",
    "Perfect vibes",
    "Special moments",
    "Good energy",
    "Happy days",
    "Peaceful times",
  ]

  return defaultCaptions[Math.floor(Math.random() * defaultCaptions.length)]
}

const capybaraImages = ["/images/capy-pixel.jpg", "/images/capy-front.png", "/images/capy-plant.png"]

const getRandomCapybara = () => {
  return capybaraImages[Math.floor(Math.random() * capybaraImages.length)]
}

export default function CapybaraSlideshow() {
  const [slideshowMedia] = useState(getMediaFiles())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [likes, setLikes] = useState(0)
  const [objectFit, setObjectFit] = useState<"cover" | "contain">("contain")

  useEffect(() => {
    if (!isPlaying || slideshowMedia.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slideshowMedia.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, slideshowMedia.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slideshowMedia.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === slideshowMedia.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const shuffleSlides = () => {
    const randomIndex = Math.floor(Math.random() * slideshowMedia.length)
    setCurrentIndex(randomIndex)
  }

  const toggleObjectFit = () => {
    setObjectFit(objectFit === "contain" ? "cover" : "contain")
  }

  if (slideshowMedia.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center">
        <div className="text-center text-pink-700" style={{ fontFamily: '"Press Start 2P", monospace' }}>
          <p className="text-sm mb-4">No media files found!</p>
          <p className="text-xs">Add your filenames to the YOUR_ACTUAL_FILES array</p>
        </div>
      </div>
    )
  }

  const currentMedia = slideshowMedia[currentIndex]

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4 relative overflow-hidden"
      style={{
        fontFamily: '"Press Start 2P", monospace',
        background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 50%, #f9a8d4 75%, #f472b6 100%)",
      }}
    >
      {/* Capybara Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute top-10 left-10 w-16 h-16 rotate-12"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute top-32 right-20 w-12 h-12 -rotate-6"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute bottom-20 left-32 w-14 h-14 rotate-45"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute bottom-40 right-10 w-10 h-10 -rotate-12"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute top-1/2 left-1/4 w-20 h-20 rotate-90"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute top-1/3 right-1/3 w-12 h-12 -rotate-45"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute top-20 left-1/2 w-8 h-8 rotate-180"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute bottom-10 right-1/2 w-16 h-16 rotate-12"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute top-40 left-20 w-10 h-10 -rotate-30"
        />
        <img
          src={getRandomCapybara() || "/placeholder.svg"}
          alt="Pixel capybara"
          className="absolute bottom-32 right-32 w-18 h-18 rotate-60"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-pink-700 mb-4 flex items-center justify-center gap-3 flex-wrap">
            <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-8 h-8 md:w-12 md:h-12" />
            <span>Kvoh's Album</span>
            <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-8 h-8 md:w-12 md:h-12" />
          </h1>
          <p className="text-sm md:text-base text-pink-600 flex items-center justify-center gap-2 flex-wrap">
            {"Chill vibes, curated moments - capybara approved!"}
            <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-4 h-4 md:w-6 md:h-6" />
          </p>
          <p className="text-xs text-pink-500 mt-2">
            {slideshowMedia.length} {slideshowMedia.length === 1 ? "item" : "items"} in collection
          </p>
        </div>

        {/* Main Slideshow */}
        <Card className="relative overflow-hidden rounded-3xl shadow-2xl bg-pink-50/90 backdrop-blur-sm border-4 border-pink-200">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-pink-50">
            {/* Media Content */}
            {currentMedia.isVideo ? (
              <video
                src={currentMedia.src}
                className={`w-full h-full transition-all duration-700 ease-in-out ${
                  objectFit === "contain" ? "object-contain" : "object-cover"
                }`}
                autoPlay
                muted
                loop
                playsInline
                onError={(e) => {
                  console.log("Video failed to load:", currentMedia.src)
                }}
              />
            ) : (
              <img
                src={currentMedia.src || "/placeholder.svg"}
                alt={currentMedia.alt}
                className={`w-full h-full transition-all duration-700 ease-in-out ${
                  objectFit === "contain" ? "object-contain" : "object-cover"
                }`}
                onError={(e) => {
                  console.log("Image failed to load:", currentMedia.src)
                }}
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-800/20 via-transparent to-transparent" />

            {/* Media Type Indicator */}
            {currentMedia.isVideo && (
              <div className="absolute top-4 left-4 bg-pink-500/80 text-white px-2 py-1 rounded-full text-xs">
                VIDEO
              </div>
            )}

            {/* Scaling Mode Indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-pink-500/80 text-white px-2 py-1 rounded-full text-xs">
              {objectFit === "contain" ? "FIT" : "FILL"}
            </div>

            {/* Capybara Corner Decoration */}
            <div className="absolute top-4 right-4">
              <img
                src={getRandomCapybara() || "/placeholder.svg"}
                alt="Pixel capybara"
                className="w-8 h-8 opacity-80"
              />
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-pink-100/30 hover:bg-pink-200/50 backdrop-blur-sm rounded-full h-12 w-12 text-pink-700 border-2 border-pink-300"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-pink-100/30 hover:bg-pink-200/50 backdrop-blur-sm rounded-full h-12 w-12 text-pink-700 border-2 border-pink-300"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-pink-50/95 backdrop-blur-sm rounded-2xl p-4 border-2 border-pink-200">
                <p className="text-xs md:text-sm font-bold text-pink-800 text-center flex items-center justify-center gap-2 flex-wrap">
                  <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-4 h-4" />
                  {currentMedia.caption}
                  <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-4 h-4" />
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
          <Button
            variant="outline"
            size="lg"
            onClick={togglePlayPause}
            className="rounded-full bg-pink-50/80 border-pink-300 hover:bg-pink-100 text-pink-700 text-xs"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={toggleObjectFit}
            className="rounded-full bg-pink-50/80 border-pink-300 hover:bg-pink-100 text-pink-700 text-xs"
          >
            {objectFit === "contain" ? "📐 Fit" : "🔍 Fill"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={shuffleSlides}
            className="rounded-full bg-pink-50/80 border-pink-300 hover:bg-pink-100 text-pink-700 text-xs"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleLike}
            className="rounded-full bg-rose-50/60 border-rose-200 hover:bg-rose-100/80 text-rose-500 text-xs"
          >
            <Heart className="h-4 w-4 mr-2 fill-current" />
            {likes} Likes
          </Button>
        </div>

        {/* Scaling Mode Explanation */}
        <div className="text-center mt-4">
          <p className="text-xs text-pink-600">
            Current mode: <strong>{objectFit === "contain" ? "Fit (shows full image)" : "Fill (crops to fit)"}</strong>
          </p>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-1 mt-6 flex-wrap max-w-2xl mx-auto">
          {slideshowMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                index === currentIndex
                  ? "bg-pink-400 border-pink-500 scale-125"
                  : "bg-pink-200 border-pink-300 hover:bg-pink-300"
              } ${media.isVideo ? "border-dashed" : ""}`}
              title={`${media.isVideo ? "Video" : "Image"}: ${media.caption}`}
            />
          ))}
        </div>

        {/* Media Counter */}
        <div className="text-center mt-4">
          <p className="text-xs text-pink-600">
            {currentIndex + 1} of {slideshowMedia.length} • {currentMedia.isVideo ? "Video" : "Image"}
          </p>
        </div>

        {/* Instructions */}
        

        {/* Capybara Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 text-center bg-pink-50/60 backdrop-blur-sm border-2 border-pink-200 rounded-2xl">
            <div className="text-2xl mb-2 flex justify-center">
              <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-pink-700 text-xs mb-2">Who's that wonderful girl?</h3>
            <p className="text-xs text-pink-600">Could she be any cuter?</p>
          </Card>

          <Card className="p-6 text-center bg-pink-50/60 backdrop-blur-sm border-2 border-pink-200 rounded-2xl">
            <div className="text-2xl mb-2 flex justify-center">
              <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-pink-700 text-xs mb-2">PPT Monday</h3>
            <p className="text-xs text-pink-600">LK?</p>
          </Card>

          <Card className="p-6 text-center bg-pink-50/60 backdrop-blur-sm border-2 border-pink-200 rounded-2xl">
            <div className="text-2xl mb-2 flex justify-center">
              <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-pink-700 text-xs mb-2">Wouuuu</h3>
            <p className="text-xs text-pink-600">Yeamm</p>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-pink-600">
          <p className="text-xs flex items-center justify-center gap-2 flex-wrap">
            <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-4 h-4" />
            {"Bringing you life's beautiful moments with capybara wisdom"}
            <img src={getRandomCapybara() || "/placeholder.svg"} alt="Capybara" className="w-4 h-4" />
          </p>
        </div>
      </div>
    </div>
  )
}
