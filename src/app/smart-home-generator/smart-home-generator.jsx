import React, { useState, useEffect } from 'react';
import {
  Home, Sofa, Bed, Bath, ChefHat, DoorOpen,
  Lightbulb, Thermometer, Wifi, Speaker,
  Camera, Zap, Droplets, Wind, Eye, Lock,
  ArrowRight, Sparkles, Check, Activity, Sun
} from 'lucide-react';

// RoomCard-Komponente
const RoomCard = ({ room, isSelected, onClick, deviceCount, hasConnection, installedDevices }) => {
  const Icon = room.icon;
  const deviceIcons = installedDevices
    .filter(device => device.roomId === room.id)
    .map(device => device.icon);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`cursor-pointer rounded-2xl p-6 shadow-md border transition-all duration-300 h-48 w-full
        ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-300 bg-gradient-to-br ' + room.color + ' text-white' : 'border-slate-200 ' + room.bgColor}
        hover:shadow-lg hover:scale-105`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${isSelected ? 'bg-white bg-opacity-40' : 'bg-white bg-opacity-70'}`}>
            <Icon className="w-10 h-10 text-slate-700" aria-hidden="true" />
          </div>
          {hasConnection && <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" aria-label="Verbindung aktiv"></div>}
        </div>
        <div className={`font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-slate-800'}`}>{room.name}</div>
        {deviceIcons.length > 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {deviceIcons.map((DeviceIcon, index) => (
                <div key={index} className={`p-2 rounded-lg ${isSelected ? 'bg-white bg-opacity-20' : 'bg-white shadow-sm'}`}>
                  <DeviceIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-600'}`} aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        )}
        {deviceCount > 0 && (
          <div className={`text-sm font-semibold mt-2 text-center ${isSelected ? 'text-white' : 'text-emerald-600'}`}>$1</div>
        )}
      </div>
    </div>
  );
};

const DeviceCard = ({ device, roomColor, isInstalled, onAdd, onRemove }) => {
  const Icon = device.icon;
  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition-all duration-300 ${isInstalled ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100' : 'border-slate-200 bg-white hover:shadow-md'}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${roomColor} bg-opacity-10`}>
          <Icon className="w-5 h-5 text-slate-600" aria-hidden="true" />
        </div>
        <div className="font-semibold text-slate-800">{device.name}</div>
      </div>
      <div className="text-sm text-slate-600 mb-2">{device.description}</div>
      <div className="flex flex-wrap gap-1 mb-3">
        {device.features.map((f, i) => (
          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{f}</span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-slate-700">{device.price}</div>
        {!isInstalled ? (
          <button onClick={onAdd} className={`px-4 py-2 rounded-full text-white text-sm bg-gradient-to-r ${roomColor} shadow-md hover:shadow-lg transition-all transform hover:scale-105`} aria-label={`Gerät ${device.name} hinzufügen`}>
            Hinzufügen
          </button>
        ) : (
          <button onClick={onRemove} className="px-4 py-2 rounded-full text-sm border border-rose-500 text-rose-500 hover:bg-rose-50 transition-all" aria-label={`Gerät ${device.name} entfernen`}>
            Entfernen
          </button>
        )}
      </div>
    </div>
  );
};

const ModernSmartHomeConfigurator = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [installedDevices, setInstalledDevices] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeConnections, setActiveConnections] = useState([]);

  const rooms = {
  wohnzimmer: {
    id: 'wohnzimmer',
    name: 'Wohnzimmer',
    icon: Sofa,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    devices: [
      {
        id: 'hue_lights',
        name: 'Philips Hue System',
        icon: Lightbulb,
        price: '199€',
        description: 'Farbiges Ambiente-Licht für jede Stimmung',
        features: ['16 Mio. Farben', 'App-Steuerung', 'Zeitpläne']
      },
      {
        id: 'smart_speaker',
        name: 'Smart Speaker',
        icon: Speaker,
        price: '89€',
        description: 'Sprachassistent für Entertainment & Steuerung',
        features: ['Alexa/Google', 'Multiroom', 'Musikstreaming']
      },
      {
        id: 'thermostat',
        name: 'Smart Thermostat',
        icon: Thermometer,
        price: '129€',
        description: 'Intelligente Heizungssteuerung spart bis zu 30%',
        features: ['Lernfähig', 'Fernzugriff', 'Energiesparen']
      }
    ]
  },
  schlafzimmer: {
    id: 'schlafzimmer',
    name: 'Schlafzimmer',
    icon: Bed,
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    devices: [
      {
        id: 'sleep_light',
        name: 'Wake-Up Light',
        icon: Sun,
        price: '149€',
        description: 'Natürliches Aufwachen mit Sonnenaufgang',
        features: ['Schlaf-Tracking', 'Sonnenaufgang', 'Einschlafhilfe']
      },
      {
        id: 'air_sensor',
        name: 'Luftqualitätssensor',
        icon: Wind,
        price: '79€',
        description: 'Überwacht Temperatur, Luftfeuchtigkeit & CO2',
        features: ['Echtzeit-Daten', 'Gesundheit', 'Warnungen']
      }
    ]
  },
  kueche: {
    id: 'kueche',
    name: 'Küche',
    icon: ChefHat,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
    devices: [
      {
        id: 'smart_plug',
        name: 'Smart Steckdosen',
        icon: Zap,
        price: '39€',
        description: 'Kontrolle über alle Küchengeräte',
        features: ['Timer', 'Verbrauchsmessung', 'Fernsteuerung']
      },
      {
        id: 'water_sensor',
        name: 'Wassersensor',
        icon: Droplets,
        price: '49€',
        description: 'Frühwarnung bei Wasserschäden',
        features: ['24/7 Überwachung', 'Push-Benachrichtigung', 'Batterie 2 Jahre']
      }
    ]
  },
  bad: {
    id: 'bad',
    name: 'Badezimmer',
    icon: Bath,
    color: 'from-cyan-500 to-teal-600',
    bgColor: 'bg-cyan-50',
    devices: [
      {
        id: 'motion_sensor',
        name: 'Bewegungsmelder',
        icon: Eye,
        price: '59€',
        description: 'Automatisches Licht bei Bewegung',
        features: ['Nachtmodus', 'Batteriebetrieb', 'Einstellbar']
      }
    ]
  },
  eingang: {
    id: 'eingang',
    name: 'Eingang',
    icon: DoorOpen,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    devices: [
      {
        id: 'smart_lock',
        name: 'Smart Lock',
        icon: Lock,
        price: '249€',
        description: 'Schlüsselloser Zugang für Familie & Freunde',
        features: ['App-Zugang', 'Gastzugänge', 'Protokoll']
      },
      {
        id: 'doorbell',
        name: 'Video-Türklingel',
        icon: Camera,
        price: '179€',
        description: 'Sehen Sie, wer vor der Tür steht',
        features: ['HD-Video', 'Nachtsicht', 'Bewegungserkennung']
      }
    ]
  }
};

  useEffect(() => {
    if (installedDevices.length === 0) {
      setActiveConnections([]);
      return;
    }
    const timer = setInterval(() => {
      setActiveConnections(prev => {
        const nextIndex = prev.length > 0 
          ? (installedDevices.findIndex(d => d.id === prev[0]) + 1) % installedDevices.length
          : 0;
        return [installedDevices[nextIndex].id];
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [installedDevices]);

  const addDevice = (device, roomId) => {
    if (installedDevices.some(d => d.id === device.id)) return;
    const newDevice = { ...device, roomId };
    setInstalledDevices([...installedDevices, newDevice]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const removeDevice = (deviceId) => {
    setInstalledDevices(installedDevices.filter(d => d.id !== deviceId));
  };

  const getTotalPrice = () => {
    return installedDevices.reduce((sum, device) => sum + parseInt(device.price.replace('€', '')), 0);
  };

  const gradientClasses = {
  wohnzimmer: 'from-violet-500 to-purple-600',
  schlafzimmer: 'from-indigo-500 to-blue-600',
  kueche: 'from-emerald-500 to-green-600',
  bad: 'from-cyan-500 to-teal-600',
  eingang: 'from-amber-500 to-orange-600'
};

  const SelectedRoomIcon = selectedRoom ? rooms[selectedRoom].icon : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4">
            <Home className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Smart Home Konfigurator</h1>
          $1
          <p className="text-sm text-slate-400 mt-1 italic">Alle Preise sind Richtwerte und können im konkreten Konzept variieren.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Wählen Sie einen Raum
              {installedDevices.length > 0 && (
                <span className="ml-auto flex items-center gap-2 text-sm font-normal text-emerald-600">
                  <Activity className="w-4 h-4" />
                  System aktiv
                </span>
              )}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.values(rooms).map(room => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isSelected={selectedRoom === room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  deviceCount={installedDevices.filter(d => d.roomId === room.id).length}
                  hasConnection={activeConnections.some(id => installedDevices.find(d => d.id === id && d.roomId === room.id))}
                  installedDevices={installedDevices}
                />
              ))}
            </div>
          </div>

          {selectedRoom && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                {SelectedRoomIcon && <SelectedRoomIcon className="w-5 h-5" aria-hidden="true" />}
                {rooms[selectedRoom].name} – Verfügbare Geräte
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {rooms[selectedRoom].devices.map(device => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    roomColor={gradientClasses[selectedRoom]}
                    isInstalled={installedDevices.some(d => d.id === device.id)}
                    onAdd={() => addDevice(device, selectedRoom)}
                    onRemove={() => removeDevice(device.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Dashboard</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-violet-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-violet-600">{installedDevices.length}</div>
                <div className="text-sm text-violet-700">Geräte</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-emerald-600">{getTotalPrice()}€</div>
                <div className="text-sm text-emerald-700">Gesamt</div>
              </div>
            </div>

            {installedDevices.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-600 uppercase">Ihre Auswahl</h4>
                {installedDevices.map(device => {
                  const Icon = device.icon;
                  return (
                    <div key={`${device.id}-${device.roomId}`} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-600" aria-hidden="true" />
                        <div>
                          <div className="text-sm font-medium text-slate-800">{device.name}</div>
                          <div className="text-xs text-slate-500">{rooms[device.roomId].name}</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-700">{device.price}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {installedDevices.length > 0 && (
            <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:scale-105">
              Kostenlose Beratung
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 animate-slide-in">
          <Check className="w-5 h-5" />
          Gerät hinzugefügt!
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModernSmartHomeConfigurator;
