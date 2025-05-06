import React from "react";
import { Clock } from "lucide-react";
import { ProcessedImage } from "../../types";

interface RecentUploadsProps {
	images: ProcessedImage[];
}

const RecentUploads: React.FC<RecentUploadsProps> = ({ images }) => {
	if (!images.length) {
		return (
			<div className="bg-white rounded-lg shadow p-6 text-center">
				<h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
				<p className="text-gray-500">No uploads yet</p>
			</div>
		);
	}

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

	return (
		<div className="bg-white rounded-lg shadow">
			<div className="p-4 border-b border-gray-200">
				<h3 className="text-lg font-semibold">Recent Uploads</h3>
			</div>
			<div className="p-2">
				{images.map((image) => (
					<div key={image.id} className="p-3 border-b border-gray-100 hover:bg-gray-50 flex items-center">
						<div className="w-16 h-16 rounded-md overflow-hidden mr-4 shrink-0">
							<img src={image.processedPreview || image.preview} alt={image.name} className="w-full h-full object-cover" />
						</div>
						<div className="flex-grow">
							<h4 className="font-medium text-gray-900 truncate max-w-[200px]">{image.name}</h4>
							<div className="flex items-center text-xs text-gray-500 mt-1">
								<Clock className="w-3 h-3 mr-1" />
								<span>
									{new Date(image.dateUploaded).toLocaleDateString()} at{" "}
									{new Date(image.dateUploaded).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</span>
							</div>
						</div>
						{image.processed && (
							<div className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${getRiskBadgeClasses(image.analysis.riskLevel)}`}>
								{image.analysis.riskLevel.charAt(0).toUpperCase() + image.analysis.riskLevel.slice(1)} Risk
							</div>
						)}
					</div>
				))}
			</div>
			<div className="p-3 text-center">
				<button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">View All Uploads</button>
			</div>
		</div>
	);
};

export default RecentUploads;
