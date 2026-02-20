interface ProgressProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
      <div
        className="bg-green-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
