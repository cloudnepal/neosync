'use client';

import { Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import ConfirmationDialog from '@/components/ConfirmationDialog';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import { useAccount } from '@/components/providers/account-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { getErrorMessage } from '@/util/util';
import { useMutation } from '@connectrpc/connect-query';
import { JobRun, JobRunStatus as JobRunStatusEnum } from '@neosync/sdk';
import {
  cancelJobRun,
  deleteJobRun,
  terminateJobRun,
} from '@neosync/sdk/connectquery';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onDeleted(): void;
}

export function DataTableRowActions<TData>({
  row,
  onDeleted,
}: DataTableRowActionsProps<TData>) {
  const run = row.original as JobRun;
  const router = useRouter();
  const { account } = useAccount();
  const { toast } = useToast();
  const { mutateAsync: removeJobRunAsync } = useMutation(deleteJobRun);
  const { mutateAsync: cancelJobRunAsync } = useMutation(cancelJobRun);
  const { mutateAsync: terminateJobRunAsync } = useMutation(terminateJobRun);

  async function onDelete(): Promise<void> {
    try {
      await removeJobRunAsync({ accountId: account?.id, jobRunId: run.id });
      toast({
        title: 'Removing Job Run. This may take a minute to delete!',
        variant: 'success',
      });
      onDeleted();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Unable to remove job run',
        description: getErrorMessage(err),
        variant: 'destructive',
      });
    }
  }

  async function onCancel(): Promise<void> {
    try {
      await cancelJobRunAsync({ accountId: account?.id, jobRunId: run.id });
      toast({
        title: 'Canceling Job Run. This may take a minute to cancel!',
        variant: 'success',
      });
      onDeleted();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Unable to cancel job run',
        description: getErrorMessage(err),
        variant: 'destructive',
      });
    }
  }

  async function onTerminate(): Promise<void> {
    try {
      await terminateJobRunAsync({ accountId: account?.id, jobRunId: run.id });
      toast({
        title: 'Terminating Job Run. This may take a minute to terminate!',
        variant: 'success',
      });
      onDeleted();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Unable to terminate job run',
        description: getErrorMessage(err),
        variant: 'destructive',
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/${account?.name}/runs/${run.id}`)}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {(run.status === JobRunStatusEnum.RUNNING ||
          run.status === JobRunStatusEnum.PENDING) && (
          <div>
            <ConfirmationDialog
              trigger={
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  Cancel
                </DropdownMenuItem>
              }
              headerText="Are you sure you want to cancel this job run?"
              description=""
              onConfirm={async () => onCancel()}
              buttonText="Cancel"
              buttonVariant="default"
              buttonIcon={<Cross2Icon />}
            />
            <DropdownMenuSeparator />
            <ConfirmationDialog
              trigger={
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  Terminate
                </DropdownMenuItem>
              }
              headerText="Are you sure you want to terminate this job run?"
              description=""
              onConfirm={async () => onTerminate()}
              buttonText="Terminate"
              buttonVariant="default"
              buttonIcon={<Cross2Icon />}
            />
            <DropdownMenuSeparator />
          </div>
        )}

        <DeleteConfirmationDialog
          trigger={
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              Delete
            </DropdownMenuItem>
          }
          headerText="Are you sure you want to delete this job run?"
          description=""
          onConfirm={async () => {
            await onDelete();
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
