'use client';

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const shareOnX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <>
      <button
        onClick={copyToClipboard}
        className="cursor-pointer hover:opacity-70 transition-opacity"
        title="Copy link"
      >
        <img
          alt="Share link"
          className="block max-w-none size-full"
          src="/link.png"
        />
      </button>
      <button
        onClick={shareOnX}
        className="cursor-pointer hover:opacity-70 transition-opacity"
        title="Share on X"
      >
        <img
          alt="Share on X"
          className="block max-w-none size-full"
          src="/x.png"
        />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="cursor-pointer hover:opacity-70 transition-opacity"
        title="Share on LinkedIn"
      >
        <img
          alt="Share on LinkedIn"
          className="block max-w-none size-full"
          src="/linkedin.png"
        />
      </button>
    </>
  );
}