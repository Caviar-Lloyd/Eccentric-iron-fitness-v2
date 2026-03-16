type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article';
  id?: string;
};

export function Container({ children, className = '', as: Tag = 'div', id }: ContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-[1280px] px-4 md:px-6 ${className}`}>
      {children}
    </Tag>
  );
}
