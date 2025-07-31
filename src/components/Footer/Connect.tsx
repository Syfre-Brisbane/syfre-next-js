export default function Connect() {
  return (
    <div className="flex flex-col gap-1 text-sm w-32">
      <h3 className="font-semibold text-white mb-1">Connect</h3>
      <a href="https://www.linkedin.com/company/syfreai" target="_blank" className="font-light text-white hover:text-green-400 transition-colors">
        LinkedIn
      </a>
      <div className="font-light text-white">
        <span className="line-through">Twitter</span>
        <a href="https://x.com/syfre_ai" target="_blank" className="font-light text-white hover:text-green-400 transition-colors"> X</a>
      </div>
    </div>
  );
}