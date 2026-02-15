import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Icons
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonIcon from '@mui/icons-material/Person'

const RooftopDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')

  // Mock rooftop data
  const rooftop = {
    id: 1,
    name: 'Elite Cricket Arena',
    location: 'Karachi, Pakistan',
    address: 'Plot 123, Block B, DHA Phase 6, Karachi',
    description: 'Elite Cricket Arena is a premium indoor cricket facility featuring professional-grade nets, high-quality equipment, and excellent lighting for day and night play. Our venue is perfect for practice sessions, friendly matches, and corporate events.',
    rating: 4.9,
    reviewCount: 234,
    pricePerHour: 1500,
    amenities: ['Cricket Equipment', 'Floodlights', 'Seating Area', 'Parking', 'Refreshments', 'Washrooms'],
    openTime: '6:00 AM',
    closeTime: '11:00 PM',
    phone: '+92 300 1234567',
    email: 'info@elitecricket.pk',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',
    ],
    owner: {
      name: 'Ahmed Sports Complex',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    reviews: [
      { id: 1, user: 'Ali Hassan', rating: 5, comment: 'Excellent facility! Great equipment and friendly staff.', date: '2024-02-10' },
      { id: 2, user: 'Sara Khan', rating: 4, comment: 'Good place for practice. Lighting could be better.', date: '2024-02-05' },
      { id: 3, user: 'Usman Ahmed', rating: 5, comment: 'Best rooftop cricket in Karachi!', date: '2024-01-28' },
    ],
  }

  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error('Please select a date first')
      return
    }
    navigate(`/book/${id}?date=${selectedDate}`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-accent-400 transition-colors"
      >
        <ArrowBackIcon /> Back to Rooftops
      </button>

      {/* Image Gallery */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <img
            src={rooftop.images[selectedImage]}
            alt={rooftop.name}
            className="w-full h-80 md:h-96 object-cover rounded-xl"
          />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-4">
          {rooftop.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index ? 'border-accent-500' : 'border-transparent'
              }`}
            >
              <img src={image} alt="" className="w-full h-20 md:h-28 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="card p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
                  {rooftop.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-gray-400">
                    <LocationOnIcon fontSize="small" /> {rooftop.location}
                  </span>
                  <span className="flex items-center gap-1 text-accent-400">
                    <StarIcon fontSize="small" /> {rooftop.rating} ({rooftop.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-400">
                  Rs. {rooftop.pricePerHour.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">per hour</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-3">About</h2>
            <p className="text-gray-400">{rooftop.description}</p>
          </div>

          {/* Amenities */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {rooftop.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-gray-300">
                  <CheckCircleIcon className="text-green-400" fontSize="small" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Timing & Contact */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center text-accent-400">
                  <AccessTimeIcon />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Operating Hours</div>
                  <div className="text-gray-100">{rooftop.openTime} - {rooftop.closeTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center text-accent-400">
                  <PhoneIcon />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-gray-100">{rooftop.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center text-accent-400">
                  <EmailIcon />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-gray-100">{rooftop.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center text-accent-400">
                  <LocationOnIcon />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Address</div>
                  <div className="text-gray-100">{rooftop.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Reviews</h2>
              <span className="text-gray-400 text-sm">{rooftop.reviews.length} reviews</span>
            </div>
            <div className="space-y-4">
              {rooftop.reviews.map((review) => (
                <div key={review.id} className="border-b border-primary-700/30 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center text-gray-300">
                        <PersonIcon />
                      </div>
                      <div>
                        <div className="text-gray-100 font-medium">{review.user}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              fontSize="small"
                              className={i < review.rating ? 'text-accent-400' : 'text-gray-600'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-400 ml-13">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Booking Widget */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Book a Slot</h3>
            
            {/* Owner Info */}
            <div className="flex items-center gap-3 p-3 bg-primary-700/30 rounded-lg mb-4">
              <img
                src={rooftop.owner.image}
                alt={rooftop.owner.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="text-gray-100 font-medium">{rooftop.owner.name}</div>
                <div className="text-gray-400 text-sm">Venue Owner</div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>

            {/* Price Summary */}
            <div className="border-t border-primary-700/30 pt-4 mb-4">
              <div className="flex justify-between text-gray-400 mb-2">
                <span>Price per hour</span>
                <span>Rs. {rooftop.pricePerHour.toLocaleString()}</span>
              </div>
            </div>

            {/* Book Button */}
            <button onClick={handleBookNow} className="w-full btn-primary">
              Continue to Booking
            </button>

            <p className="text-gray-500 text-xs text-center mt-4">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RooftopDetail
