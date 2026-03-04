import { jobsService } from '@/services/jobchaser/jobs.service';
import { fail, Job, JobDetailView, ok, Result } from '@jobchaser/domain';
import { serializeTreeToHTML } from '@jobchaser/shared/html-parse';

interface JobDetailActions {
  handleSave: (job: JobDetailView) => Promise<Result<Job>>;
}

export default function useJobDetailActions(): JobDetailActions {
  const handleSave = async (job: JobDetailView) => {
    // map job to domian Job -> I think I will just flatten inline and fix with a spread like:
    // only before in the parser I need to make sure to use domain job alreadykkk
    const result = await jobsService.saveJob({
      ...job,
      description: serializeTreeToHTML(job.description),
    });

    if (!result.ok) {
      console.log('[error saving job]', result.error);
      return fail(result.error);
    }

    console.log(result.value);
    return ok(result.value);
  };
  return {
    handleSave,
  };
}
