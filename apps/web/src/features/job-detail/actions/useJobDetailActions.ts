import { jobsService } from '@/services/jobchaser/jobs.service';
import {
  ok,
  fail,
  Result,
  JobDetailView,
  SyncConfirmation,
} from '@jobchaser/domain';

interface JobDetailActions {
  handleSave: (job: JobDetailView) => Promise<Result<SyncConfirmation>>;
  handleDelete: (id: number) => Promise<Result<SyncConfirmation>>;
}

export default function useJobDetailActions(
  setSaveIds: React.Dispatch<React.SetStateAction<number[]>>
): JobDetailActions {
  const handleSave = async (job: JobDetailView) => {
    const result = await jobsService.saveJob(job);

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

  const handleDelete = async (id: number) => {
    const result = await jobsService.deleteJob(id);

    if (!result.ok) {
      return fail(result.error);
    }

    const removedId = result.value;

    console.log(removedId);
    return ok(result.value);
  };
  return {
    handleSave,
    handleDelete,
  };
}
