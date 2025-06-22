"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from "@/lib/i18n"
import { Facebook, Twitter, Instagram, Share2, Copy, Mail, Check } from "lucide-react"
import { WhatsAppChat } from "@/components/whatsapp-chat"

interface SocialShareProps {
  url: string
  title: string
  description: string
  image?: string
  hashtags?: string[]
  petName?: string
  petBreed?: string
  petGender?: string
  petAge?: string
  petPrice?: string
  shelterName?: string
  shelterPhone?: string
  compact?: boolean
  className?: string
}

export function SocialShare({
  url,
  title,
  description,
  image,
  hashtags = ["PetAdoption", "AdoptDontShop"],
  petName,
  petBreed,
  petGender,
  petAge,
  petPrice,
  shelterName,
  shelterPhone,
  compact = false,
  className = "",
}: SocialShareProps) {
  const { t, formatMessage } = useTranslations()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Generate share messages for different platforms
  const generateShareText = (platform: "facebook" | "twitter" | "instagram" | "whatsapp" | "email") => {
    const variables = {
      name: petName || title,
      breed: petBreed || "",
      shelter: shelterName || "",
      price: petPrice || "",
      gender: petGender || "",
      age: petAge || "",
      description: description || "",
    }

    // Different message formats based on available information
    let messageTemplate = t.share.messages.pet
    if (shelterName && petPrice) {
      messageTemplate = t.share.messages.petComplete
    } else if (shelterName) {
      messageTemplate = t.share.messages.petWithShelter
    } else if (petPrice) {
      messageTemplate = t.share.messages.petWithPrice
    }

    // Format the message with variables
    const message = formatMessage(messageTemplate, variables)

    // Platform-specific formatting
    switch (platform) {
      case "twitter":
        // Twitter has character limits
        return message.length > 280 ? message.substring(0, 277) + "..." : message
      case "whatsapp":
        // WhatsApp likes to have URLs at the end
        return `${message}\n\n${url}`
      case "email":
        // Email can be longer and more formal
        return `${message}\n\n${description}\n\n${url}`
      default:
        return message
    }
  }

  // Share handlers for different platforms
  const handleShare = async () => {
    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: t.share.messages.error,
          variant: "destructive",
        })
      }
    } else {
      // Fallback to copy to clipboard
      handleCopyLink()
    }
  }

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url,
    )}&quote=${encodeURIComponent(generateShareText("facebook"))}`
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const handleTwitterShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      generateShareText("twitter"),
    )}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(",")}`
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct web sharing API
    // We'll show instructions or copy a caption for Instagram
    toast({
      title: "Instagram Sharing",
      description: "Copy the pet details and share a screenshot on Instagram",
    })
    handleCopyLink()
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`${t.share.title}: ${petName || title}`)
    const body = encodeURIComponent(generateShareText("email"))
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast({
      title: "Success",
      description: t.share.messages.copied,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // Compact version (just a share button with popover)
  if (compact) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <Share2 className="w-4 h-4 mr-2" />
            {t.share.cta}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{t.share.title}</h4>
              <p className="text-sm text-muted-foreground">{t.share.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleFacebookShare}>
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.share.platforms.facebook}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleTwitterShare}>
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.share.platforms.twitter}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleInstagramShare}>
                      <Instagram className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.share.platforms.instagram}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {shelterPhone && (
                <WhatsAppChat
                  phoneNumber={shelterPhone}
                  petName={petName}
                  shelterName={shelterName}
                  message={generateShareText("whatsapp")}
                  variant="outline"
                  size="icon"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                  </svg>
                </WhatsAppChat>
              )}

              <Button variant="outline" size="icon" onClick={handleEmailShare}>
                <Mail className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  // Full version (card with tabs and options)
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t.share.title}</CardTitle>
        <CardDescription>{t.share.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="social">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="direct">Direct Share</TabsTrigger>
          </TabsList>
          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Button onClick={handleFacebookShare} className="flex flex-col h-auto py-4 bg-blue-600 hover:bg-blue-700">
                <Facebook className="h-6 w-6 mb-1" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button onClick={handleTwitterShare} className="flex flex-col h-auto py-4 bg-sky-500 hover:bg-sky-600">
                <Twitter className="h-6 w-6 mb-1" />
                <span className="text-xs">X</span>
              </Button>
              <Button
                onClick={handleInstagramShare}
                className="flex flex-col h-auto py-4 bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-500 hover:opacity-90"
              >
                <Instagram className="h-6 w-6 mb-1" />
                <span className="text-xs">Instagram</span>
              </Button>
            </div>
            <div className="text-xs text-gray-500 text-center">
              {image && (
                <div className="mt-2 mb-4">
                  <p className="mb-2">Preview Image:</p>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-32 object-cover rounded-md mx-auto"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
              <p className="mt-2">
                Sharing this pet will help them find a forever home faster. Thank you for spreading the word!
              </p>
            </div>
          </TabsContent>
          <TabsContent value="direct" className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mt-4">
              {shelterPhone && (
                <WhatsAppChat
                  phoneNumber={shelterPhone}
                  petName={petName}
                  shelterName={shelterName}
                  message={generateShareText("whatsapp")}
                  className="flex items-center justify-center"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                  </svg>
                  WhatsApp
                </WhatsAppChat>
              )}
              <Button onClick={handleEmailShare} variant="outline">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Button onClick={handleCopyLink} variant="outline">
                  {copied ? <Check className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
              <Button onClick={handleShare} variant="outline" className="px-3">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
