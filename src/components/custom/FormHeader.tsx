interface FormHeaderProps {
  title: string;
  description?: string;
}

const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <div className="flex flex-col mb-2 gap-1 text-center">
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      <p className="md:text-sm text-xs">{description}</p>
    </div>
  );
};

export default FormHeader;
