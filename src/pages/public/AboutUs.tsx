import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import GroupsIcon from '@mui/icons-material/Groups'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const AboutUs = () => {
  const team = [
    { name: 'Ahmed Khan', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    { name: 'Sara Ali', role: 'Operations Head', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    { name: 'Hassan Raza', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    { name: 'Fatima Noor', role: 'Customer Success', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
  ]

  const milestones = [
    { year: '2021', title: 'Founded', description: 'Started with a vision to revolutionize cricket booking' },
    { year: '2022', title: '100+ Venues', description: 'Partnered with over 100 rooftop venues across Pakistan' },
    { year: '2023', title: '50K Users', description: 'Reached 50,000 registered cricket enthusiasts' },
    { year: '2024', title: 'Expansion', description: 'Expanded to multiple cities with 500+ venues' },
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl shadow-glow mb-6">
            <SportsCricketIcon className="text-surface-darker text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-100 mb-6">
            About <span className="gradient-text">RoofTop Cricket</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We are on a mission to make cricket accessible to everyone by connecting players with premium indoor cricket venues across Pakistan.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: <SportsCricketIcon />, value: '500+', label: 'Rooftop Venues' },
            { icon: <GroupsIcon />, value: '50K+', label: 'Happy Players' },
            { icon: <EmojiEventsIcon />, value: '100K+', label: 'Bookings Made' },
            { icon: <TrendingUpIcon />, value: '25+', label: 'Cities Covered' },
          ].map((stat) => (
            <div key={stat.label} className="card p-6 text-center">
              <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center text-accent-400 mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-display font-bold text-accent-400 mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-100 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                RoofTop Cricket was born from a simple observation: cricket enthusiasts in urban areas struggled to find quality indoor cricket facilities and convenient booking options.
              </p>
              <p>
                Founded in 2021, we set out to create a platform that connects passionate cricketers with premium rooftop cricket venues. Our goal was to make the entire process seamless - from discovering venues to booking slots and making payments.
              </p>
              <p>
                Today, we're proud to be Pakistan's leading cricket booking platform, serving thousands of players and partnering with hundreds of rooftop venues across the country.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-2xl blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop"
              alt="Cricket"
              className="relative rounded-2xl shadow-card w-full"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-gray-100 text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary-700 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card p-6 inline-block">
                      <span className="text-accent-400 font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-gray-100 mt-1">{milestone.title}</h3>
                      <p className="text-gray-400 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-accent-500 rounded-full relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-100 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center group hover:border-accent-500/50 transition-all">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary-700 group-hover:ring-accent-500/50 transition-all"
                />
                <h3 className="text-lg font-semibold text-gray-100">{member.name}</h3>
                <p className="text-accent-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
