import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

interface StatCardProps {
	title: string;
	value: string | number;
	icon: typeof LucideIcon;
	description?: string;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	color: "primary" | "secondary" | "warning" | "danger" | "success";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, description, trend, color }) => {
	const getColorClasses = () => {
		switch (color) {
			case "primary":
				return "bg-blue-50 text-blue-700 border-blue-200";
			case "secondary":
				return "bg-purple-50 text-purple-700 border-purple-200";
			case "warning":
				return "bg-amber-50 text-amber-700 border-amber-200";
			case "danger":
				return "bg-red-50 text-red-700 border-red-200";
			case "success":
				return "bg-emerald-50 text-emerald-700 border-emerald-200";
			default:
				return "bg-gray-50 text-gray-700 border-gray-200";
		}
	};

	const getTrendClasses = () => {
		if (!trend) return "";
		return trend.isPositive ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50";
	};

	return (
		<div className={`rounded-lg border p-4 shadow-sm ${getColorClasses()}`}>
			<div className="flex justify-between items-start">
				<div>
					<p className="text-sm font-medium">{title}</p>
					<h3 className="text-2xl font-bold mt-1">{value}</h3>
				</div>
				<div className={`p-2 rounded-full ${getColorClasses()}`}>
					<Icon className="h-5 w-5" />
				</div>
			</div>

			{(description || trend) && (
				<div className="mt-3 flex items-center justify-between">
					{description && <p className="text-xs opacity-80">{description}</p>}

					{trend && (
						<div className={`text-xs px-2 py-1 rounded-full font-medium flex items-center ${getTrendClasses()}`}>
							{trend.isPositive ? "+" : ""}
							{trend.value}%
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default StatCard;
