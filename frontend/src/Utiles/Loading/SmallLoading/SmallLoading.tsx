import "./SmallLoading.css"

export const SmallLoading = () => {
  return (
    <svg
      className="small-loading-spinner stroke-slate-200 mx-auto h-6"
      viewBox="25 25 50 50"
      style={{
        width: "3.25em",
        transformOrigin: "center",
        animation: "rotate4 2s linear infinite",
      }}
    >
 
      <circle r="20" cy="50" cx="50" />
    </svg>
  );
};
