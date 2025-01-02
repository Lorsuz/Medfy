import Image from "next/image";

interface QuestionImageProps {
  src: string;
}

export function QuestionImage({ src }: QuestionImageProps) {
  return (
    <Image
      src={src}
      alt="Imagem da questão"
      width={1000}
      height={1000}
      className="w-auto h-auto max-w-96 mt-4 !rounded-2xl"
    />
  );
}
