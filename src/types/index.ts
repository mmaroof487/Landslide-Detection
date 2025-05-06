export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
  dateUploaded: Date;
}

export interface ProcessedImage extends ImageFile {
  processed: boolean;
  processedPreview: string;
  analysis: AnalysisResult;
}

export interface AnalysisResult {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  affectedAreaPercentage: number;
  detectedFeatures: DetectedFeature[];
  timestamp: Date;
  metadata: {
    algorithm: string;
    processingTime: number;
    resolution: string;
  };
}

export interface DetectedFeature {
  id: string;
  type: 'slope_failure' | 'debris_flow' | 'rockfall' | 'earth_flow' | 'potential_trigger';
  confidence: number;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
}

export interface HistoricalData {
  id: string;
  location: string;
  date: Date;
  images: ProcessedImage[];
  trends: {
    riskChange: number;
    areaChange: number;
  };
}