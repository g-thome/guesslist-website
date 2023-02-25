import Image, { ImageProps } from "next/image";

type AvatarProps = {
  src: ImageProps["src"];
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
        className="rounded-full h-[50px] object-cover"
      />
    </div>
  );
}
