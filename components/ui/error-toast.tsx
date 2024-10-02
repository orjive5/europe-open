import { ToastAction } from "./toast";
import { toast } from "./use-toast";

// Error toast for drag & drop
export const ErrorToast = ({ description }: { description: string }) => toast({
    variant: 'destructive',
    title: "Error",
    description,
    action:
        <ToastAction altText="Try again">
            Try again
        </ToastAction>,
})