type PageTitleProps = {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg sm:text-3xl font-bold tracking-tight text-gray-900">{props.title}</h1>
      </div>
    </header>
  );
};

export default PageTitle;
