import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ 
  id, image, category, price, date, location, title, description, 
  attendees, extraAttendeesCount, isSpecial = false 
}) {
  if (isSpecial) {
    return (
      <div className="md:col-span-2 group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row hover:translate-y-[-4px] transition-all duration-300 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="w-full md:w-2/5 relative">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={image} alt={title} />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-bold text-[10px] uppercase rounded-full">
              {category}
            </span>
            <span className="text-tertiary font-bold font-headline">{price}</span>
          </div>
          <h3 className="text-2xl font-bold font-headline mb-4 text-on-surface">{title}</h3>
          <p className="text-on-surface-variant font-body mb-8 leading-relaxed">{description}</p>
          <div className="mt-auto grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl">
              <span className="block text-xs font-bold text-outline uppercase mb-1">Date</span>
              <span className="font-bold text-sm">{date}</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl">
              <span className="block text-xs font-bold text-outline uppercase mb-1">Venue</span>
              <span className="font-bold text-sm">{location}</span>
            </div>
          </div>
          <Link to={`/events/${id}`} className="mt-8 text-center signature-gradient text-white py-3 rounded-full font-bold font-headline active:scale-95 transition-all w-full block premium-shadow text-shadow">
            Register for VIP Access
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
      <div className="relative aspect-video overflow-hidden shrink-0">
        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={image} alt={title} />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-primary font-bold text-[10px] uppercase rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className={`px-3 py-1 text-white font-bold text-xs rounded-full shadow-lg ${price === 'Free' ? 'bg-tertiary' : 'bg-primary'}`}>
            {price}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-outline mb-3 font-label text-xs">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span className="material-symbols-outlined text-sm">{location.toLowerCase() === 'online' ? 'videocam' : 'location_on'}</span>
          <span>{location}</span>
        </div>
        <h3 className="text-xl font-bold font-headline mb-3 text-on-surface group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
        <p className="text-sm text-on-surface-variant font-body mb-6 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container-low">
          <div className="flex -space-x-2">
            {attendees.map((att, i) => (
              <img key={i} alt="Attendee" className="w-8 h-8 rounded-full border-2 border-white object-cover" src={att} />
            ))}
            {extraAttendeesCount > 0 && (
              <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                +{extraAttendeesCount}
              </div>
            )}
          </div>
          <Link to={`/events/${id}`} className="text-primary font-bold font-headline text-sm flex items-center gap-1 group/btn hover:text-primary-container">
            View Details
            <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
