import { useState } from 'react'
import { Link } from 'react-router-dom'

// Icons
import SearchIcon from '@mui/icons-material/Search'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TuneIcon from '@mui/icons-material/Tune'


const ExploreRooftops = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 5000],
    rating: 0,
    amenities: [] as string[],
  })

  const locations = ['All', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan']
  const amenities = ['Cricket Equipment', 'Floodlights', 'Seating Area', 'Refreshments', 'Parking', 'Washrooms']

  const rooftops = [
    {
      id: 1,
      name: 'Elite Cricket Arena',
      location: 'Karachi, Pakistan',
      rating: 4.9,
      reviewCount: 234,
      pricePerHour: 1500,
      amenities: ['Cricket Equipment', 'Floodlights', 'Seating Area'],
      openTime: '6:00 AM',
      closeTime: '11:00 PM',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Sky High Nets',
      location: 'Lahore, Pakistan',
      rating: 4.7,
      reviewCount: 189,
      pricePerHour: 1200,
      amenities: ['Cricket Equipment', 'Parking', 'Refreshments'],
      openTime: '5:00 AM',
      closeTime: '10:00 PM',
      image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Urban Cricket Hub',
      location: 'Islamabad, Pakistan',
      rating: 4.8,
      reviewCount: 156,
      pricePerHour: 1800,
      amenities: ['Floodlights', 'Seating Area', 'Washrooms', 'Parking'],
      openTime: '6:00 AM',
      closeTime: '12:00 AM',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'Premier Cricket Zone',
      location: 'Karachi, Pakistan',
      rating: 4.6,
      reviewCount: 98,
      pricePerHour: 1000,
      amenities: ['Cricket Equipment', 'Floodlights'],
      openTime: '7:00 AM',
      closeTime: '10:00 PM',
      image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'Rooftop Cricket Club',
      location: 'Rawalpindi, Pakistan',
      rating: 4.5,
      reviewCount: 75,
      pricePerHour: 900,
      amenities: ['Cricket Equipment', 'Parking'],
      openTime: '6:00 AM',
      closeTime: '9:00 PM',
      image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      name: 'Cricket Paradise',
      location: 'Faisalabad, Pakistan',
      rating: 4.4,
      reviewCount: 62,
      pricePerHour: 800,
      amenities: ['Floodlights', 'Refreshments', 'Washrooms'],
      openTime: '5:30 AM',
      closeTime: '11:00 PM',
      image: 'https://images.unsplash.com/photo-1629285483773-6b5cde2171d7?w=400&h=300&fit=crop',
    },
  ]

  const filteredRooftops = rooftops.filter((rooftop) => {
    const matchesSearch = rooftop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rooftop.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !filters.location || filters.location === 'All' ||
      rooftop.location.includes(filters.location)
    const matchesPrice = rooftop.pricePerHour >= filters.priceRange[0] &&
      rooftop.pricePerHour <= filters.priceRange[1]
    const matchesRating = rooftop.rating >= filters.rating

    return matchesSearch && matchesLocation && matchesPrice && matchesRating
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
          Explore <span className="gradient-text">Rooftops</span>
        </h1>
        <p className="text-gray-400 mt-1">Find the perfect cricket venue near you</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search rooftops by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-accent-500 text-white' : ''}`}
        >
          <TuneIcon /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="card p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-100">Filters</h3>
            <button
              onClick={() => setFilters({ location: '', priceRange: [0, 5000], rating: 0, amenities: [] })}
              className="text-accent-400 text-sm hover:text-accent-300"
            >
              Clear All
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Location */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="input-field"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Max Price: Rs. {filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                className="w-full accent-accent-500"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Min Rating: {filters.rating}+
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                className="w-full accent-accent-500"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenities.slice(0, 3).map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => {
                      const newAmenities = filters.amenities.includes(amenity)
                        ? filters.amenities.filter((a) => a !== amenity)
                        : [...filters.amenities, amenity]
                      setFilters({ ...filters, amenities: newAmenities })
                    }}
                    className={`text-xs px-2 py-1 rounded-full border transition-all ${filters.amenities.includes(amenity)
                      ? 'bg-accent-500 text-white border-accent-500'
                      : 'border-primary-600 text-gray-400 hover:border-accent-500'
                      }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400">
          Showing <span className="text-gray-100 font-medium">{filteredRooftops.length}</span> rooftops
        </p>
        <select className="input-field w-auto py-2 text-sm">
          <option>Sort by: Popular</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Price (High to Low)</option>
          <option>Sort by: Rating</option>
        </select>
      </div>

      {/* Rooftops Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooftops.map((rooftop) => (
          <div
            key={rooftop.id}
            className="card overflow-hidden group hover:border-accent-500/50 transition-all flex flex-col"
          >
            <Link to={`/rooftop/${rooftop.id}`} className="block relative h-48 overflow-hidden">
              <img
                src={rooftop.image}
                alt={rooftop.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-surface-dark/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <StarIcon className="text-accent-400" fontSize="small" />
                <span className="text-gray-100 text-sm font-medium">{rooftop.rating}</span>
              </div>
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <Link to={`/rooftop/${rooftop.id}`}>
                <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-accent-400 transition-colors">
                  {rooftop.name}
                </h3>
              </Link>
              <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                <LocationOnIcon fontSize="small" />
                <span>{rooftop.location}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                <AccessTimeIcon fontSize="small" />
                <span>{rooftop.openTime} - {rooftop.closeTime}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {rooftop.amenities.slice(0, 3).map((amenity) => (
                  <span key={amenity} className="text-xs px-2 py-1 bg-primary-700/50 text-gray-300 rounded">
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-primary-700/30 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">{rooftop.reviewCount} reviews</span>
                  <span className="text-accent-400 font-bold">
                    Rs. {rooftop.pricePerHour.toLocaleString()}/hr
                  </span>
                </div>
                <Link
                  to={`/book/${rooftop.id}`}
                  className="btn-primary py-2 px-4 text-sm whitespace-nowrap"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRooftops.length === 0 && (
        <div className="card p-12 text-center">
          <SearchIcon className="text-gray-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-100 mb-2">No rooftops found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default ExploreRooftops
