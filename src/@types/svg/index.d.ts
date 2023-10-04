declare module '*.svg' {
  import React from 'react';
  import { SVGProps } from 'react-native';

  const content: React.FC<SvgProps>;
  export default content;
}
