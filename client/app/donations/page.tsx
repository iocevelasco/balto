"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, CreditCard, Smartphone, Building, Shield, Star, Users, DollarSign, Gift } from "lucide-react"
import Link from "next/link"

const donationAmounts = [
  { amount: 25, description: "Provides food for a cat for one week" },
  { amount: 50, description: "Covers basic veterinary checkup" },
  { amount: 100, description: "Sponsors a dog's vaccination package" },
  { amount: 250, description: "Funds emergency medical treatment" },
]

const shelters = [
  {
    id: 1,
    name: "Happy Paws Rescue",
    location: "San Francisco, CA",
    rating: 4.9,
    totalDonations: "$45,230",
    animalsHelped: 156,
    description: "Dedicated to rescuing and rehoming cats and dogs in the Bay Area",
    image: "/placeholder.svg?height=60&width=60",
    verified: true,
  },
  {
    id: 2,
    name: "Feline Friends Rescue",
    location: "Oakland, CA",
    rating: 4.8,
    totalDonations: "$32,180",
    animalsHelped: 89,
    description: "Specialized cat rescue focusing on senior and special needs cats",
    image: "/placeholder.svg?height=60&width=60",
    verified: true,
  },
  {
    id: 3,
    name: "Golden Hearts Shelter",
    location: "San Jose, CA",
    rating: 4.7,
    totalDonations: "$28,950",
    animalsHelped: 134,
    description: "Full-service shelter for dogs and cats with rehabilitation programs",
    image: "/placeholder.svg?height=60&width=60",
    verified: true,
  },
]

const impactStats = [
  { icon: Heart, label: "Animals Rescued", value: "2,847", color: "text-red-500" },
  { icon: Users, label: "Successful Adoptions", value: "2,156", color: "text-blue-500" },
  { icon: DollarSign, label: "Total Donations", value: "$156K", color: "text-green-500" },
  { icon: Building, label: "Partner Shelters", value: "12", color: "text-purple-500" },
]

const bankDetails = {
  bankName: "PetMatch Foundation Bank",
  accountName: "PetMatch Rescue Foundation",
  accountNumber: "1234567890123456",
  routingNumber: "021000021",
  swiftCode: "PMFBUSXX",
  iban: "US12PMFB0210000211234567890123456",
  address: "123 Foundation Street, New York, NY 10001",
  reference: "DONATION-{USER_ID}-{DATE}",
}

