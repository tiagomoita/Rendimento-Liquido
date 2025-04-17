import { NBTooltip } from "@nb-omc-xit-frontend/nb-data-display/lib/NBTooltip";
import infoSolid from "../../assets/images/circle-info-solid.svg";

type TextProps = {
  text: any;
  color?: string;
  fontSize?: string;
  className?: any;
  margin?: string;
  width?: string;
  textAlign?: any;
  alignSelf?: any;
  textInfo?: string;
  infoIcon?: boolean;
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
    textInfo = "",
    infoIcon,
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <div
        className={className}
        style={{ color, fontSize, margin, width, textAlign, alignSelf }}
      >
        {text}
      </div>
      {infoIcon === true && (
        <div
          style={{
            width: "22px",
            marginLeft: "5px",
            zIndex: "2",
          }}
        >
          <NBTooltip
            tooltip={textInfo}
            variant="dark"
            style={{
              cursor: "pointer",
            }}
          >
            <img style={{ width: "20px" }} src={infoSolid} alt="img" />
          </NBTooltip>
        </div>
      )}
    </div>
  );
};

export default Text;
