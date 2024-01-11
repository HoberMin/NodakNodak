﻿import { forwardRef, Ref } from 'react';

import { InputProps } from '@/components/common/Input/type';
import { Wrapper, StyledInput } from '@/components/common/Input/style';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      bordertype = 'filled',
      fontType = 'body3',
      underline = false,
      justifyContent = 'flex-start',
      height,
      width = '400px',
      ...props
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <Wrapper ref={ref} justifyContent={justifyContent}>
        <StyledInput
          $bordertype={bordertype}
          $fontType={fontType}
          $underline={underline}
          style={{ ...props.style, width, height }}
          {...props}
        />
      </Wrapper>
    );
  },
);

export default Input;