const cryptoOptions = [
  { name: "Bitcoin", symbol: "BTC", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
  { name: "Ethereum", symbol: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C" },
]

export default function DonationsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedShelter, setSelectedShelter] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isRecurring, setIsRecurring] = useState(false)
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    anonymous: false,
  })

  const finalAmount = selectedAmount || Number.parseFloat(customAmount) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="font-semibold text-lg">Make a Donation</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Hero Section */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Help Save Lives</h2>
            <p className="text-white/90 mb-4">
              Your donation directly supports the rescue, care, and rehoming of cats and dogs in need.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-sm text-white/80">Animals Rescued</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2,156</div>
                <div className="text-sm text-white/80">Successful Adoptions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {impactStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donation Amount */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose Donation Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {donationAmounts.map((option) => (
                <Button
                  key={option.amount}
                  variant={selectedAmount === option.amount ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-start ${
                    selectedAmount === option.amount ? "bg-purple-500 hover:bg-purple-600" : ""
                  }`}
                  onClick={() => {
                    setSelectedAmount(option.amount)
                    setCustomAmount("")
                  }}
                >
                  <div className="text-lg font-bold">${option.amount}</div>
                  <div className="text-xs text-left opacity-80">{option.description}</div>
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customAmount">Custom Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
              <Label htmlFor="recurring" className="text-sm">
                Make this a monthly recurring donation
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Select Shelter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose a Shelter to Support</CardTitle>
            <p className="text-sm text-gray-600">
              Select a specific shelter or choose "All Shelters" to distribute your donation
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant={selectedShelter === null ? "default" : "outline"}
              className={`w-full justify-start h-auto p-4 ${
                selectedShelter === null ? "bg-purple-500 hover:bg-purple-600" : ""
              }`}
              onClick={() => setSelectedShelter(null)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">All Shelters</div>
                  <div className="text-sm opacity-80">Distribute donation across all partner shelters</div>
                </div>
              </div>
            </Button>

            {shelters.map((shelter) => (
              <Button
                key={shelter.id}
                variant={selectedShelter === shelter.id ? "default" : "outline"}
                className={`w-full justify-start h-auto p-4 ${
                  selectedShelter === shelter.id ? "bg-purple-500 hover:bg-purple-600" : ""
                }`}
                onClick={() => setSelectedShelter(shelter.id)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={shelter.image || "/placeholder.svg"}
                    alt={shelter.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{shelter.name}</span>
                      {shelter.verified && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm opacity-80">{shelter.location}</div>
                    <div className="flex items-center space-x-4 text-xs opacity-70">
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{shelter.rating}</span>
                      </span>
                      <span>{shelter.animalsHelped} animals helped</span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="w-5 h-5 text-gray-600" />
                <Label htmlFor="card" className="flex-1">
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Smartphone className="w-5 h-5 text-gray-600" />
                <Label htmlFor="paypal" className="flex-1">
                  PayPal
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="bank" id="bank" />
                <Building className="w-5 h-5 text-gray-600" />
                <Label htmlFor="bank" className="flex-1">
                  Bank Transfer
                </Label>
              </div>
            </RadioGroup>

            {/* Bank Transfer Details */}
            {paymentMethod === "bank" && (
              <Card className="mt-4 bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span>Bank Transfer Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Bank Name</Label>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">{bankDetails.bankName}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(bankDetails.bankName)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Account Name</Label>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">{bankDetails.accountName}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(bankDetails.accountName)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Account Number</Label>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm font-mono">{bankDetails.accountNumber}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(bankDetails.accountNumber)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Routing Number</Label>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm font-mono">{bankDetails.routingNumber}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(bankDetails.routingNumber)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">SWIFT/BIC Code</Label>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm font-mono">{bankDetails.swiftCode}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(bankDetails.swiftCode)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">IBAN</Label>
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm font-mono">{bankDetails.iban}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(bankDetails.iban)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Bank Address</Label>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">{bankDetails.address}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(bankDetails.address)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Reference (Please include)</Label>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm font-mono">{bankDetails.reference}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(bankDetails.reference)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="font-medium text-yellow-800 mb-1">Important Instructions:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Please include the reference number in your transfer</li>
                      <li>• Transfers may take 1-3 business days to process</li>
                      <li>• You will receive a confirmation email once received</li>
                      <li>• For international transfers, additional fees may apply</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Donor Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Donor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="donorName">Full Name</Label>
              <Input
                id="donorName"
                value={donorInfo.name}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="donorEmail">Email Address</Label>
              <Input
                id="donorEmail"
                type="email"
                value={donorInfo.email}
                onChange={(e) => setDonorInfo((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={donorInfo.anonymous}
                onCheckedChange={(checked) => setDonorInfo((prev) => ({ ...prev, anonymous: !!checked }))}
              />
              <Label htmlFor="anonymous" className="text-sm">
                Make this donation anonymous
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Donation Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Donation Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Donation Amount:</span>
              <span className="font-semibold">${finalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee:</span>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Frequency:</span>
              <span className="font-semibold">{isRecurring ? "Monthly" : "One-time"}</span>
            </div>
            <div className="flex justify-between">
              <span>Beneficiary:</span>
              <span className="font-semibold">
                {selectedShelter ? shelters.find((s) => s.id === selectedShelter)?.name : "All Shelters"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-purple-600">${finalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mb-6 bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-700">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Secure Donation</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Your donation is processed securely with 256-bit SSL encryption. 100% of your donation goes directly to
              animal care.
            </p>
          </CardContent>
        </Card>

        {/* Donate Button */}
        <Button
          disabled={finalAmount <= 0 || !donorInfo.name || !donorInfo.email}
          className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mb-20"
        >
          <Heart className="w-5 h-5 mr-2" />
          {paymentMethod === "bank"
            ? `Get Bank Details for $${finalAmount.toFixed(2)}`
            : `Donate $${finalAmount.toFixed(2)} ${isRecurring ? "Monthly" : "Now"}`}
        </Button>
      </div>
    </div>
  )
}
