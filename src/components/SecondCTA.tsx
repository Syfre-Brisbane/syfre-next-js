import Button from './Button';

interface SecondCTAProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function SecondCTA({
  heading = "Let's build something intelligent.",
  subheading = "We're ready when you are.",
  ctaText = 'Contact us',
  ctaHref = '/contact',
}: SecondCTAProps) {
  return (
    <div className="flex flex-col items-center py-16 sm:py-32">
      <div className="max-w-4xl px-4">
        <h2 className="text-2xl sm:text-4xl font-light leading-tight tracking-tight mb-4">
          {heading}
        </h2>
        <p className="text-2xl sm:text-4xl font-light leading-tight tracking-tight mb-8">
          {subheading}
        </p>
          <Button variant="primary" href={ctaHref}>
              {ctaText}
          </Button>
      </div>

    </div>
  );
}
