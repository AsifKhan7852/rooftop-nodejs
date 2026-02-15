import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { openAuthModal } from '../../store/slices/uiSlice'

// Icons
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import SearchIcon from '@mui/icons-material/Search'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PaymentIcon from '@mui/icons-material/Payment'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import GroupsIcon from '@mui/icons-material/Groups'
import VerifiedIcon from '@mui/icons-material/Verified'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'


const Landing = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleViewAll = () => {
    if (isAuthenticated) {
      navigate('/explore')
    } else {
      dispatch(openAuthModal('login'))
    }
  }

  const features = [
    {
      icon: <SearchIcon className="text-2xl" />,
      title: 'Find Rooftops',
      description: 'Browse through our extensive collection of premium indoor cricket venues. Filter by location, price, and rating to find your perfect match.',
      quote: '"Finding a good ground used to take hours of calls. Now it takes minutes." - Saad, Weekend Cricketer',
    },
    {
      icon: <CalendarMonthIcon className="text-2xl" />,
      title: 'Book Instantly',
      description: 'Select your preferred time slots and book instantly with our real-time availability system. No more double bookings or waiting for confirmations.',
      quote: '"The real-time availability check is a game changer. We just book and go play." - Team Falcons',
    },
    {
      icon: <PaymentIcon className="text-2xl" />,
      title: 'Secure Payment',
      description: 'Pay securely online with multiple payment options including JazzCash, EasyPaisa, and Credit Cards. Instant confirmation and digital receipts.',
      quote: '"Secure payments give us peace of mind. We focus on the game, not the cash." - League Manager',
    },
  ]

  const stats = [
    { value: '500+', label: 'Rooftop Venues' },
    { value: '50K+', label: 'Happy Players' },
    { value: '100K+', label: 'Bookings Made' },
    { value: '4.8', label: 'Average Rating' },
  ]

  const benefits = [
    {
      icon: <VerifiedIcon />,
      title: 'Verified Venues',
      description: 'All rooftops are manually verified for quality, safety, and amenities to ensure the best cricketing experience.',
      quote: '"The quality of venues on this platform is unmatched. We always know what to expect." - Sarah Ahmed, Club Captain',
    },
    {
      icon: <AccessTimeIcon />,
      title: 'Flexible Timing',
      description: 'Book slots that fit your schedule, from early morning practice sessions to late-night matches under floodlights.',
      quote: '"Finally, a platform that understands cricket happens 24/7 in Pakistan!" - Ali Khan, Night Cricket League',
    },
    {
      icon: <GroupsIcon />,
      title: 'Group Bookings',
      description: 'Special packages and seamless booking management for corporate events, tournaments, and large groups.',
      quote: '"Organizing our corporate tournament was a breeze thanks to the bulk booking features." - TechCorp Sports Committee',
    },
    {
      icon: <SupportAgentIcon />,
      title: '24/7 Support',
      description: 'Our dedicated support team is always available to assist with bookings, cancellations, and venue inquiries.',
      quote: '"Had an issue with a booking and it was resolved in minutes. Excellent service!" - Omar Farooq',
    },
  ]

  const popularRooftops = [
    {
      id: 1,
      name: 'Elite Cricket Arena',
      location: 'Karachi, Pakistan',
      rating: 4.9,
      reviews: 234,
      price: 1500,
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Sky High Nets',
      location: 'Lahore, Pakistan',
      rating: 4.7,
      reviews: 189,
      price: 1200,
      image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Urban Cricket Hub',
      location: 'Islamabad, Pakistan',
      rating: 4.8,
      reviews: 156,
      price: 1800,
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop',
    },
  ]



  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center px-4 py-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-darker via-primary-900 to-surface-darker" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5 mb-6 animate-fade-in">
            <SportsCricketIcon className="text-emerald-400 text-sm" />
            <span className="text-emerald-400 text-xs font-medium">Pakistan's #1 Cricket Booking Platform</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-100 mb-4 animate-slide-up">
            Book Your Perfect
            <br />
            <span className="text-emerald-400">Cricket Session</span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto mb-6 animate-slide-up animate-delay-100">
            Discover premium rooftop cricket venues, book instant slots, and enjoy the game you love. Join thousands of cricketers playing every day.
          </p>

          <blockquote className="text-emerald-400/80 italic text-sm mb-8 animate-slide-up animate-delay-150">
            "The best way to keep the passion for cricket alive in the city!"
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up animate-delay-200">
            <button onClick={handleViewAll} className="btn-primary flex items-center gap-2 text-sm px-6 py-3">
              Explore Rooftops <ArrowForwardIcon fontSize="small" />
            </button>
            <button
              onClick={() => dispatch(openAuthModal('signup'))}
              className="btn-secondary flex items-center gap-2 text-sm px-6 py-3"
            >
              <PlayArrowIcon fontSize="small" /> Register Your Venue
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-slide-up animate-delay-300">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-emerald-400 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-surface-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-100 mb-2">
              How It <span className="text-emerald-400">Works</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Book your cricket session in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card card-hover p-6 flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-surface-darker">
                  {feature.icon}
                </div>
                <div className="w-6 h-6 bg-primary-700 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xs">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-gray-100">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{feature.description}</p>
                <p className="text-emerald-400/80 text-xs italic mt-auto">
                  "{feature.quote.split('" -')[0].replace('"', '')}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Rooftops */}
      <section id="rooftops" className="py-16 px-4 bg-surface-darker">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-100 mb-1">
                Popular <span className="text-emerald-400">Rooftops</span>
              </h2>
              <p className="text-gray-400 text-sm">Top-rated venues loved by cricketers</p>
            </div>
            <button
              onClick={handleViewAll}
              className="hidden md:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium"
            >
              View All <ArrowForwardIcon fontSize="small" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularRooftops.map((rooftop) => (
              <div
                key={rooftop.id}
                onClick={handleViewAll}
                className="card card-hover overflow-hidden cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={rooftop.image}
                    alt={rooftop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-surface-dark/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                    <StarIcon className="text-amber-400 text-sm" />
                    <span className="text-gray-100 text-xs font-medium">{rooftop.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-100 mb-1 group-hover:text-emerald-400 transition-colors">
                    {rooftop.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                    <LocationOnIcon className="text-sm" />
                    <span>{rooftop.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{rooftop.reviews} reviews</span>
                    <span className="text-emerald-400 font-semibold text-sm">
                      Rs. {rooftop.price.toLocaleString()}/hr
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewAll()
                    }}
                    className="w-full mt-3 bg-primary-700/50 hover:bg-emerald-500 hover:text-surface-darker text-gray-300 text-xs font-medium py-2 rounded transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleViewAll}
            className="md:hidden flex items-center justify-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium mt-6 mx-auto"
          >
            View All Rooftops <ArrowForwardIcon fontSize="small" />
          </button>
        </div>
      </section>


      {/* About Us Section */}
      <section id="about" className="py-16 px-4 bg-surface-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-100 mb-2">
              About <span className="text-emerald-400">Us</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              RoofTop Cricket is Pakistan's premier platform for booking indoor cricket venues.
              Our mission is to make cricket accessible to everyone, anytime. We connect passionate
              cricketers with high-quality rooftop venues, ensuring a seamless and secure booking experience.
              Whether you're a casual player or a serious league, we've got the perfect pitch for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card p-5 text-center group hover:border-emerald-500/50 transition-all">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mx-auto mb-3 group-hover:bg-emerald-500 group-hover:text-surface-darker transition-all">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-100 mb-1">{benefit.title}</h3>
                <p className="text-gray-400 text-xs mb-3">{benefit.description}</p>
                <div className="pt-3 border-t border-primary-700/30">
                  <p className="text-emerald-400/80 text-[10px] italic">{benefit.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-primary-800 via-primary-900 to-surface-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-50" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-100 mb-3">
            Own a Rooftop Cricket Venue?
          </h2>
          <p className="text-sm text-gray-300 mb-6 max-w-xl mx-auto">
            Join our platform and reach thousands of cricket enthusiasts. Manage your bookings effortlessly.
          </p>
          <button
            onClick={() => dispatch(openAuthModal('signup'))}
            className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
          >
            Register Your Venue <ArrowForwardIcon fontSize="small" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Landing
