import "./Total.scss";
import Text from "./Text";

type TotalProps = {
  value: string;
  isReceipts?: boolean;
  isModel?: boolean;
};

const Total = (props: TotalProps) => {
  const { value, isReceipts = false, isModel = false } = props;

  return (
    <div className={isModel ? "model-total-wrapper" : "total-wrapper"}>
      <Text text={!isReceipts ? `Total: ${value}` : `Média Total: ${value}`} />
    </div>
  );
};

export default Total;
