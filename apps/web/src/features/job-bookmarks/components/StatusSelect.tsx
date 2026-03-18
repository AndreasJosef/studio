import { APPLICATION_STATUS, type ApplicationStatus } from '@jobchaser/domain';

export default function StatusSelect({
  current,
  onUpdate,
}: {
  current: ApplicationStatus;
  onUpdate: (value: ApplicationStatus) => void;
}) {
  return (
    <select
      value={current}
      onChange={(e) => onUpdate(e.target.value as ApplicationStatus)}
      className="bg-zinc-700 text-zinc-200 text-sm rounded px-2 py-1"
    >
      {Object.entries(APPLICATION_STATUS).map(([key, value]) => (
        <option key={value} value={value}>
          {key.charAt(0) + key.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
}
