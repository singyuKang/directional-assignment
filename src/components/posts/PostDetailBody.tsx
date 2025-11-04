interface PostDetailBodyProps {
  body: string;
}

export default function PostDetailBody({ body }: PostDetailBodyProps) {
  return (
    <div className="p-6">
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}
