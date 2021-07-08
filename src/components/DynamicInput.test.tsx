import React from 'react';
import { render } from '@testing-library/react';
import { DynamicInput } from './DynamicInput';

test('DynamicInput should render', () => {
  render(<DynamicInput value="test" onChange={() => {}} />);
})
