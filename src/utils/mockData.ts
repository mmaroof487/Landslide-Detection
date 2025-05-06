import { ProcessedImage, AnalysisResult, DetectedFeature } from "../types";

// Mock processed images
export const mockProcessedImages: ProcessedImage[] = [
	{
		id: "1",
		file: new File([], "mountain_region_1.jpg"),
		preview: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
		name: "mountain_region_1.jpg",
		size: 2400000,
		type: "image/jpeg",
		dateUploaded: new Date("2025-05-01T10:30:00"),
		processed: true,
		processedPreview: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
		analysis: {
			riskLevel: "high",
			confidence: 87.5,
			affectedAreaPercentage: 32.7,
			detectedFeatures: [
				{
					id: "f1",
					type: "slope_failure",
					confidence: 89.3,
					coordinates: { x: 250, y: 320, width: 120, height: 80 },
					description: "Steep slope with visible cracks and displaced material",
				},
				{
					id: "f2",
					type: "debris_flow",
					confidence: 78.5,
					coordinates: { x: 400, y: 450, width: 150, height: 100 },
					description: "Channel with recent debris flow activity",
				},
			],
			timestamp: new Date("2025-05-01T10:45:00"),
			metadata: {
				algorithm: "Advanced Edge Detection v2.3",
				processingTime: 4532,
				resolution: "1920x1080",
			},
		},
	},
	{
		id: "2",
		file: new File([], "coastal_area_scan.jpg"),
		preview: "https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg",
		name: "coastal_area_scan.jpg",
		size: 3150000,
		type: "image/jpeg",
		dateUploaded: new Date("2025-04-28T15:20:00"),
		processed: true,
		processedPreview: "https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg",
		analysis: {
			riskLevel: "medium",
			confidence: 72.8,
			affectedAreaPercentage: 18.3,
			detectedFeatures: [
				{
					id: "f3",
					type: "potential_trigger",
					confidence: 65.1,
					coordinates: { x: 180, y: 240, width: 90, height: 60 },
					description: "Heavy precipitation area with saturated soil",
				},
			],
			timestamp: new Date("2025-04-28T15:35:00"),
			metadata: {
				algorithm: "Texture Analysis Suite v1.8",
				processingTime: 3897,
				resolution: "2048x1536",
			},
		},
	},
	{
		id: "3",
		file: new File([], "highway_mountain_pass.jpg"),
		preview: "https://images.pexels.com/photos/730981/pexels-photo-730981.jpeg",
		name: "highway_mountain_pass.jpg",
		size: 2780000,
		type: "image/jpeg",
		dateUploaded: new Date("2025-04-25T09:10:00"),
		processed: true,
		processedPreview: "https://images.pexels.com/photos/730981/pexels-photo-730981.jpeg",
		analysis: {
			riskLevel: "critical",
			confidence: 94.2,
			affectedAreaPercentage: 45.9,
			detectedFeatures: [
				{
					id: "f4",
					type: "rockfall",
					confidence: 96.7,
					coordinates: { x: 320, y: 280, width: 110, height: 70 },
					description: "Unstable rock formation with recent activity",
				},
				{
					id: "f5",
					type: "slope_failure",
					confidence: 92.8,
					coordinates: { x: 510, y: 360, width: 130, height: 90 },
					description: "Major slope instability with visible deformation",
				},
				{
					id: "f6",
					type: "earth_flow",
					confidence: 88.5,
					coordinates: { x: 420, y: 430, width: 140, height: 85 },
					description: "Saturated soil with active earth flow movement",
				},
			],
			timestamp: new Date("2025-04-25T09:25:00"),
			metadata: {
				algorithm: "Combined DIP Analysis v3.1",
				processingTime: 6218,
				resolution: "2560x1440",
			},
		},
	},
	{
		id: "4",
		file: new File([], "forest_hillside.jpg"),
		preview: "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg",
		name: "forest_hillside.jpg",
		size: 2190000,
		type: "image/jpeg",
		dateUploaded: new Date("2025-04-22T14:45:00"),
		processed: true,
		processedPreview: "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg",
		analysis: {
			riskLevel: "low",
			confidence: 68.9,
			affectedAreaPercentage: 7.2,
			detectedFeatures: [],
			timestamp: new Date("2025-04-22T15:00:00"),
			metadata: {
				algorithm: "Forest Terrain Analysis v2.5",
				processingTime: 3456,
				resolution: "1920x1080",
			},
		},
	},
];

