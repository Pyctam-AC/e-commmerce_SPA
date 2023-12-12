import { FC, useEffect, useState } from "react";
import { getSize } from '../utils/api';

interface SizeFetcherProps {
  sizes: number[];
}

const SizeFetcher: FC<SizeFetcherProps> = ({ sizes }) => {
  const [sizeLabels, setSizeLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchSizes = async () => {
      const sizeLabelPromises = sizes.map(async (size) => {
        const s = await getSize(size);
        return s.label;
      });

      const resolvedSizeLabels = await Promise.all(sizeLabelPromises);
      setSizeLabels(resolvedSizeLabels);
    };

    fetchSizes();
  }, [sizes]);

  return (
    <div className="flex">
      {sizeLabels.map((size, sizeIndex) => (
        <p key={sizeIndex} className="m-3 p-0 cursor-pointer font-bold xl:text-base lg:text-base sm:text-sm">
          {size}
        </p>
      ))}
    </div>
  );
};

export default SizeFetcher;
