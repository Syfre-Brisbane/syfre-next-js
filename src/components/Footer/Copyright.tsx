export default function Copyright() {
  return (
    <div className="flex items-center justify-start">
      <p className="text-xs font-light text-white">
        © {new Date().getFullYear()} Syfre AI Solutions Pty Ltd · ABN 94 675 021 351
      </p>
    </div>
  );
}