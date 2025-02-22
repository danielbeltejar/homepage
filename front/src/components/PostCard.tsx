import Button from './Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface PostCardProps {
    title: string;
    date: string;
    onClick: () => void;
    content: string;
}

function extractFirstImageUrl(content: string): string | null {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
}

export default function PostCard({ title, date, content, onClick }: PostCardProps) {
    const firstImageUrl = extractFirstImageUrl(content);
    return (
        <div className="flex flex-row items-center justify-between bg-background dark:bg-dark-background
      px-5 py-4 rounded-xl shadow-inner-lg w-full transition-all h-24 duration-500 gap-4">
            <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
                <div className="w-16 h-16 rounded-md bg-gray-300 overflow-hidden flex-shrink-0">
                    {firstImageUrl ? (
                        <img
                            src={firstImageUrl}
                            alt="Post"
                            className="w-full h-full object-cover transition-transform duration-500 scale-150 skeleton-simple"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300"></div>
                    )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <h2 className="text-lg font-bold truncate">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-500 truncate">{date}</p>
                </div>
            </div>
            <div className="flex-shrink-0">
                <Button
                    icon={faArrowRight}
                    onClick={onClick}
                    newTab={false}
                    primary={true}
                />
            </div>
        </div>
    );
}
