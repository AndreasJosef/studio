import { useStore } from "../store";
/**
 * @description
 * The main container component for the audit feature
 **/
export default function AuditPage() {
  const title = useStore((state) => state.test);
  return (
    <div>
      <h2>Audit</h2>
      <p>{title}</p>
    </div>
  );
}
