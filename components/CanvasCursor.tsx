'use client';

import useCanvasCursor from '@/hooks/useCanvasCursor';

const CanvasCursor = () => {
  useCanvasCursor();

  return <canvas className='pointer-events-none fixed inset-0 max-[1000px]:hidden' id='canvas' />;
};
export default CanvasCursor;
