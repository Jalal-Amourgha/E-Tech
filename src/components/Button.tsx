interface ButtonProps {
  title: string;
  classes?: string;
  onClick?: () => void;
  border?: boolean;
  icon?: any;
  type?: "button" | "submit";
}

const Button = ({
  title,
  classes,
  onClick,
  border = false,
  icon = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${classes} py-3 px-8 ${
        border
          ? "border-1 border-gray bg-white text-black"
          : "bg-primary text-white"
      }  text-lg font-normal rounded-lg`}
      onClick={onClick}
    >
      {icon} {title}
    </button>
  );
};

export default Button;
