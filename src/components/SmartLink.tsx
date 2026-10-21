import React from 'react';
import { Link } from 'react-router-dom';

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const SmartLink: React.FC<SmartLinkProps> = ({
  to,
  href,
  className = '',
  children,
  ...props
}) => {
  const targetUrl = to || href || '#';
  const isExternal =
    targetUrl.startsWith('http://') ||
    targetUrl.startsWith('https://') ||
    targetUrl.startsWith('mailto:') ||
    targetUrl.startsWith('tel:');

  if (isExternal) {
    const isMailOrTel = targetUrl.startsWith('mailto:') || targetUrl.startsWith('tel:');
    return (
      <a
        href={targetUrl}
        className={className}
        target={isMailOrTel ? undefined : '_blank'}
        rel={isMailOrTel ? undefined : 'noopener noreferrer'}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={targetUrl} className={className} {...(props as any)}>
      {children}
    </Link>
  );
};
