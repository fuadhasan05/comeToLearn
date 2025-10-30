import { Clock, Users, Youtube, ChartLine } from "lucide-react";

export default function StatsSection({
  stats,
  bgColor = "bg-gray-900/50",
  cardBgColor = "bg-black/50",
}) {
  if (!stats || stats.length < 4) return null;

  // Define the fixed icons and labels (using the original order)
  const statItems = [
    { Icon: Users, label: stats[0].label, value: stats[0].value },
    { Icon: Youtube, label: stats[1].label, value: stats[1].value },
    { Icon: Clock, label: stats[2].label, value: stats[2].value },
    { Icon: ChartLine, label: stats[3].label, value: stats[3].value },
  ];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${bgColor}`}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`text-center ${cardBgColor} rounded-lg p-6 border border-gray-800`}
            >
              {/* Fixed Icon (only color/size customizable via CSS) */}
              <item.Icon className="w-10 h-10 text-yellow-500 mx-auto mb-3" />

              {/* Dynamic Value */}
              <div className="text-3xl font-bold text-white mb-2">
                {item.value}
              </div>

              {/* Dynamic Label */}
              <div className="text-gray-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
