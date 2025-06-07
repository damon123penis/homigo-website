import React, { useState, useCallback, useMemo } from 'react';
import {
  Lightbulb,
  Thermometer,
  Shield,
  Wifi,
  Speaker,
  Camera,
  Zap,
  CheckCircle,
  Monitor,
  Wind,
  Droplets,
  BedDouble,
  CookingPot,
} from 'lucide-react';

// --- DATA & CONFIGURATION (outside component for performance) ---

const ICONS = { Lightbulb, Thermometer, Shield, Wifi, Speaker, Camera, Zap, CheckCircle, Monitor, Wind, Droplets };

const COLORS = {
  emerald: "#10b981",
  blue: "#059669",
  gray: "#374151",
  yellow: "#f59e0b",
  red: "#ef4444",
};

// Room Device Configuration
const ROOM_DEVICES = {
  wohnzimmer: {
    name: "Wohnzimmer",
    icon: BedDouble,
    devices: [
      { id: "hue_lights", name: "Intelligente Beleuchtung", iconName: "Lightbulb", benefit: "Dimmbares, farbiges Licht per App", color: COLORS.yellow },
      { id: "smart_tv", name: "Entertainment-Steuerung", iconName: "Speaker", benefit: "Sprachsteuerung für TV & Musik", color: COLORS.gray },
      { id: "temperature", name: "Klimasteuerung", iconName: "Thermometer", benefit: "Automatische Temperaturregelung", color: "#2563eb" },
    ],
  },
  schlafzimmer: {
    name: "Schlafzimmer",
    icon: BedDouble,
    devices: [
      { id: "sleep_lights", name: "Sanftes Nachtlicht", iconName: "Lightbulb", benefit: "Automatisches Ein-/Ausschalten", color: COLORS.yellow },
      { id: "smart_blinds", name: "Automatische Rollläden", iconName: "Monitor", benefit: "Wecker durch Tageslicht", color: "#64748b" },
      { id: "air_quality", name: "Luftqualitätsüberwachung", iconName: "Wind", benefit: "Gesunder Schlaf durch optimale Luft", color: "#0ea5e9" },
    ],
  },
  kueche: {
    name: "Küche",
    icon: CookingPot,
    devices: [
      { id: "smart_socket", name: "Intelligente Steckdosen", iconName: "Zap", benefit: "Geräte per App steuern", color: COLORS.yellow },
      { id: "water_sensor", name: "Wassersensor", iconName: "Droplets", benefit: "Schutz vor Wasserschäden", color: "#3b82f6" },
      { id: "kitchen_lights", name: "Arbeitsplatzbeleuchtung", iconName: "Lightbulb", benefit: "Perfektes Licht zum Kochen", color: COLORS.yellow },
    ],
  },
  bad: {
    name: "Badezimmer",
    icon: null,
    devices: [
      { id: "motion_light", name: "Bewegungsmelder-Licht", iconName: "Lightbulb", benefit: "Automatisches Nachtlicht", color: COLORS.yellow },
      { id: "humidity", name: "Feuchtigkeitssensor", iconName: "Droplets", benefit: "Automatische Lüftungssteuerung", color: "#0891b2" },
    ],
  },
  eingang: {
    name: "Eingangsbereich",
    icon: null,
    devices: [
      { id: "smart_lock", name: "Intelligentes Türschloss", iconName: "Shield", benefit: "Schlüssellos per App öffnen", color: COLORS.gray },
      { id: "doorbell", name: "Video-Türklingel", iconName: "Camera", benefit: "Sehen, wer vor der Tür steht", color: COLORS.red },
    ],
  },
};

