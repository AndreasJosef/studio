import { jobsService } from '@/services/jobchaser/jobs.service';
import {
  fail,
  JobDetailView,
  ok,
  Result,
  SyncConfirmation,
} from '@jobchaser/domain';
import { serializeTreeToHTML } from '@jobchaser/shared/html-parse';

interface JobDetailActions {
  handleSave: (job: JobDetailView) => Promise<Result<SyncConfirmation>>;
}

export default function useJobDetailActions(
  setSaveIds: React.Dispatch<React.SetStateAction<number[]>>
): JobDetailActions {
  const handleSave = async (job: JobDetailView) => {
    const result = await jobsService.saveJob({
      ...job,
      description: serializeTreeToHTML(job.description),
    });

    if (!result.ok) {
      return fail(result.error);
    }

    const savedId = result.value.externalId;

    setSaveIds((prev) => {
      if (prev.includes(savedId)) return prev;
      return [...prev, savedId];
    });

    return ok(result.value);
  };
  return {
    handleSave,
  };
}
