type LoadingProps = {
  full?: boolean;
}

const Loading = (props: LoadingProps) => {
  return (
    <div className={`${props.full ? "flex justify-center items-center h-full w-full" : ""}`}>
      <div className="animate-spin h-5 w-5 border-2 border-indigo-900 rounded-full border-t-transparent"></div>
    </div>
  );
};    

export default Loading;