const HOUSE_LAYOUT = {
  wohnzimmer: { points: "60,490 290,490 340,440 110,440", furniture: [{ x: 180, y: 470, emoji: '🛋️' }, { x: 230, y: 450, emoji: '📺' }], labelPos: { x: 175, y: 420 }, color: COLORS.emerald },
  kueche: { points: "410,490 590,490 640,440 460,440", furniture: [{ x: 480, y: 470, emoji: '🍳' }, { x: 560, y: 460, emoji: '🧊' }], labelPos: { x: 500, y: 420 }, color: COLORS.blue },
  eingang: { points: "350,490 410,490 460,440 400,440", furniture: [{ x: 375, y: 485, emoji: '🚪' }], labelPos: { x: 380, y: 425 }, color: COLORS.yellow },
  schlafzimmer: { points: "160,290 340,290 390,240 210,240", furniture: [{ x: 275, y: 270, emoji: '🛏️' }], labelPos: { x: 275, y: 220 }, color: "#7c3aed" },
  bad: { points: "410,290 490,290 540,240 460,240", furniture: [{ x: 450, y: 270, emoji: '🛁' }], labelPos: { x: 450, y: 220 }, color: "#0891b2" },
};

// --- SUB-COMPONENTS ---

const Room = React.memo(({ id, layout, isSelected, onClick, installedDevicesInRoom }) => {
  const { points, furniture, labelPos, color } = layout;
  const roomInfo = ROOM_DEVICES[id];

  const lightDevice = installedDevicesInRoom.find(d => d.iconName === 'Lightbulb');

  return (
    <g onClick={onClick} className="cursor-pointer group">
      {/* Visual effect for installed lights */}
      {lightDevice && (
        <polygon 
          points={points} 
          fill={lightDevice.color}
          opacity="0.3"
          style={{ filter: 'blur(20px)', pointerEvents: 'none' }}
        />
      )}
      {/* Room Area */}
      <polygon
        points={points}
        fill={isSelected ? `${color}20` : '#f8fafc10'}
        stroke={isSelected ? color : '#e2e8f0'}
        strokeWidth="2"
        strokeDasharray={isSelected ? '0' : '5,5'}
        className="transition-all duration-300 group-hover:stroke-emerald-400"
      />
      {/* Furniture */}
      <g style={{ pointerEvents: 'none' }}>
        {furniture.map((item, idx) => (
          <text key={idx} x={item.x} y={item.y} textAnchor="middle" className="text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{item.emoji}</text>
        ))}
      </g>
      {/* Room Label */}
      <text x={labelPos.x} y={labelPos.y} textAnchor="middle" className={`text-lg font-bold transition-colors duration-300 ${isSelected ? 'fill-emerald-600' : 'fill-gray-700'}`}>
        {roomInfo.name}
      </text>
      
      {/* Installed Device Icons */}
      <g>
        {installedDevicesInRoom.map((device, idx) => {
          const IconCmp = ICONS[device.iconName];
          const posX = labelPos.x - 30 + (idx * 30);
          const posY = labelPos.y + 40;
          return (
            <g key={device.id} className="animate-pulse">
              <circle cx={posX} cy={posY} r="12" fill={device.color} stroke="white" strokeWidth="2" />
              <IconCmp x={posX - 8} y={posY - 8} className="w-4 h-4 text-white" />
            </g>
          )
        })}
      </g>
    </g>
  );
});

const HousePlan = React.memo(({ selectedRoom, onRoomClick, installedDevices }) => (
  <div className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 border-4 border-gray-200 rounded-2xl h-96 lg:h-[600px] shadow-2xl overflow-hidden">
    <svg viewBox="0 0 800 600" className="w-full h-full" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}>
      {/* House Base */}
      <polygon points="50,500 600,500 700,400 150,400" fill="#fef3c7" stroke="#d97706" strokeWidth="3"/>
      <polygon points="50,500 50,300 150,200 150,400" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3"/>
      <polygon points="600,500 600,300 700,200 700,400" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3"/>
      <polygon points="150,150 250,50 600,50 500,150" fill="#64748b" stroke="#334155" strokeWidth="4"/>

      {Object.entries(HOUSE_LAYOUT).map(([id, layout]) => (
        <Room
          key={id}
          id={id}
          layout={layout}
          isSelected={selectedRoom === id}
          onClick={() => onRoomClick(id)}
          installedDevicesInRoom={installedDevices.filter(d => d.roomId === id)}
        />
      ))}

      {/* Placeholder for installed devices in central area */}
      {installedDevices.length > 0 && (
        <g className="animate-pulse">
          <circle cx="375" cy="420" r="12" fill={COLORS.emerald}/>
          <text x="375" y="425" textAnchor="middle" className="text-sm fill-white font-bold">📡</text>
        </g>
      )}
    </svg>
  </div>
));

