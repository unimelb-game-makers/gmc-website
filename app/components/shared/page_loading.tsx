import { BiLoaderAlt } from 'react-icons/bi';

interface PageLoadingProps {
    message?: string;
}

/**
 * Loading spinner for page-level Suspense fallbacks.
 */
export default function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
    return (
        <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center gap-4 text-gmc-teal">
                <BiLoaderAlt className="w-12 h-12 animate-spin" />
                <p className="text-xl font-arsenica font-bold text-white">{message}</p>
            </div>
        </div>
    );
}
