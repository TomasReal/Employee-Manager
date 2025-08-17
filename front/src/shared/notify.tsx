import { Toaster, toast } from 'react-hot-toast';

export const notify = {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
    info: (msg: string) => toast(msg),

    loading: (msg: string) => {
        const id = toast.loading(msg);
        return () => toast.dismiss(id);
    },

    promise: <T,>(p: Promise<T>, msgs: { loading: string; success: string; error: string }) =>
        toast.promise(p, msgs),
};

export function AppToaster() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: { fontSize: '0.95rem' },
            }}
        />
    );
}
