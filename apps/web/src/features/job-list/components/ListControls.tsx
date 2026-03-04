interface ListControlProps {
  currentFilter: string;
  setFilter: (value: string) => void;
}

export default function ListControls({
  currentFilter,
  setFilter,
}: ListControlProps) {
  return (
    <>
      <input
        value={currentFilter}
        className="bg-neutral-100"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        type="text"
      />
    </>
  );
}
