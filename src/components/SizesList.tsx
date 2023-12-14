import { FC, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { getSize } from '../utils/api';
import { isSelect, notSelect } from "../store/sizeSelect.slice";



interface SizeListProps {
  sizes: number[];
  colorId: number;
  resetSelectedSize: boolean;
}

const SizeList: FC<SizeListProps> = ({ sizes, colorId, resetSelectedSize}) => {

  const dispatch = useDispatch();

  const [sizeLabels, setSizeLabels] = useState<string[]>([]);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

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

  useEffect(() => {
    if (resetSelectedSize) {
      setSelectedSize(null);
    }
  }, [resetSelectedSize]);

  const handleAddToCart = (sizeLabel: string) => {
    if (selectedSize === sizeLabel) {
      setSelectedSize(null);
      dispatch(notSelect(colorId.toString()));
    } else {
      setSelectedSize(sizeLabel);
      dispatch(isSelect({ cardId: colorId.toString(), sizeName: sizeLabel }));
    }
  };

  return (
    <div className="flex">
      {sizeLabels.map((size, sizeIndex) => (
        <p
          key={sizeIndex}
          className={`m-3 p-0 cursor-pointer font-bold ${
            selectedSize === size ? 'underline' : ''
          }`}
          onClick={() => handleAddToCart(size)}
        >
          {size}
        </p>
      ))}
    </div>
  );
};

export default SizeList;
