type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article';
  id?: string;
};

export function Container({ children, className = '', as: Tag = 'div', id }: ContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </Tag>
  );
}