// Mock analytics data
export const mockAnalyticsData = {
	landslidesByRisk: [
		{ name: "Low", value: 12, color: "#10B981" },
		{ name: "Medium", value: 8, color: "#FBBF24" },
		{ name: "High", value: 5, color: "#F59E0B" },
		{ name: "Critical", value: 3, color: "#EF4444" },
	],
	landslidesByMonth: [
		{ month: "Jan", count: 2 },
		{ month: "Feb", count: 3 },
		{ month: "Mar", count: 5 },
		{ month: "Apr", count: 8 },
		{ month: "May", count: 7 },
		{ month: "Jun", count: 4 },
	],
};

// Function to simulate image processing
export const processImage = (imageFile: File): Promise<ProcessedImage> => {
	return new Promise((resolve) => {
		// Create a FileReader to read the uploaded image
		const reader = new FileReader();

		reader.onload = (e) => {
			const originalPreview = e.target?.result as string;

			// Simulate processing time
			setTimeout(() => {
				// Generate a random risk level
				const riskLevels = ["low", "medium", "high", "critical"] as const;
				const randomRiskIndex = Math.floor(Math.random() * riskLevels.length);
				const riskLevel = riskLevels[randomRiskIndex];

				// Determine number of features based on risk level
				let featureCount = 0;
				switch (riskLevel) {
					case "low":
						featureCount = Math.floor(Math.random() * 2); // 0-1
						break;
					case "medium":
						featureCount = 1 + Math.floor(Math.random() * 2); // 1-2
						break;
					case "high":
						featureCount = 2 + Math.floor(Math.random() * 2); // 2-3
						break;
					case "critical":
						featureCount = 3 + Math.floor(Math.random() * 3); // 3-5
						break;
				}

				// Generate features
				const featureTypes = ["slope_failure", "debris_flow", "rockfall", "earth_flow", "potential_trigger"] as const;
				const features: DetectedFeature[] = [];

				for (let i = 0; i < featureCount; i++) {
					const randomTypeIndex = Math.floor(Math.random() * featureTypes.length);
					const type = featureTypes[randomTypeIndex];

					let description = "";
					switch (type) {
						case "slope_failure":
							description = "Area with potential slope instability and surface deformation";
							break;
						case "debris_flow":
							description = "Channel with loose sediment susceptible to flow during precipitation";
							break;
						case "rockfall":
							description = "Steep slope with fractured rock formations prone to falling";
							break;
						case "earth_flow":
							description = "Slow-moving mass of saturated soil and regolith";
							break;
						case "potential_trigger":
							description = "Environmental condition that could initiate landslide activity";
							break;
					}

					features.push({
						id: `gen-${i}-${Date.now()}`,
						type,
						confidence: 60 + Math.random() * 40, // 60-100
						coordinates: {
							x: Math.floor(Math.random() * 800),
							y: Math.floor(Math.random() * 600),
							width: 50 + Math.floor(Math.random() * 100),
							height: 40 + Math.floor(Math.random() * 80),
						},
						description,
					});
				}

				// Create analysis result
				const analysis: AnalysisResult = {
					riskLevel,
					confidence: 60 + Math.random() * 40, // 60-100
					affectedAreaPercentage: Math.random() * 50, // 0-50
					detectedFeatures: features,
					timestamp: new Date(),
					metadata: {
						algorithm: "Landslide Detection Algorithm v1.0",
						processingTime: 2000 + Math.floor(Math.random() * 4000), // 2000-6000ms
						resolution: "1280x720",
					},
				};

				// Based on the options, we could modify the analysis results here
				// For this mock, we'll just return a processed image

				resolve({
					id: crypto.randomUUID(),
					file: imageFile,
					preview: originalPreview,
					name: imageFile.name,
					size: imageFile.size,
					type: imageFile.type,
					dateUploaded: new Date(),
					processed: true,
					processedPreview: originalPreview, // In a real app, this would be the processed image
					analysis,
				});
			}, 2000 + Math.floor(Math.random() * 2000)); // Simulate processing time between 2-4 seconds
		};

		reader.readAsDataURL(imageFile);
	});
};
