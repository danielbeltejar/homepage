import { Button as BaseButton } from '@base-ui/react/button';
import type { ComponentProps, ImgHTMLAttributes } from 'react';

export type AmericaButtonProps = ComponentProps<typeof BaseButton>;

/** Shared action primitive for the personal site design system. */
export function AmericaButton(props: AmericaButtonProps) {
  return <BaseButton {...props} />;
}

export interface ResponsiveImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  sources?: string;
}

/** Shared responsive image primitive with safe loading defaults. */
export function ResponsiveImage({
  sources,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: ResponsiveImageProps) {
  return <img {...props} srcSet={sources} loading={loading} decoding={decoding} />;
}
