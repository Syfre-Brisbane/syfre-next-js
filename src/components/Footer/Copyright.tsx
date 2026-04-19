export default function Copyright() {
  return (
    <div className="flex items-center justify-start">
      <p className="text-xs font-light text-white">
        © {new Date().getFullYear()} Syfre
      </p>
    </div>
  );
}