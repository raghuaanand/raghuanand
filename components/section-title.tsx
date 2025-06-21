interface Props {
  title: string;
  titleNo: string;
}

const SectionTitle = ({ title, titleNo }: Props) => {
  return (
    <div className="flex items-center justify-center md:justify-start mb-12">
      <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary flex items-center">
        <span className="text-lg font-sans font-medium text-accent mr-4 bg-accent/10 px-3 py-1 rounded-full">
          {titleNo}
        </span>
        {title}
      </h2>
      <div className="hidden md:flex flex-1 ml-8">
        <div className="h-px bg-border flex-1"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
