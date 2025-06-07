export class MarkerService {
  /**
   * Creates Google Maps markers for a list of experiences
   * @param {Array} experiences - List of experience entities
   * @param {google.maps.Map} map - Google Maps instance
   * @returns {Array} - List of created markers
   */
  static createMarkersForExperiences(experiences, map) {
    if (!experiences || !experiences.length || !map || !window.google) {
      return [];
    }

    return experiences.map(experience => {
      const marker = new window.google.maps.Marker({
        position: { 
          lat: experience.latitude || this.getRandomLatitude(), 
          lng: experience.longitude || this.getRandomLongitude()
        },
        map: map,
        title: experience.title,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new window.google.maps.Size(30, 30)
        }
      });

      // Create info window content
      const contentString = `
        <div class="marker-info-window">
          <h3>${experience.title}</h3>
          <p>s/${experience.price} · ${experience.duration}h</p>
          <p>${experience.location}</p>
        </div>
      `;
      
      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString
      });

      // Add event listener
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      return { marker, infoWindow };
    });
  }

  /**
   * Get a random latitude for Peru (for demo purposes)
   * @returns {number} - Random latitude
   */
  static getRandomLatitude() {
    // Approximate latitude range for Peru: -18 to -0
    return (Math.random() * (0 - -18) + -18).toFixed(6) * 1;
  }

  /**
   * Get a random longitude for Peru (for demo purposes)
   * @returns {number} - Random longitude
   */
  static getRandomLongitude() {
    // Approximate longitude range for Peru: -82 to -68
    return (Math.random() * (-68 - -82) + -82).toFixed(6) * 1;
  }
  
  /**
   * Load the Google Maps API script
   * @param {string} apiKey - Google Maps API key
   * @returns {Promise} - Promise that resolves when API is loaded
   */
  static loadGoogleMapsApi(apiKey = '') {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        resolve(window.google.maps);
      };
      
      script.onerror = () => {
        reject(new Error('Google Maps could not be loaded'));
      };
      
      document.head.appendChild(script);
    });
  }
}
