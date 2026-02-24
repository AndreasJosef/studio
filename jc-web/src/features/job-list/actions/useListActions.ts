interface ListControls {
  onSelect: (id: string) => void;
}
export function useListActions({ onSelect }: ListControls) {
  return {
    handleItemClick: (id: string) => {
      onSelect(id);
    },
  };
}
