import Badge from './Badge';

export default function Insights() {
  const insights = [
    {
      date: "20 January, 2025",
      badge: "Automation",
      badgeVariant: "pink" as const,
      title: "How to spot your first AI automation opportunity",
      description: "For product owners or COOs looking to identify low-risk, high-impact areas where AI can deliver efficiency fast."
    },
    {
      date: "10 March, 2025",
      badge: "Machine learning",
      badgeVariant: "amber" as const,
      title: "Proof over promise: The case for small, smart AI pilots",
      description: "For product owners or COOs looking to identify low-risk, high-impact areas where AI can deliver efficiency fast."
    },
    {
      date: "13 April, 2025",
      badge: "Machine learning",
      badgeVariant: "amber" as const,
      title: "What AI can actually do for your business today.",
      description: "For product owners or COOs looking to identify low-risk, high-impact areas where AI can deliver efficiency fast."
    }
  ];

  return (
    <section className="px-6 py-36 w-full rounded-t-[60px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-6xl font-light leading-tight tracking-tight text-white">
              <span>Insights on AI written by </span>
              <span className="font-normal">humans.</span>
            </h2>
          </div>
          <div className="border border-green-400 rounded-full px-3 py-1.5">
            <span className="text-lg font-normal text-green-400 leading-7">
              Explore all insights
            </span>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="flex gap-8 w-full">
          {insights.map((insight, index) => (
            <div 
              key={index}
              className="bg-zinc-900 flex flex-col gap-16 p-10 rounded-xl flex-1 max-w-[432px]"
            >
              <div className="flex flex-col gap-32 w-full">
                {/* Date and Badge */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-normal text-zinc-300">
                    {insight.date}
                  </span>
                  <Badge variant={insight.badgeVariant}>
                    {insight.badge}
                  </Badge>
                </div>

                {/* Title and Description */}
                <div className="flex flex-col gap-2.5 w-full">
                  <h3 className="text-xl font-normal text-white leading-8">
                    {insight.title}
                  </h3>
                  <p className="text-base font-light text-zinc-300 leading-normal">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}