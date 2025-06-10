type SaveIconProps = {
  className?: string;
};
const SvgIcon = (props: SaveIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 20 20"
    className={props.className}
  >
    <path d="M12 2v4H6V2m0 16v-8h8v8"></path>
    <path d="M18 5.828a2 2 0 0 0-.586-1.414l-1.828-1.828A2 2 0 0 0 14.172 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"></path>
  </svg>
);

export default SvgIcon;