const DevicePanel = ({ roomConfig, installedDevices, onAddDevice, onRemoveDevice }) => {
  const isDeviceInstalled = (deviceId) => installedDevices.some(d => d.id === deviceId);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl border border-gray-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4">{roomConfig.name}</h3>
      <div className="space-y-4">
        {roomConfig.devices.map(device => {
          const IconCmp = ICONS[device.iconName];
          const isInstalled = isDeviceInstalled(device.id);
          return (
            <div key={device.id} className={`border-2 rounded-xl p-4 transition-all duration-300 ${isInstalled ? 'border-emerald-300 bg-emerald-50' : 'bg-white hover:border-emerald-200'}`}>
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg mr-3 ${isInstalled ? 'bg-emerald-200' : 'bg-gray-100'}`}>
                  <IconCmp className={`w-6 h-6 ${isInstalled ? 'text-emerald-700' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{device.name}</h4>
                  <p className="text-xs text-gray-600">{device.benefit}</p>
                </div>
              </div>
              <button
                onClick={() => isInstalled ? onRemoveDevice(device.id) : onAddDevice(device, roomConfig.name)}
                className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors duration-300 text-white ${isInstalled ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
                {isInstalled ? 'Entfernen' : 'Hinzufügen'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatusSummary = ({ installedDevices }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl border border-gray-200">
    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
      <CheckCircle className="w-6 h-6 mr-2 text-emerald-600" />
      Smart Home Status
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center p-3 bg-emerald-50 rounded-lg">
        <div className="text-2xl font-bold text-emerald-600">{installedDevices.length}</div>
        <div className="text-xs text-emerald-700">Aktive Geräte</div>
      </div>
      <div className="text-center p-3 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">{new Set(installedDevices.map(d => d.room)).size}</div>
        <div className="text-xs text-blue-700">Vernetzte Räume</div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const SmartHomeSimulator = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [installedDevices, setInstalledDevices] = useState([]);

  const handleRoomClick = useCallback((roomId) => {
    setSelectedRoom(prevRoom => (prevRoom === roomId ? null : roomId));
  }, []);

  const addDevice = useCallback((device, roomName) => {
    const roomId = Object.keys(ROOM_DEVICES).find(key => ROOM_DEVICES[key].name === roomName);
    const newDevice = { ...device, room: roomName, roomId };
    setInstalledDevices(prevDevices => [...prevDevices, newDevice]);
  }, []);

  const removeDevice = useCallback((deviceId) => {
    setInstalledDevices(prevDevices => prevDevices.filter(d => d.id !== deviceId));
  }, []);

  const selectedRoomConfig = useMemo(() => selectedRoom ? ROOM_DEVICES[selectedRoom] : null, [selectedRoom]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
          🏠 Smart Home Experience Center
        </h2>
        <p className="text-lg text-gray-600">
          Entdecke die Zukunft des Wohnens - interaktiv und optimiert.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HousePlan 
            selectedRoom={selectedRoom} 
            onRoomClick={handleRoomClick} 
            installedDevices={installedDevices} 
          />
        </div>

        <div className="space-y-6">
          <StatusSummary installedDevices={installedDevices} />

          {selectedRoomConfig && (
            <DevicePanel
              roomConfig={selectedRoomConfig}
              installedDevices={installedDevices}
              onAddDevice={addDevice}
              onRemoveDevice={removeDevice}
            />
          )}

          {!selectedRoom && (
            <div className="text-center mt-8 p-6 bg-blue-50 rounded-2xl">
              <p className="text-gray-600 font-medium">Klicke auf einen Raum, um Geräte hinzuzufügen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartHomeSimulator;