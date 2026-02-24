import { useState } from 'react';
import { ArrowLeft, Share2, Star, MapPin, Clock, Plus, Minus, Navigation, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import ReviewsSection from '@/components/ReviewsSection';
import { useNavigate, useParams } from 'react-router-dom';
import { featuredSalons, nearbySalons, services, artists, reviews } from '@/data/mockData';

const SalonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const salon = [...featuredSalons, ...nearbySalons].find((s) => s.id === id) || featuredSalons[0];

  const [activeTab, setActiveTab] = useState<'services' | 'about' | 'reviews' | 'gallery'>('services');
  const [serviceTab, setServiceTab] = useState<'men' | 'women' | 'packages'>('men');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredServices = services.filter((s) => s.category === serviceTab);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [sId, qty]) => {
    const service = services.find((s) => s.id === sId);
    return total + (service?.price || 0) * qty;
  }, 0);

  const addToCart = (serviceId: string) => {
    setCart((c) => ({ ...c, [serviceId]: (c[serviceId] || 0) + 1 }));
  };

  const removeFromCart = (serviceId: string) => {
    setCart((c) => {
      const n = { ...c };
      if (n[serviceId] > 1) n[serviceId]--;
      else delete n[serviceId];
      return n;
    });
  };

  const galleryImages = [
    salon.image,
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521590832167-7228fcaeb733?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&h=600&fit=crop',
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-[280px]">
        <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 pt-[env(safe-area-inset-top)] px-4 pt-4 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center border border-border/30 min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center border border-border/30 min-h-[44px] min-w-[44px]"
          >
            <Heart size={16} className={isFavorite ? 'text-destructive fill-destructive' : 'text-foreground'} />
          </button>
        </div>
        <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-border/30">
          <Star size={13} className="text-accent fill-accent" />
          <span className="text-[13px] font-heading font-semibold text-foreground">{salon.rating}</span>
          <span className="text-[11px] text-muted-foreground">({salon.reviewCount})</span>
        </div>
      </div>

      {/* Salon Info */}
      <div className="px-5 pt-5 pb-3 animate-fade-in-up" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
        <h1 className="font-heading font-bold text-[20px] text-foreground leading-tight">{salon.name}</h1>
        <div className="flex items-center gap-2 mt-2.5">
          <MapPin size={14} className="text-muted-foreground flex-shrink-0" />
          <span className="text-[13px] font-body text-muted-foreground">{salon.address}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <Clock size={14} className="text-muted-foreground flex-shrink-0" />
          <span className={`text-[13px] font-body font-medium ${salon.isOpen ? 'text-success' : 'text-destructive'}`}>
            {salon.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {salon.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-heading font-medium text-primary bg-primary/8 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-primary/12">
              {tag === 'Verified' && <ShieldCheck size={11} />}
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5 pt-4 border-t border-border">
          <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-[13px] py-3.5 rounded-xl active:scale-[0.97] transition-transform min-h-[48px]">
            <Navigation size={15} />
            Directions
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-card border border-border text-foreground font-heading font-semibold text-[13px] py-3.5 rounded-xl active:scale-[0.97] transition-transform min-h-[48px]">
            <Share2 size={15} />
            Share
          </button>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="flex gap-1 px-5 py-2.5">
        {(['services', 'about', 'reviews', 'gallery'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-[12px] font-heading font-semibold capitalize rounded-xl transition-all duration-200 min-h-[40px] ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="animate-fade-in-up" style={{ animationDuration: '250ms' }}>
          {/* Stylists */}
          <div className="px-5 pt-4">
            <h3 className="font-heading font-semibold text-[14px] text-foreground mb-3">Choose Stylist</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 items-end">
              <button
                onClick={() => setSelectedArtist(null)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div className={`rounded-xl bg-secondary flex items-center justify-center text-[12px] font-heading font-semibold text-foreground transition-all duration-300 ease-out ${
                  !selectedArtist ? 'w-[56px] h-[56px] ring-2 ring-primary ring-offset-2 ring-offset-background' : 'w-[48px] h-[48px] border border-border'
                }`}>
                  All
                </div>
                <span className={`text-[11px] font-heading transition-colors ${!selectedArtist ? 'text-primary font-medium' : 'text-muted-foreground'}`}>All</span>
              </button>
              {artists.map((artist) => {
                const isSelected = selectedArtist === artist.id;
                return (
                  <button
                    key={artist.id}
                    onClick={() => setSelectedArtist(isSelected ? null : artist.id)}
                    className="flex flex-col items-center gap-1.5 flex-shrink-0"
                  >
                    <div className={`rounded-xl overflow-hidden transition-all duration-300 ease-out ${
                      isSelected ? 'w-[56px] h-[56px] ring-2 ring-primary ring-offset-2 ring-offset-background' : 'w-[48px] h-[48px] border border-border'
                    }`}>
                      <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-[11px] font-heading transition-colors whitespace-nowrap ${isSelected ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{artist.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service list */}
          <div className="mx-4 bg-card rounded-2xl border border-border card-shadow">
            <div className="flex gap-1.5 px-3 pt-3 pb-2">
              {(['men', 'women', 'packages'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setServiceTab(tab)}
                  className={`px-4 py-2 rounded-xl text-[12px] font-heading font-semibold capitalize transition-all min-h-[36px] ${
                    serviceTab === tab ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="px-2.5 space-y-2 pt-1 pb-3">
              {filteredServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between bg-background rounded-2xl p-4">
                  <div className="flex-1 pr-3">
                    <h4 className="font-heading font-medium text-[14px] text-foreground leading-tight">{service.name}</h4>
                    <span className="text-[11px] font-body text-muted-foreground bg-secondary px-2 py-0.5 rounded-md inline-block mt-1.5">
                      {service.duration}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-heading font-semibold text-[16px] text-foreground">₹{service.price}</span>
                      {service.originalPrice && (
                        <span className="text-[12px] text-muted-foreground line-through">₹{service.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  {cart[service.id] ? (
                    <div className="flex items-center gap-1.5 bg-primary/8 rounded-xl px-1 border border-primary/15">
                      <button onClick={() => removeFromCart(service.id)} className="p-2.5 text-primary min-h-[44px] min-w-[36px] flex items-center justify-center">
                        <Minus size={14} />
                      </button>
                      <span className="text-[14px] font-heading font-semibold text-primary w-5 text-center">{cart[service.id]}</span>
                      <button onClick={() => addToCart(service.id)} className="p-2.5 text-primary min-h-[44px] min-w-[36px] flex items-center justify-center">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(service.id)}
                      className="bg-primary text-primary-foreground text-[12px] font-heading font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-transform min-h-[44px]"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <ReviewsSection
          artists={artists}
          reviews={reviews}
          selectedArtist={selectedArtist}
          onSelectArtist={setSelectedArtist}
        />
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="px-5 pt-4 space-y-3 animate-fade-in-up" style={{ animationDuration: '250ms' }}>
          <div className="bg-card rounded-2xl p-5 card-shadow border border-border">
            <h3 className="font-heading font-semibold text-[14px] text-foreground mb-2.5">About</h3>
            <p className="text-[14px] font-body text-muted-foreground leading-relaxed">
              A premium salon experience with expert stylists, modern equipment, and a relaxing ambiance.
              We specialize in haircuts, coloring, skin care, and bridal services. Our team of certified
              professionals ensures you leave looking and feeling your best.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 card-shadow border border-border">
            <h3 className="font-heading font-semibold text-[14px] text-foreground mb-4">Hours & Location</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 border border-primary/12">
                  <Clock size={17} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-heading font-medium text-foreground">Mon – Sat</p>
                  <p className="text-[12px] font-body text-muted-foreground mt-0.5">9:00 AM – 9:00 PM</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 border border-primary/12">
                  <MapPin size={17} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-heading font-medium text-foreground">{salon.address}</p>
                  <p className="text-[12px] font-body text-muted-foreground mt-0.5">{salon.distance} away</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 card-shadow border border-border">
            <h3 className="font-heading font-semibold text-[14px] text-foreground mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {[...salon.tags, 'WiFi', 'Parking', 'Card Payment'].map(tag => (
                <span key={tag} className="text-[12px] font-heading font-medium text-foreground bg-secondary px-3.5 py-1.5 rounded-xl border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="px-5 pt-4 animate-fade-in-up" style={{ animationDuration: '250ms' }}>
          <div className="space-y-2.5">
            <div className="aspect-video rounded-2xl overflow-hidden card-shadow border border-border">
              <img src={galleryImages[0]} alt="Gallery hero" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {galleryImages.slice(1).map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden card-shadow border border-border">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar */}
      {cartCount > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-5 py-3.5 z-50"
          style={{ boxShadow: 'var(--shadow-bottom-bar)', animation: 'slide-up 0.3s ease-out' }}
        >
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <span className="text-[12px] font-body text-muted-foreground">{cartCount} service{cartCount > 1 ? 's' : ''}</span>
              <p className="font-heading font-bold text-[18px] text-foreground leading-tight">₹{cartTotal}</p>
            </div>
            <button
              onClick={() => navigate(`/booking/${id}`, { state: { cart } })}
              className="bg-primary text-primary-foreground font-heading font-semibold text-[14px] px-7 py-3.5 rounded-2xl active:scale-95 transition-transform min-h-[48px]"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonDetail;
