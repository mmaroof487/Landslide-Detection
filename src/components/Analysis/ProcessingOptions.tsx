import React, { useState } from 'react';
import { Settings, Sliders, Save } from 'lucide-react';

interface ProcessingOption {
  id: string;
  name: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
}

interface ProcessingOptionsProps {
  onProcessImage: (options: Record<string, number>) => void;
  isProcessing: boolean;
}

const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({ 
  onProcessImage, 
  isProcessing 
}) => {
  const [options, setOptions] = useState<ProcessingOption[]>([
    {
      id: 'edgeDetectionThreshold',
      name: 'Edge Detection Threshold',
      description: 'Sensitivity for detecting edges in the image',
      value: 30,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: 'textureAnalysisDepth',
      name: 'Texture Analysis Depth',
      description: 'Level of detail in texture analysis',
      value: 65,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: 'slopeThreshold',
      name: 'Slope Threshold',
      description: 'Minimum slope angle to consider as a risk factor',
      value: 25,
      min: 0,
      max: 90,
      step: 1,
    },
    {
      id: 'moistureDetection',
      name: 'Moisture Detection Sensitivity',
      description: 'Sensitivity for detecting soil moisture content',
      value: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: 'colorEnhancement',
      name: 'Color Enhancement',
      description: 'Enhances colors to better highlight risk areas',
      value: 40,
      min: 0,
      max: 100,
      step: 1,
    },
  ]);

  const [activePreset, setActivePreset] = useState<string | null>(null);
  
  const presets = [
    {
      id: 'standard',
      name: 'Standard Analysis',
      description: 'Balanced settings for general landslide detection',
      values: {
        edgeDetectionThreshold: 30,
        textureAnalysisDepth: 65,
        slopeThreshold: 25,
        moistureDetection: 50,
        colorEnhancement: 40,
      },
    },
    {
      id: 'detailed',
      name: 'Detailed Analysis',
      description: 'Higher sensitivity for detailed examination',
      values: {
        edgeDetectionThreshold: 20,
        textureAnalysisDepth: 85,
        slopeThreshold: 15,
        moistureDetection: 70,
        colorEnhancement: 60,
      },
    },
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Reduce false positives with conservative thresholds',
      values: {
        edgeDetectionThreshold: 45,
        textureAnalysisDepth: 50,
        slopeThreshold: 35,
        moistureDetection: 40,
        colorEnhancement: 30,
      },
    },
  ];
  
  const handleOptionChange = (id: string, value: number) => {
    setOptions(prevOptions => 
      prevOptions.map(option => 
        option.id === id ? { ...option, value } : option
      )
    );
    
    // Deactivate preset when manually changing values
    setActivePreset(null);
  };
  
  const applyPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;
    
    setOptions(prevOptions => 
      prevOptions.map(option => ({
        ...option,
        value: preset.values[option.id as keyof typeof preset.values] || option.value,
      }))
    );
    
    setActivePreset(presetId);
  };
  
  const handleProcessImage = () => {
    const optionsObject = options.reduce((acc, option) => {
      acc[option.id] = option.value;
      return acc;
    }, {} as Record<string, number>);
    
    onProcessImage(optionsObject);
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Processing Options</h3>
        <Settings className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
            <Sliders className="w-4 h-4 mr-1" />
            Presets
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {presets.map(preset => (
              <button
                key={preset.id}
                className={`p-3 rounded-md border text-left transition-colors ${
                  activePreset === preset.id
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
                onClick={() => applyPreset(preset.id)}
                type="button"
              >
                <h5 className="font-medium text-sm">{preset.name}</h5>
                <p className="text-xs text-gray-500 mt-1">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
            <Sliders className="w-4 h-4 mr-1" />
            Parameters
          </h4>
          
          {options.map(option => (
            <div key={option.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <label htmlFor={option.id} className="text-sm font-medium text-gray-700">
                  {option.name}
                </label>
                <span className="text-sm text-gray-500">{option.value}</span>
              </div>
              <input
                id={option.id}
                type="range"
                min={option.min}
                max={option.max}
                step={option.step}
                value={option.value}
                onChange={(e) => handleOptionChange(option.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <p className="text-xs text-gray-500 mt-1">{option.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <button
            className="w-full py-2.5 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            onClick={handleProcessImage}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Image...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Process Image
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessingOptions;