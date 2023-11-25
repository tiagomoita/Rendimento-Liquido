type TextProps = {
  text: any;
  color?: string;
  fontSize?: string;
  className?: any;
  margin?: string;
  width?: string;
  textAlign?: any;
  alignSelf?: any;
};

const Text = (props: TextProps) => {
  const {
    text,
    color,
    fontSize,
    className,
    margin,
    width,
    textAlign,
    alignSelf,
  } = props;

  return (
    <div
      className={className}
      style={{ color, fontSize, margin, width, textAlign, alignSelf }}
    >
      {text}
    </div>
  );
};

export default Text;
