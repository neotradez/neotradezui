interface GoogleMapsEmbedProps {
  lat: number
  lng: number
  zoom?: number
  width?: string
  height?: string
  title?: string
  className?: string
}

export function GoogleMapsEmbed({
  lat,
  lng,
  zoom = 16,
  width = "100%",
  height = "100%",
  title = "Map location",
  className = "",
}: GoogleMapsEmbedProps) {
  // Create a Google Maps embed URL that doesn't require an API key
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343077!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzA1LjIiTiA3M8KwNTgnNTAuNCJX!5e0!3m2!1sen!2sus!4v1620841112403!5m2!1sen!2sus`

  return (
    <iframe
      src={googleMapsUrl}
      width={width}
      height={height}
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
      className={className}
    ></iframe>
  )
}
