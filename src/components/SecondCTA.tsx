import Button from './Button';

export default function SecondCTA() {
  return (
    <div className="flex flex-col items-center py-16 sm:py-32">
      <div className="max-w-4xl px-4">
        <h2 className="text-2xl sm:text-4xl font-light leading-tight tracking-tight mb-4">
          Let&apos;s build something intelligent.
        </h2>
        <p className="text-2xl sm:text-4xl font-light leading-tight tracking-tight mb-8">
          We&apos;re ready when you are.
        </p>
          <Button variant="primary" href="/contact">
              Contact us
          </Button>
      </div>

    </div>
  );
}