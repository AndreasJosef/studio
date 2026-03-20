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
      className="bg-app-surface-raised text-center text-content-muted text-sm rounded-full px-2 py-0.5 appearance-none cursor-pointer font-semibold"
    >
      {Object.entries(APPLICATION_STATUS).map(([key, value]) => (
        <option key={value} value={value}>
          {key.charAt(0) + key.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
}
