import Image from 'next/image';

const clients = [
  { name: 'Hyperion Systems', logo: '/logos/hyperion.png', showName: true, url: 'https://hyperionsystems.com.au' },
  { name: 'Harcourts', logo: '/logos/harcourts.svg', showName: false, url: 'https://harcourts.net/au' },
  { name: 'Checkmate', logo: '/logos/checkmate.svg', showName: false, url: 'https://checkmate.tech' },
  { name: 'Axtec', logo: '/logos/axtec.png', showName: false, url: 'https://axtec.com.au' },
  { name: 'The Local Experts', logo: '/logos/the-local-experts.png', showName: false, url: 'https://thelocalexperts.com.au' },
  { name: 'PS Rewards', logo: '/logos/ps-rewards.svg', showName: false, url: 'https://psrewards.com.au' },
  { name: 'Andonis Cafe', logo: '/logos/andonis-cafe.png', showName: true, url: 'https://andoniscafeandbar.com' },
];

export default function ServiceClients() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-zinc-500 mb-8 text-center">Trusted by</p>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain brightness-0 invert"
              />
              {client.showName && (
                <span className="text-white font-light text-sm sm:text-base">{client.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
