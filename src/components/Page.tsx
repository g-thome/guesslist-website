export function Page({ children, title }) {
  return (
    <>
      <div className="p8">
        {title && <h1 className="text-white">{title}</h1>}
        {children}
      </div>
    </>
  );
}
