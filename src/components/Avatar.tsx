import Image from "next/image";

type AvatarProps = {
  src: string;
  alt: string;
};

export function Avatar({ src, alt, ...props }: AvatarProps) {
  return (
    <div {...props}>
      <Image
        alt={alt}
        src={src}
        width={50}
        height={50}
        layout="fixed"
        className="rounded-full mr-6"
      />
    </div>
  );
}
