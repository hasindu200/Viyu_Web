'use client'
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ShoppingCart, Heart, Eye } from 'lucide-react';

// Collection categories with placeholder images
const collections = [
  { id: 1, name: "Silk Sarees", description: "Luxurious silk sarees for special occasions", image: "./images/saree4.webp", alt: "Silk Saree collection" },
  { id: 2, name: "Cotton Sarees", description: "Comfortable and elegant everyday wear", image: "./images/saree2.jpg", alt: "Cotton Saree collection" },
  { id: 3, name: "Designer Sarees", description: "Exclusive designs for the modern woman", image:"./images/saree4.webp", alt: "Designer Saree collection" },
  { id: 4, name: "Bridal Sarees", description: "Stunning sarees for your special day", image: "./images/saree4.webp", alt: "Bridal Saree collection" },
];

// Best sellers with placeholder images
const bestSellers = [
  { id: 1, name: "Blue Silk Saree", price: 299.99, rating: 4.8, reviews: 42, image: "./images/saree4.webp", alt: "Blue Silk Saree" },
  { id: 2, name: "Red Cotton Handloom", price: 199.99, rating: 4.5, reviews: 38, image: "./images/saree4.webp", alt: "Red Cotton Handloom Saree" },
  { id: 3, name: "Green Designer Saree", price: 399.99, rating: 4.9, reviews: 56, image: "./images/saree4.webp", alt: "Green Designer Saree" },
  { id: 4, name: "Pink Bridal Saree", price: 599.99, rating: 5.0, reviews: 27, image: "./images/saree4.webp", alt: "Pink Bridal Saree" },
];

// New arrivals
const newArrivals = [
  { id: 5, name: "Peacock Blue Patola", price: 349.99, rating: 4.7, reviews: 18, image: "/api/placeholder/450/600", alt: "Peacock Blue Patola Saree" },
  { id: 6, name: "Yellow Banarasi", price: 279.99, rating: 4.6, reviews: 23, image: "/api/placeholder/450/600", alt: "Yellow Banarasi Saree" },
  { id: 7, name: "Lavender Organza", price: 259.99, rating: 4.4, reviews: 31, image: "/api/placeholder/450/600", alt: "Lavender Organza Saree" },
  { id: 8, name: "Maroon Kanjivaram", price: 499.99, rating: 4.9, reviews: 15, image: "/api/placeholder/450/600", alt: "Maroon Kanjivaram Saree" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [activeTab, setActiveTab] = useState('bestsellers');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);

  const openLightbox = (image, images, index) => {
    setSelectedImage(image);
    setLightboxImages(images);
    setLightboxIndex(index || 0);
    // Add class to prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    // Restore scrolling when lightbox is closed
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    let newIndex = lightboxIndex + direction;
    if (newIndex < 0) newIndex = lightboxImages.length - 1;
    if (newIndex >= lightboxImages.length) newIndex = 0;
    setLightboxIndex(newIndex);
    setSelectedImage(lightboxImages[newIndex]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    showNotification(`Added ${product.name} to cart`);
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    showNotification(`Added ${product.name} to wishlist`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, lightboxIndex, lightboxImages]);

  // Clean up any side effects on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-white">
      {/* Our Collections Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Collections</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Handpicked selections of the finest traditional and contemporary sarees from across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <div 
                key={collection.id}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                onClick={() => openLightbox(
                  { image: collection.image, alt: collection.name },
                  collections.map(c => ({ image: c.image, alt: c.name })),
                  collections.indexOf(collection)
                )}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.alt}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90 flex flex-col items-center justify-end p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                    <p className="text-white text-sm hidden group-hover:block transition-all duration-300">{collection.description}</p>
                    <button className="mt-4 py-2 px-4 bg-white text-purple-700 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Showcase Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Our Sarees</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Each piece tells a story of craftsmanship and heritage</p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12 border-b border-gray-200">
            <button 
              className={`py-3 px-6 font-medium text-lg border-b-2 ${activeTab === 'bestsellers' ? 'border-purple-700 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('bestsellers')}
            >
              Best Sellers
            </button>
            <button 
              className={`py-3 px-6 font-medium text-lg border-b-2 ${activeTab === 'newarrivals' ? 'border-purple-700 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('newarrivals')}
            >
              New Arrivals
            </button>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeTab === 'bestsellers' ? bestSellers : newArrivals).map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md group transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <div 
                    className="aspect-[3/4] overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(
                      { image: product.image, alt: product.name },
                      (activeTab === 'bestsellers' ? bestSellers : newArrivals).map(p => ({ image: p.image, alt: p.name })),
                      (activeTab === 'bestsellers' ? bestSellers : newArrivals).indexOf(product)
                    )}
                  >
                    <img 
                      src={product.image}
                      alt={product.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Quick action buttons overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition-colors duration-300"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(product);
                        }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors duration-300"
                        title="Add to wishlist"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(
                            { image: product.image, alt: product.name },
                            (activeTab === 'bestsellers' ? bestSellers : newArrivals).map(p => ({ image: p.image, alt: p.name })),
                            (activeTab === 'bestsellers' ? bestSellers : newArrivals).indexOf(product)
                          );
                        }}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
                        title="Quick view"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Sale tag if needed */}
                  {product.id % 3 === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                      SALE
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    {/* Star rating */}
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 hover:text-purple-700 transition-colors duration-300">{product.name}</h3>
                  <p className="mt-1 text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-purple-700 py-2 px-4 rounded-md text-white font-medium hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
              View All Sarees
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customer Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from our customers who love their sarees</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={`/api/placeholder/100/100`} 
                    alt={`Customer ${item}`} 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Customer Name</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The quality and craftsmanship of these sarees are exceptional. I received so many compliments when I wore my Kanjivaram to a wedding. The colors are vibrant and the fabric is luxurious."</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    
      
      {/* Lightbox Modal - Using Portal pattern for z-index management */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
          style={{ zIndex: 9999 }}
        >
          <div 
            className="relative max-w-4xl w-full max-h-screen p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImages[lightboxIndex].image}
              alt={lightboxImages[lightboxIndex].alt}
              className="w-full h-auto max-h-[80vh] rounded-lg shadow-2xl object-contain"
            />
            
            {/* Navigation buttons */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 transform -translate-y-1/2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(-1);
                  }}
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  className="absolute top-1/2 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 transform -translate-y-1/2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(1);
                  }}
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>
              </>
            )}
            
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
            
            {/* Image counter */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-full text-sm">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
            
            {/* Thumbnail navigation */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {lightboxImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(idx);
                      setSelectedImage(lightboxImages[idx]);
                    }}
                    className={`w-3 h-3 rounded-full ${idx === lightboxIndex ? 'bg-white' : 'bg-gray-400'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Notification - with fixed z-index */}
      {notification && (
        <div 
          className="fixed bottom-6 right-6 bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up"
          style={{ zIndex: 9998 }}
        >
          {notification}
        </div>
      )}
    </div>
  );
}