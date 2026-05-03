import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface NTLData {
  lat: number;
  lon: number;
  cluster_id: number;
  ntl_mean: number;
  pixel_count: number;
  google_maps: string;
}

const NTLMap = ({ points }: { points: NTLData[] }) => {
  const center: [number, number] = [11.6, 104.2];
  
  const [displayPoints, setDisplayPoints] = useState<NTLData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const loadPoints = () => {
    if (loading) return;
    setLoading(true);
    setHasStarted(true);
    setDisplayPoints([]); 

    points.forEach((point, index) => {
      setTimeout(() => {
        setDisplayPoints((prev) => [...prev, point]);
        if (index === points.length - 1) setLoading(false);
      }, index * 80);
    });
  };

  return (
    <>
      {/* header & counter */}
      <div style={{
        position: 'absolute', top: '20px', left: '20px', zIndex: 1000,
        display: 'flex', flexDirection: 'column', gap: '10px'
      }}>
        <button 
          onClick={loadPoints} 
          disabled={loading}
          style={{
            padding: '12px 24px', cursor: 'pointer', borderRadius: '8px',
            backgroundColor: '#fbbf24', border: 'none', fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)', transition: '0.2s'
          }}
        >
          {loading ? 'Analyzing Satellite Data...' : 'Detect Unelectrified Zones'}
        </button>

        {hasStarted && (
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)', color: '#fbbf24',
            padding: '10px 15px', borderRadius: '8px', borderLeft: '4px solid #fbbf24',
            backdropFilter: 'blur(4px)', fontFamily: 'sans-serif', fontSize: '14px'
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {displayPoints.length}
            </span> zones detected in Kampong Speu
          </div>
        )}
      </div>

      <div className="map-wrapper" style={{ 
        height: '100vh', width: '100%', overflow: 'hidden' 
      }}>
        <MapContainer 
          center={center} 
          zoom={10} 
          zoomControl={false}
          style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
        >
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          <ZoomControl position="bottomright" />

          {displayPoints.map((point, index) => (
            <CircleMarker
              key={`${point.cluster_id}-${index}`}
              center={[point.lat, point.lon]}
              radius={Math.max(point.ntl_mean * 60, 6)} 
              className="pop-marker"
              pathOptions={{
                fillColor: '#fbbf24',
                color: '#fff',
                weight: 1,
                opacity: 0.9,
                fillOpacity: 0.7,
              }}
            >
              <Popup className="custom-popup">
                <div style={{ fontFamily: 'sans-serif', padding: '5px' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>Zone {point.cluster_id}</h4>
                  <p style={{ margin: '0', fontSize: '12px' }}>
                    Intensity: {point.ntl_mean.toFixed(4)}
                  </p>
                  <a href={point.google_maps} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontSize: '12px' }}>
                    Google Maps
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default NTLMap;