export function loadGoogleMapsScript(callback) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC6TEH54bBahgu975iI75pdzdBfOU_a2UQ&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
  }