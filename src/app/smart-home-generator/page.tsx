import React, { useState } from "react";
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
} from "lucide-react";

const SmartHomeSimulator = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [installedDevices, setInstalledDevices] = useState([]);

  const rooms = {
    wohnzimmer: {
      name: "Wohnzimmer",
      devices: [
        {
          id: "hue_lights",
          name: "Intelligente Beleuchtung",
          icon: Lightbulb,
          benefit: "Dimmbares, farbiges Licht per App",
        },
        {
          id: "smart_tv",
          name: "Entertainment-Steuerung",
          icon: Speaker,
          benefit: "Sprachsteuerung für TV & Musik",
        },
        {
          id: "temperature",
          name: "Klimasteuerung",
          icon: Thermometer,
          benefit: "Automatische Temperaturregelung",
        },
      ],
    },
    schlafzimmer: {
      name: "Schlafzimmer",
      devices: [
        {
          id: "sleep_lights",
          name: "Sanftes Nachtlicht",
          icon: Lightbulb,
          benefit: "Automatisches Ein-/Ausschalten",
        },
        {
          id: "smart_blinds",
          name: "Automatische Rollläden",
          icon: Monitor,
          benefit: "Wecker durch Tageslicht",
        },
        {
          id: "air_quality",
          name: "Luftqualitätsüberwachung",
          icon: Wifi,
          benefit: "Gesunder Schlaf durch optimale Luft",
        },
      ],
    },
  };

  const addDevice = (device, roomName) => {
    const deviceWithRoom = { ...device, room: roomName };
    setInstalledDevices([...installedDevices, deviceWithRoom]);
  };

  const removeDevice = (deviceId) => {
    setInstalledDevices(installedDevices.filter((d) => d.id !== deviceId));
  };

  const isDeviceInstalled = (deviceId) => {
    return installedDevices.some((d) => d.id === deviceId);
  };

  const getDeviceEmoji = (deviceName) => {
    if (deviceName.includes("Licht") || deviceName.includes("Beleuchtung"))
      return "💡";
    if (deviceName.includes("TV") || deviceName.includes("Entertainment"))
      return "📺";
    if (deviceName.includes("Temperatur") || deviceName.includes("Klima"))
      return "🌡️";
    return "🏠";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
          🏠 Smart Home Experience Center
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Entdecke die Zukunft des Wohnens - interaktiv und in 3D!
        </p>
        <p className="text-sm text-emerald-600 font-semibold">
          ✨ Alle Lösungen sind mieterfreundlich und ohne Umbau
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Räume & Geräte
          </h3>
          {Object.keys(rooms).map((room) => (
            <div key={room} className="mb-4">
              <h4
                className="font-semibold text-lg cursor-pointer"
                onClick={() =>
                  setSelectedRoom(selectedRoom === room ? null : room)
                }
              >
                {rooms[room].name}
              </h4>
              <ul>
                {rooms[room].devices.map((device) => (
                  <li key={device.id}>
                    <button
                      onClick={() =>
                        isDeviceInstalled(device.id)
                          ? removeDevice(device.id)
                          : addDevice(device, rooms[room].name)
                      }
                      className={`py-2 px-4 rounded ${
                        isDeviceInstalled(device.id) ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {isDeviceInstalled(device.id) ? "Entfernen" : "Hinzufügen"}
                    </button>
                    <device.icon className="inline-block mx-2" />
                    {device.name} ({device.benefit})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartHomeSimulator;