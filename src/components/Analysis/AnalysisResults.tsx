import React from "react";
import { ProcessedImage, DetectedFeature } from "../../types";
import { Check, FileBarChart, Download, Share2, Eye } from "lucide-react";

interface AnalysisResultsProps {
	processedImage: ProcessedImage | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ processedImage }) => {
	if (!processedImage) {
		return null;
	}

	const { analysis } = processedImage;

	const getRiskBadgeClasses = (riskLevel: string) => {
		switch (riskLevel) {
			case "low":
				return "bg-green-100 text-green-800";
			case "medium":
				return "bg-yellow-100 text-yellow-800";
			case "high":
				return "bg-orange-100 text-orange-800";
			case "critical":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getFeatureIcon = (type: string) => {
		switch (type) {
			case "slope_failure":
				return "🏔️";
			case "debris_flow":
				return "💧";
			case "rockfall":
				return "🪨";
			case "earth_flow":
				return "🌊";
			case "potential_trigger":
				return "⚠️";
			default:
				return "❓";
		}
	};

	const getFeatureLabel = (type: string) => {
		switch (type) {
			case "slope_failure":
				return "Slope Failure";
			case "debris_flow":
				return "Debris Flow";
			case "rockfall":
				return "Rockfall";
			case "earth_flow":
				return "Earth Flow";
			case "potential_trigger":
				return "Potential Trigger";
			default:
				return type;
		}
	};

	return (
		<div className="bg-white rounded-lg shadow">
			<div className="p-4 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">Analysis Results</h3>
					<span className={`text-xs font-medium px-3 py-1 rounded-full ${getRiskBadgeClasses(analysis.riskLevel)}`}>{analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)} Risk</span>
				</div>
			</div>

			<div className="p-4">
				<div className="mb-6">
					<h4 className="text-sm font-medium text-gray-700 mb-3">Image Analysis</h4>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div className="border border-gray-200 rounded-lg overflow-hidden">
							<div className="p-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">Original Image</div>
							<div className="p-2">
								<img src={processedImage.preview} alt="Original" className="w-full h-auto rounded" />
							</div>
						</div>

						<div className="border border-gray-200 rounded-lg overflow-hidden">
							<div className="p-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">Processed Image with Detected Areas</div>
							<div className="p-2">
								<img src={processedImage.processedPreview} alt="Processed" className="w-full h-auto rounded" />
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
						<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
							<div className="text-sm text-gray-500 mb-1">Risk Level</div>
							<div className="text-xl font-bold text-gray-900 capitalize">{analysis.riskLevel}</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
							<div className="text-sm text-gray-500 mb-1">Confidence</div>
							<div className="text-xl font-bold text-gray-900">{analysis.confidence.toFixed(2)}%</div>
						</div>

						<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
							<div className="text-sm text-gray-500 mb-1">Affected Area</div>
							<div className="text-xl font-bold text-gray-900">{analysis.affectedAreaPercentage.toFixed(2)}%</div>
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h4 className="text-sm font-medium text-gray-700 mb-3">Detected Features ({analysis.detectedFeatures.length})</h4>

					{analysis.detectedFeatures.length === 0 ? (
						<div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
							<div className="flex justify-center mb-2">
								<Check className="h-8 w-8 text-green-500" />
							</div>
							<p className="text-gray-600">No landslide features detected in this image.</p>
						</div>
					) : (
						<div className="space-y-3">
							{analysis.detectedFeatures.map((feature: DetectedFeature) => (
								<div key={feature.id} className="flex items-start p-3 border border-gray-200 rounded-lg">
									<div className="mr-3 text-xl">{getFeatureIcon(feature.type)}</div>
									<div>
										<h5 className="font-medium text-gray-900">{getFeatureLabel(feature.type)}</h5>
										<p className="text-sm text-gray-600 mb-1">{feature.description}</p>
										<div className="flex items-center text-xs text-gray-500">
											<span className="mr-3">
												Confidence: <span className="font-medium">{feature.confidence.toFixed(2)}%</span>
											</span>
											<span>
												Position: x:{feature.coordinates.x}, y:{feature.coordinates.y}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="mb-6">
					<h4 className="text-sm font-medium text-gray-700 mb-3">Metadata</h4>

					<div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-sm">
						<div className="grid grid-cols-2 gap-y-2">
							<div className="text-gray-500">Algorithm</div>
							<div className="text-gray-900">{analysis.metadata.algorithm}</div>

							<div className="text-gray-500">Processing Time</div>
							<div className="text-gray-900">{analysis.metadata.processingTime}ms</div>

							<div className="text-gray-500">Resolution</div>
							<div className="text-gray-900">{analysis.metadata.resolution}</div>

							<div className="text-gray-500">Analysis Date</div>
							<div className="text-gray-900">
								{new Date(analysis.timestamp).toLocaleDateString()} {new Date(analysis.timestamp).toLocaleTimeString()}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					<button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center">
						<FileBarChart className="w-4 h-4 mr-2" />
						Full Report
					</button>

					<button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center">
						<Download className="w-4 h-4 mr-2" />
						Download Results
					</button>

					<button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center">
						<Share2 className="w-4 h-4 mr-2" />
						Share
					</button>

					<button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center">
						<Eye className="w-4 h-4 mr-2" />
						View on Map
					</button>
				</div>
			</div>
		</div>
	);
};

export default AnalysisResults;
