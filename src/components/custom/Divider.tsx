import { Separator } from "../ui/separator";

interface DividerProps {
  text: string;
}

const Divider = ({ text }: DividerProps) => {
  return (
    <div className="flex items-center justify-center h-max shrink-0 w-full overflow-hidden max-w-lg">
      <Separator />
      <p className="p-2 shrink-0 text-nowrap">{text}</p>
      <Separator />
    </div>
  );
};

export default Divider;
