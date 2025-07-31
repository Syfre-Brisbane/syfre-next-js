import Button from './Button';

export default function CTA() {
  return (
    <section className="px-4 sm:px-6 py-6 sm:py-10 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-teal-400 flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 sm:px-9 py-6 sm:py-8 rounded-lg w-full gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 bg-center bg-cover bg-no-repeat shrink-0 rounded">
            <img 
              src="workshop.svg"
              alt="AI Workshop icon"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex flex-col gap-1 text-black">
            <div className="text-lg sm:text-xl font-semibold leading-7 sm:leading-8">
              Ready to unlock the power of AI, wondering where to start?
            </div>
            <div className="text-sm sm:text-base font-light">
              Syfre's AI Roadmap Workshops can guide your business on what to focus on.
            </div>
          </div>
        </div>
          <div className="shrink-0 sm:pr-4 self-start sm:self-auto">
            <Button variant="secondary" className="bg-white text-black hover:bg-gray-100">
              Apply now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}