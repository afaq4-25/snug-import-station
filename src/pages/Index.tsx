import { useState, useEffect } from 'react';
import { Search, MapPin, Bell, SlidersHorizontal, ChevronDown, Mic, Map, Star, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CategoryChips from '@/components/CategoryChips';
import NearbySalonCard from '@/components/NearbySalonCard';
import { categories, featuredSalons, nearbySalons, bookings } from '@/data/mockData';
import { useGender } from '@/contexts/GenderContext';

const searchSuggestions = ['Haircut near me', 'Bridal makeup', 'Hair coloring', 'Beard trim', 'Spa packages'];

const HomePage = () => {
  const { gender, setGender } = useGender();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const genderCategories = categories.filter((c) => c.gender === gender);
  const completedBookings = bookings.filter((b) => b.status === 'completed');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setSelectedCategory(null);
  }, [gender]);

  const SkeletonCard = () =>
  <div className="flex-shrink-0 w-52 bg-card rounded-2xl overflow-hidden card-shadow">
      <div className="h-32 skeleton-shimmer rounded-t-2xl" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 skeleton-shimmer rounded-full" />
        <div className="h-3 w-1/2 skeleton-shimmer rounded-full" />
        <div className="h-3 w-2/3 skeleton-shimmer rounded-full" />
      </div>
    </div>;


  const SkeletonCarousel = () =>
  <div className="mx-5 aspect-[16/10] skeleton-shimmer rounded-2xl" />;


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20">
      {/* Header */}
      <header className="px-5 pt-5 pb-2 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 overflow-hidden border border-border">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                alt="avatar"
                className="w-full h-full object-cover" />

            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">Good morning,</p>
              <p className="font-heading font-semibold text-base text-foreground">Aarav</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-card border border-border px-3 py-2 rounded-xl">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs font-body font-medium text-foreground">Bangalore</span>
              <ChevronDown size={12} className="text-muted-foreground" />
            </button>
            <button className="relative p-2.5 bg-card border border-border rounded-xl">
              <Bell size={18} className="text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Text */}
      <div className="px-5 pt-4 pb-2">
        <h1 className="font-heading font-bold text-2xl text-foreground leading-tight">Premium Salons,</h1>
        <p className="font-serif text-lg text-muted-foreground italic">Handpicked for you.</p>
      </div>

      {/* Search */}
      <div className="px-5 py-3 relative">
        <div className={`flex items-center gap-2.5 bg-card border rounded-2xl px-4 py-3.5 transition-all duration-250 ${
        searchFocused ? 'border-primary shadow-md' : 'border-border card-shadow'}`
        }>
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search salon, service..."
            className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)} />

          <Mic size={18} className="text-muted-foreground flex-shrink-0 cursor-pointer active:text-primary transition-colors" />
          <SlidersHorizontal size={18} className="text-muted-foreground flex-shrink-0 cursor-pointer" />
        </div>

        {searchFocused && !searchQuery &&
        <div className="absolute left-5 right-5 top-full mt-1 bg-card border border-border rounded-2xl shadow-lg z-30 overflow-hidden animate-fade-in-up" style={{ animationDuration: '200ms' }}>
            <p className="text-[10px] font-heading font-semibold text-muted-foreground px-4 pt-3 pb-1 uppercase tracking-wider">Recent Searches</p>
            {searchSuggestions.map((s) =>
          <button
            key={s}
            onMouseDown={() => setSearchQuery(s)}
            className="w-full text-left px-4 py-2.5 text-sm font-body text-foreground hover:bg-secondary/50 flex items-center gap-2 transition-colors">

                <Search size={14} className="text-muted-foreground" />
                {s}
              </button>
          )}
          </div>
        }
      </div>

      {/* Gender Toggle */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-body text-base text-[#264d73]">Categories for
          </span>
          <div className="relative flex bg-card border border-border rounded-xl p-0.5">
            <div className="absolute top-0.5 bottom-0.5 rounded-lg bg-primary transition-transform duration-250 ease-out"
            style={{
              width: 'calc(50% - 2px)',
              transform: gender === 'male' ? 'translateX(2px)' : 'translateX(calc(100% + 2px))'
            }} />

            <button
              onClick={() => setGender('male')}
              className={`relative z-10 px-6 py-2 text-xs font-heading font-semibold rounded-lg transition-colors duration-200 ${
              gender === 'male' ? 'text-primary-foreground' : 'text-muted-foreground'}`
              }>

              Men
            </button>
            <button
              onClick={() => setGender('female')}
              className={`relative z-10 px-6 py-2 text-xs font-heading font-semibold rounded-lg transition-colors duration-200 ${
              gender === 'female' ? 'text-primary-foreground' : 'text-muted-foreground'}`
              }>

              Women
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategoryChips
        categories={genderCategories}
        selected={selectedCategory}
        onSelect={(id) => setSelectedCategory(id === selectedCategory ? null : id)} />


      {/* Featured Section */}
      <div className="pt-4">
        <h2 className="font-heading font-semibold text-base text-foreground px-5 mb-3">
          Best Salons in Your City
        </h2>
        {isLoading ? <SkeletonCarousel /> : <FeaturedCarousel salons={featuredSalons} />}
      </div>

      {/* Nearby Salons */}
      <div className="pt-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-heading font-semibold text-base text-foreground">Nearby Salons</h2>
          <button className="text-xs font-body font-medium text-primary">View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
          {isLoading ?
          <><SkeletonCard /><SkeletonCard /></> :

          nearbySalons.map((salon) => <NearbySalonCard key={salon.id} salon={salon} />)
          }
        </div>
      </div>

      {/* Suggested For You */}
      <div className="pt-2 pb-2">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-heading font-semibold text-base text-foreground">Suggested for You</h2>
        </div>
        <div className="px-5 space-y-3">
          {isLoading ?
          <div className="h-24 skeleton-shimmer rounded-2xl" /> :

          [...featuredSalons, ...nearbySalons].slice(0, 3).map((salon) =>
          <div
            key={salon.id}
            onClick={() => navigate(`/salon/${salon.id}`)}
            className="flex items-center gap-3 bg-card rounded-2xl p-3 card-shadow border border-border cursor-pointer active:scale-[0.98] transition-transform">

                <img src={salon.image} alt={salon.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-semibold text-sm text-foreground truncate">{salon.name}</h4>
                  <p className="text-xs font-body text-muted-foreground">{salon.address} · {salon.distance}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={12} className="text-accent fill-accent" />
                    <span className="text-xs text-foreground font-medium">{salon.rating}</span>
                    <span className="text-[11px] text-muted-foreground">· From ₹{salon.startingPrice}</span>
                  </div>
                </div>
                <button
              onClick={(e) => {e.stopPropagation();navigate(`/salon/${salon.id}`);}}
              className="text-xs font-heading font-semibold text-primary-foreground bg-primary px-3 py-1.5 rounded-xl active:scale-95 transition-transform flex-shrink-0">

                  Book
                </button>
              </div>
          )
          }
        </div>
      </div>

      {/* Book Again */}
      {completedBookings.length > 0 &&
      <div className="pt-4 pb-2">
          <div className="flex items-center gap-2 px-5 mb-3">
            <RotateCcw size={16} className="text-primary" />
            <h2 className="font-heading font-semibold text-base text-foreground">Book Again</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
            {completedBookings.map((booking) =>
          <div key={booking.id} className="flex-shrink-0 w-60 bg-card rounded-2xl p-3 card-shadow border border-border">
                <div className="flex items-center gap-3">
                  <img src={booking.salonImage} alt={booking.salonName} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-foreground truncate">{booking.salonName}</h4>
                    <p className="text-[11px] font-body text-muted-foreground truncate">{booking.services.join(', ')}</p>
                    <p className="text-[10px] font-body text-muted-foreground mt-0.5">{booking.date}</p>
                  </div>
                </div>
                <button className="w-full mt-3 text-xs font-heading font-semibold text-primary bg-primary/10 py-2 rounded-xl active:scale-95 transition-transform">
                  Rebook
                </button>
              </div>
          )}
          </div>
        </div>
      }

      {/* Explore on Map */}
      <div className="px-5 pb-4">
        <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-heading font-semibold text-sm py-3.5 rounded-2xl active:scale-[0.98] transition-transform">
          <Map size={18} />
          Explore Salons on Map
        </button>
      </div>
    </div>);

};

export default HomePage;