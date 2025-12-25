type DotPointProps = {
  text: string;
  iconSrc: string;
};

export function DotPoint({ text, iconSrc }: DotPointProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <img
        src={iconSrc}
        alt=""
        className="w-25 h-25 ssm:w-15 ssm:h-15 lg:w-30 lg:h-30 object-contain flex-shrink-0"
      />
      <p className="text-white text-[24px] font-karla text-left flex-1">
        {text}
      </p>
    </div>
  );
}
