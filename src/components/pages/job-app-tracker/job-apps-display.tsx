import { JobApplication } from '@/api/types.ts';
import { Button } from '@/components/ui/button.tsx';

interface JobApplicationDisplayProps {
  data: JobApplication[];
  onAdd?: () => void;
  onEdit?: (jobApplication: JobApplication) => void;
  onDelete?: (jobApplication: JobApplication) => void;
}

export default function JobApplicationDisplay({
  data,
  onAdd,
  onEdit,
  onDelete,
}: JobApplicationDisplayProps) {
  return (
    <div>
      <ul>
        {data.length == 0 ? (
          <p>Please add an application first</p>
        ) : (
          data.map((jobApplication) => (
            <li key={jobApplication.companyName}>
              <div>{jobApplication.companyName}</div>
              <div>{jobApplication.position}</div>
              <div>{jobApplication.modality}</div>
              <div>{jobApplication.status}</div>
              <div>{jobApplication.dateApplied.toString()}</div>
              <div>{jobApplication.responseDate?.toString()}</div>
              <div>{jobApplication.notes}</div>
              <button onClick={() => onEdit?.(jobApplication)}>Edit</button>
              <button onClick={() => onDelete?.(jobApplication)}>Delete</button>
            </li>
          ))
        )}
      </ul>
      <Button
        className={
          'fixed left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-3 w-[80%] '
        }
        onClick={onAdd}
      >
        Add Application
      </Button>
    </div>
  );
}
