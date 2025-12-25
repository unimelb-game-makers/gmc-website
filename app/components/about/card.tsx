type CardProps = {
  title: string;
  imageSrc: string;
  description: string;
  href: string;
};

export function FeatureCard({ title, imageSrc, description, href }: CardProps) {
  return (
    <a
      href={href}
      className="group block md:w-[50%] lg:max-w-[300px] rounded-2xl bg-[#D9D9D9] hover:bg-[#9a9797] transition-colors duration-200 p-6 text-left">
      <h3 className="text-black/80 font-karla font-bold text-xl mb-4">
        {title}
      </h3>

      <div className="w-full h-40 flex items-center justify-left lg:justify-center mb-4">
        <img
          src={imageSrc}
          alt=""
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <p className="text-black/80 font-karla text-base">
        {description}
      </p>
    </a>
  );
}