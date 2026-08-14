

const Setting: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-white/[0.03] px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-semibold text-gray-300">
        {value}
      </p>
    </div>
  );
};

export default Setting;
