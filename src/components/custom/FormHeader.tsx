interface FormHeaderProps {
  title: string;
  description?: string;
}

const FormHeader = ({ title, description }: FormHeaderProps) => {
  return (
    <div className="flex flex-col mb-2  gap-1 text-center">
      <h1 className="text-3xl">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default FormHeader;
