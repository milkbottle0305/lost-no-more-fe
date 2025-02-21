interface NumberCardProps {
  number: number;
  description: string;
}

export default function NumberCard({ number, description }: NumberCardProps) {
  return (
    <div
      data-cid="div-wMCIBK"
      className="flex w-full flex-col items-center justify-center rounded-2xl py-4 shadow-lg"
    >
      <p
        data-cid="p-WJ9ETQ"
        className="mb-2 text-4xl font-bold text-primary"
      >
        {number.toLocaleString()}
      </p>
      <p
        data-cid="p-B4pETk"
        className="text-base text-muted-foreground"
      >
        {description}
      </p>
    </div>
  );
}
