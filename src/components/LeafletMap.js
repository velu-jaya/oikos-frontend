'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import styles from './MapView.module.css';

// Component to update map center when selected property changes
function MapUpdater({ selectedProperty, properties }) {
    const map = useMap();

    useEffect(() => {
        if (selectedProperty) {
            // Use fake coordinates if property doesn't have them
            // In a real app, property would have lat/lng
            // Here we generate deterministic fake coords around Austin TX for demo
            const lat = selectedProperty.lat || 30.2672 + (selectedProperty.id * 0.01);
            const lng = selectedProperty.lng || -97.7431 + (selectedProperty.id * 0.01);

            map.setView([lat, lng], 13);
        }
    }, [selectedProperty, map]);

    return null;
}

export default function LeafletMap({ properties, selectedProperty, onPropertySelect }) {
    // Center on Austin, TX by default
    const defaultCenter = [30.2672, -97.7431];

    return (
        <MapContainer
            center={defaultCenter}
            zoom={11}
            scrollWheelZoom={true}
            className={styles.leafletMapContainer}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapUpdater selectedProperty={selectedProperty} properties={properties} />

            {properties.map((property) => {
                // Generate consistent fake coordinates if missing
                const lat = property.lat || (30.2672 + ((property.id % 20) * 0.005 * (property.id % 2 === 0 ? 1 : -1)));
                const lng = property.lng || (-97.7431 + ((property.id % 20) * 0.005 * (property.id % 3 === 0 ? 1 : -1)));

                return (
                    <Marker
                        key={property.id}
                        position={[lat, lng]}
                        eventHandlers={{
                            click: () => onPropertySelect(property),
                        }}
                    >
                        <Popup>
                            <div className={styles.popupContent}>
                                <div className={styles.popupImageContainer}>
                                    <img src={property.image} alt={property.title} className={styles.popupImage} />
                                </div>
                                <div className={styles.popupInfo}>
                                    <h3 className={styles.popupTitle}>{property.title}</h3>
                                    <p className={styles.popupPrice}>{property.price}</p>
                                    <p className={styles.popupDetails}>{property.beds}bd, {property.baths}ba</p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
