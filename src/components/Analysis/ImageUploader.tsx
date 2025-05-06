import React, { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, Check } from "lucide-react";
import { ImageFile } from "../../types";

interface ImageUploaderProps {
	onImageUpload: (image: ImageFile) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);

	const handleDragEnter = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const processFile = useCallback(
		(file: File) => {
			// Simulate upload progress
			setUploadProgress(0);
			const interval = setInterval(() => {
				setUploadProgress((prev) => {
					if (prev === null) return 0;
					const newProgress = prev + 10;
					if (newProgress >= 100) {
						clearInterval(interval);

						// Create file preview
						const reader = new FileReader();
						reader.onload = (e) => {
							const newImage: ImageFile = {
								id: crypto.randomUUID(),
								file,
								preview: e.target?.result as string,
								name: file.name,
								size: file.size,
								type: file.type,
								dateUploaded: new Date(),
							};

							onImageUpload(newImage);

							// Reset upload progress after a short delay
							setTimeout(() => {
								setUploadProgress(null);
							}, 500);
						};
						reader.readAsDataURL(file);

						return 100;
					}
					return newProgress;
				});
			}, 100);
		},
		[onImageUpload]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			if (e.dataTransfer.files && e.dataTransfer.files[0]) {
				const file = e.dataTransfer.files[0];
				processFile(file);
			}
		},
		[processFile]
	);

	const handleFileInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files[0]) {
				const file = e.target.files[0];
				processFile(file);
			}
		},
		[processFile]
	);

	return (
		<div className="bg-white rounded-lg shadow">
			<div className="p-4 border-b border-gray-200">
				<h3 className="text-lg font-semibold">Upload Satellite/Drone Image</h3>
			</div>

			<div
				className={`p-8 border-2 border-dashed rounded-lg m-4 transition-colors ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:border-emerald-400"}`}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}>
				{uploadProgress !== null ? (
					<div className="text-center">
						<div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100">
							{uploadProgress < 100 ? <Upload className="h-8 w-8 text-emerald-600" /> : <Check className="h-8 w-8 text-emerald-600" />}
						</div>
						<div className="relative h-2 bg-gray-200 rounded-full max-w-md mx-auto mb-2">
							<div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full transition-all duration-100" style={{ width: `${uploadProgress}%` }}></div>
						</div>
						<p className="text-sm text-gray-600">{uploadProgress < 100 ? "Uploading..." : "Upload Complete!"}</p>
					</div>
				) : (
					<div className="text-center">
						<div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100">
							<ImageIcon className="h-8 w-8 text-emerald-600" />
						</div>
						<h4 className="text-lg font-medium text-gray-700 mb-1">Drop your image here</h4>
						<p className="text-sm text-gray-500 mb-4">or click to browse from your computer</p>
						<p className="text-xs text-gray-400 mb-4">Supports: JPEG, PNG, TIFF (max 50MB)</p>
						<button
							className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
							onClick={() => document.getElementById("fileInput")?.click()}>
							Select Image
						</button>
						<input id="fileInput" type="file" className="hidden" accept="image/*" onChange={handleFileInputChange} />
					</div>
				)}
			</div>

			<div className="px-4 pb-4">
				<div className="text-xs text-gray-500">
					<p className="font-medium mb-1">Recommended image specifications:</p>
					<ul className="list-disc list-inside space-y-1">
						<li>High-resolution satellite or drone imagery</li>
						<li>Clear visibility (minimal cloud cover)</li>
						<li>Recent imagery for more accurate analysis</li>
						<li>Georeferenced images preferred for precise location data</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ImageUploader;
