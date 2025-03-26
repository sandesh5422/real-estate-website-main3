import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';

export default function Listing() {
  const params = useParams();
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [landlordEmail, setLandlordEmail] = useState(null);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listing]);
  useEffect(() => {
    if (listing && listing.userRef) {
      const fetchLandlordEmail = async () => {
        try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          const data = await res.json();
          if (data.email) {
            setLandlordEmail(data.email);
          } else {
            setLandlordEmail('Email not found'); // Set default message if email not found
          }
        } catch (error) {
          console.log(error);
          setLandlordEmail('Error fetching email'); // Set default message if error occurs
        }
      };
      fetchLandlordEmail();
    }
  }, [listing]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map(url => <SwiperSlide key={url}>
                <div className="h-[550px]" style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>

                </div>
            </SwiperSlide>)}
          </Swiper>

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
          <p className='text-2xl font-semibold'>
              {listing.name} - &#8377;{' '}
              {listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-2 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  &#8377;{listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
            <span className="font-semibold text-black">Description - {' '}</span>
            {listing.description}
          </p>
          <ul className="font-semibold text-sm text-green-900 flex flex-wrap items-center gap-4 sm:gap-6">
            <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm text-green-900">
              <FaBed className="text-lg"/>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm text-green-900">
              <FaBath className="text-lg"/>
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bedrooms} Bath`}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm text-green-900">
              <FaParking className="text-lg"/>
              {listing.parking ? 'Parking spot' : 'No parking'}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap font-semibold text-sm text-green-900">
              <FaChair className="text-lg"/>
              {listing.furnished ? 'Furnished' : "Unfurnished"}
            </li>
          </ul>
          {listing && !loading && !error && (
        <div>
          <p className="text-slate-800">
            <span className="font-semibold text-black">Contact landlord - {' '}</span>
          {landlordEmail} 
          </p>
        </div>
      )}
          
          </div>
        </div>
      )}
    </main>
  );
}
