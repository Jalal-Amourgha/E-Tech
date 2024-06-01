const SectionHeader = ({
  title,
  classes = "",
}: {
  title: string;
  classes?: string;
}) => {
  return (
    <div className={`mb-10 flex items-center gap-3 h-full ${classes}`}>
      <span className="h-10 w-5 bg-primary rounded-md"></span>
      <h1 className="text-lg text-primary"> {title}</h1>
    </div>
  );
};

export default SectionHeader;
