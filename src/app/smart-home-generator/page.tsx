'use client';

import React, { useState } from 'react';

const steps = [
  {
    id: 'goals',
    title: 'Ziele auswählen',
    description: 'Wähle deine Hauptziele für das Smart Home Setup.',
    options: [
      { id: 'comfort', label: 'Komfort', icon: '🛋️' },
      { id: 'security', label: 'Sicherheit', icon: '🔒' },
      { id: 'energy', label: 'Energie sparen', icon: '⚡' },
    ],
  },
  {
    id: 'rooms',
    title: 'Räume definieren',
    description: 'Wie viele Räume möchtest du smart machen?',
    options: Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      label: `${i + 1} Raum${i + 1 > 1 ? 'e' : ''}`,
    })),
  },
  {
    id: 'devices',
    title: 'Geräte auswählen',
    description: 'Wähle die Geräte, die du verwenden möchtest.',
    options: [
      { id: 'philips-hue', label: 'Philips Hue' },
      { id: 'shelly', label: 'Shelly' },
      { id: 'ecoflow', label: 'EcoFlow' },
      { id: 'home-assistant', label: 'Home Assistant' },
    ],
  },
  {
    id: 'review',
    title: 'Überprüfung',
    description: 'Überprüfe deine Auswahl und erhalte Empfehlungen.',
  },
];

export default function ModernSmartHomeConfigurator() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const currentStep = steps[currentStepIndex];

  const toggleOption = (optionId) => {
    setSelectedOptions((prev) => {
      const currentSelected = prev[currentStep.id] || [];
      if (currentSelected.includes(optionId)) {
        return {
          ...prev,
          [currentStep.id]: currentSelected.filter((id) => id !== optionId),
        };
      } else {
        return {
          ...prev,
          [currentStep.id]: [...currentSelected, optionId],
        };
      }
    });
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">{currentStep.title}</h3>
      <p className="mb-4 text-sm text-gray-600">{currentStep.description}</p>

      {currentStep.options && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {currentStep.options.map((option) => {
            const isSelected = (selectedOptions[currentStep.id] || []).includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className={`rounded-lg border px-4 py-2 text-left focus:outline-none ${
                  isSelected ? 'border-emerald-500 bg-emerald-100' : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {option.icon && <span>{option.icon}</span>}
                  <span>{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
        >
          Zurück
        </button>
        {currentStepIndex < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Weiter
          </button>
        ) : (
          <button
            type="button"
            onClick={() => alert('Konfiguration abgeschlossen!')}
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Fertig
          </button>
        )}
      </div>
    </div>
  );
}