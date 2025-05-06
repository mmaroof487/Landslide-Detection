import React, { useState } from 'react';
import ImageUploader from '../components/Analysis/ImageUploader';
import ProcessingOptions from '../components/Analysis/ProcessingOptions';
import AnalysisResults from '../components/Analysis/AnalysisResults';
import { ImageFile, ProcessedImage } from '../types';
import { processImage } from '../utils/mockData';

const AnalyzePage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleImageUpload = (image: ImageFile) => {
    setUploadedImage(image);
    setProcessedImage(null);
  };
  
  const handleProcessImage = async (options: Record<string, number>) => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    
    try {
      const result = await processImage(uploadedImage.file, options);
      setProcessedImage(result);
    } catch (error) {
      console.error('Error processing image:', error);
      // In a real app, handle this error appropriately
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload & Analyze</h1>
        <p className="text-gray-600">
          Upload satellite or drone imagery to detect potential landslide areas
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>
        
        {uploadedImage && (
          <div>
            <ProcessingOptions 
              onProcessImage={handleProcessImage} 
              isProcessing={isProcessing}
            />
          </div>
        )}
        
        <div className="lg:col-span-3">
          <AnalysisResults processedImage={processedImage} />
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;