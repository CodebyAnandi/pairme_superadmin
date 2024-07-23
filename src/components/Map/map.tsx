import React from 'react';
import Modal from 'react-responsive-modal';
import { GoogleMap, LoadScript, Marker } from 'google-map-react';

const Map = ({ isOpen, onClose, center }) => {
  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  return (
    <Modal open={isOpen} onClose={onClose} center>
      <h2>Location Map</h2>
      <div style={{ padding: '20px' }}>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={center}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </Modal>
  );
};

export default Map;
