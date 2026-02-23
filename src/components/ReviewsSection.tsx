import { useState, useEffect } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import type { Artist, Review } from '@/types/salon';

interface ReviewsSectionProps {
  artists: Artist[];
  reviews: Review[];
  selectedArtist: string | null;
  onSelectArtist: (id: string | null) => void;
}

const ReviewsSection = ({ artists, reviews, selectedArtist, onSelectArtist }: ReviewsSectionProps) => {
  const [isJiggling, setIsJiggling] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (selectedArtist && r.artistId !== selectedArtist) return false;
    return true;
  });

  const currentArtist = artists.find((a) => a.id === selectedArtist);
  const avgRating = filteredReviews.length > 0
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0.0';

  const reviewPhotos = [
    'https://images.unsplash.com/photo-1585747860019-8e8e13c2e4f2?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=300&h=300&fit=crop',
  ];

  useEffect(() => {
    setIsJiggling(true);
    const timer = setTimeout(() => setIsJiggling(false), 700);
    return () => clearTimeout(timer);
  }, [selectedArtist]);

  return (
    <div className="animate-fade-in-up bg-background" style={{ animationDuration: '300ms' }}>
      {/* Our Stylists Header */}
      <div className="px-5 pt-5 pb-1">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-xl text-foreground italic">Our Stylists</h2>
          <button className="text-[11px] font-sans font-semibold uppercase tracking-widest text-muted-foreground">
            View All
          </button>
        </div>

        {/* Artist Selector */}
        <div className="flex overflow-x-auto scrollbar-hide pb-3 items-end gap-4">
          <button
            onClick={() => onSelectArtist(null)}
            className="flex flex-col items-center flex-shrink-0 gap-1.5"
          >
            <div
              className={`rounded-xl flex items-center justify-center font-sans font-bold text-foreground transition-all duration-300 ease-out ${
                !selectedArtist
                  ? 'w-16 h-16 sm:w-20 sm:h-20 text-sm ring-2 ring-accent/50 shadow-md bg-secondary'
                  : 'w-14 h-14 sm:w-16 sm:h-16 text-xs bg-card border border-border'
              }`}
              style={!selectedArtist && isJiggling ? { animation: 'jelly 0.55s ease', transformOrigin: 'bottom center' } : undefined}
            >
              ALL
            </div>
            <span className={`text-[11px] font-body ${!selectedArtist ? 'text-primary font-medium' : 'text-muted-foreground'}`}>All</span>
            {!selectedArtist && <div className="w-1.5 h-1.5 rounded-full bg-accent -mt-0.5" />}
          </button>

          {artists.map((artist) => {
            const isSelected = selectedArtist === artist.id;
            return (
              <button
                key={artist.id}
                onClick={() => onSelectArtist(isSelected ? null : artist.id)}
                className="flex flex-col items-center flex-shrink-0 gap-1.5"
              >
                <div
                  className={`rounded-xl overflow-hidden transition-all duration-300 ease-out ${
                    isSelected
                      ? 'w-16 h-16 sm:w-20 sm:h-20 ring-2 ring-accent/50 shadow-md'
                      : 'w-14 h-14 sm:w-16 sm:h-16 border border-border'
                  }`}
                  style={isSelected && isJiggling ? { animation: 'jelly 0.55s ease', transformOrigin: 'bottom center' } : undefined}
                >
                  <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <span className={`text-[11px] font-body whitespace-nowrap ${isSelected ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{artist.name}</span>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-accent -mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reviews Container */}
      <div
        className="mx-3 mb-4 bg-card rounded-2xl border border-border card-shadow"
        style={{
          animation: isJiggling ? 'jelly-container 0.5s ease' : 'none',
          transformOrigin: 'top center',
        }}
      >
        <div className="px-5 pt-5 pb-3">
          {currentArtist && (
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                <img src={currentArtist.avatar} alt={currentArtist.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-sans font-bold text-base block truncate text-foreground">
                  {currentArtist.name}
                </span>
                <p className="text-xs font-body text-muted-foreground mt-0.5">{currentArtist.specialty}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.round(Number(avgRating)) ? 'text-accent fill-accent' : 'text-border fill-border'}
                    />
                  ))}
                  <span className="text-sm font-sans font-semibold ml-1 text-accent">{avgRating}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-base text-foreground">
              {currentArtist ? 'Reviews' : 'All Reviews'}
            </h3>
            <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 bg-secondary border border-border">
              <Star size={13} className="text-accent fill-accent" />
              <span className="text-sm font-sans font-bold text-foreground">{avgRating}</span>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-2 px-2 pb-3">
          {filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className="rounded-2xl p-4 bg-background"
              style={{ animation: `fade-in-up 0.4s ease-out ${index * 80}ms both` }}
            >
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-secondary border border-border">
                    <span className="font-heading text-sm font-semibold text-foreground">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-semibold text-sm text-foreground">{review.userName}</span>
                      <CheckCircle2 size={13} className="text-accent" />
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < review.rating ? 'text-accent fill-accent' : 'text-border fill-border'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-muted-foreground whitespace-nowrap pt-1">
                  {review.date}
                </span>
              </div>

              <div className="mb-2.5">
                <span className="inline-block text-[10px] font-sans font-semibold text-foreground uppercase tracking-wider px-3 py-1 rounded-lg bg-secondary border border-border">
                  {review.service}
                </span>
              </div>

              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                "{review.text}"
              </p>

              {review.hasPhoto && (
                <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                  {reviewPhotos.map((photo, i) => (
                    <div key={i} className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                      <img src={photo} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-14">
              <p className="font-heading text-base text-muted-foreground">No reviews yet for this stylist</p>
              <p className="text-xs font-body mt-2 text-muted-foreground">Be the first to share your experience</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
